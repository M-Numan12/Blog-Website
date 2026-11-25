import { z } from 'zod';
import Category from '../models/Category.js';
import Article from '../models/Article.js';
import { toSlug } from '../utils/slugify.js';
import { recordAuditLog } from '../utils/audit.js';

const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required').max(80),
  slug: z.string().optional(),
  description: z.string().max(400).optional().default(''),
});

export async function getCategories(req, res, next) {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();

    const counts = await Article.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$categoryId', count: { $sum: 1 } } },
    ]);

    const countMap = new Map(counts.map((c) => [String(c._id), c.count]));
    const enriched = categories.map((cat) => ({
      ...cat,
      articleCount: countMap.get(String(cat._id)) || 0,
    }));

    return res.json({ categories: enriched });
  } catch (error) {
    next(error);
  }
}

export async function createCategory(req, res, next) {
  try {
    const parsed = categorySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message || 'Invalid category data' });
    }

    const slug = toSlug(parsed.data.slug || parsed.data.name);
    const exists = await Category.findOne({ slug });
    if (exists) {
      return res.status(409).json({ message: 'Category slug already exists' });
    }

    const category = await Category.create({
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
    });

    await recordAuditLog({
      userId: req.user._id,
      action: 'CREATE_CATEGORY',
      entityType: 'Category',
      entityId: category._id,
      details: `Created category "${category.name}"`,
    });

    return res.status(201).json({ category });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const parsed = categorySchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message || 'Invalid category data' });
    }

    const updates = { ...parsed.data };
    if (updates.slug) updates.slug = toSlug(updates.slug);

    const category = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await recordAuditLog({
      userId: req.user._id,
      action: 'UPDATE_CATEGORY',
      entityType: 'Category',
      entityId: category._id,
      details: `Updated category "${category.name}"`,
    });

    return res.json({ category });
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const linkedArticles = await Article.countDocuments({ categoryId: req.params.id });
    if (linkedArticles > 0) {
      return res.status(400).json({ message: 'Cannot delete a category that still has articles' });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await recordAuditLog({
      userId: req.user._id,
      action: 'DELETE_CATEGORY',
      entityType: 'Category',
      entityId: category._id,
      details: `Deleted category "${category.name}"`,
    });

    return res.json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
}
