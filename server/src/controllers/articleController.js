import { z } from 'zod';
import Article from '../models/Article.js';
import Category from '../models/Category.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import Revision from '../models/Revision.js';
import { sanitizeArticleHtml } from '../utils/sanitize.js';
import { toSlug } from '../utils/slugify.js';
import { recordAuditLog } from '../utils/audit.js';

const articleInputSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  slug: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(500),
  body: z.string().min(20, 'Article body is required'),
  categoryId: z.string().min(1, 'Category is required'),
  heroImage: z
    .object({
      url: z.string().optional().default(''),
      altText: z.string().optional().default(''),
      credit: z.string().optional().default(''),
      caption: z.string().optional().default(''),
    })
    .optional(),
  quickFacts: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .optional(),
  faqs: z
    .array(z.object({ question: z.string().min(1), answer: z.string().min(1) }))
    .optional(),
  sources: z
    .array(z.object({ title: z.string().min(1), url: z.string().url() }))
    .optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'review', 'scheduled', 'published', 'archived']).optional(),
  isFeatured: z.boolean().optional(),
  isTrending: z.boolean().optional(),
  publishedAt: z.string().nullable().optional(),
  seoTitle: z.string().max(160).optional(),
  metaDescription: z.string().max(320).optional(),
  canonicalUrl: z.string().optional(),
  socialImage: z.string().optional(),
});

export async function getPublishedArticles(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 50);
    const skip = (page - 1) * limit;

    const filter = { status: 'published' };

    if (req.query.category) {
      const cat = await Category.findOne({ slug: String(req.query.category).toLowerCase() });
      if (!cat) {
        return res.json({ articles: [], pagination: { page, limit, total: 0, totalPages: 1 } });
      }
      filter.categoryId = cat._id;
    }

    if (req.query.author) {
      const author = await User.findOne({ slug: String(req.query.author).toLowerCase() });
      if (!author) {
        return res.json({ articles: [], pagination: { page, limit, total: 0, totalPages: 1 } });
      }
      filter.authorId = author._id;
    }

    if (req.query.featured === 'true') filter.isFeatured = true;
    if (req.query.trending === 'true') filter.isTrending = true;

    const sortField = req.query.sort === 'updated' ? { updatedAt: -1 } : { publishedAt: -1, createdAt: -1 };

    const [articles, total] = await Promise.all([
      Article.find(filter)
        .populate('categoryId', 'name slug description')
        .populate('authorId', 'name slug bio avatarUrl')
        .sort(sortField)
        .skip(skip)
        .limit(limit)
        .lean(),
      Article.countDocuments(filter),
    ]);

    return res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getArticleBySlug(req, res, next) {
  try {
    const slug = String(req.params.slug).toLowerCase();
    const article = await Article.findOne({ slug, status: 'published' })
      .populate('categoryId', 'name slug description')
      .populate('authorId', 'name slug bio avatarUrl')
      .lean();

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const [related, comments] = await Promise.all([
      Article.find({
        _id: { $ne: article._id },
        categoryId: article.categoryId?._id,
        status: 'published',
      })
        .populate('categoryId', 'name slug')
        .populate('authorId', 'name slug')
        .sort({ publishedAt: -1 })
        .limit(4)
        .lean(),
      Comment.find({ articleId: article._id, status: 'approved' })
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    return res.json({ article, related, comments });
  } catch (error) {
    next(error);
  }
}

export async function getAuthorBySlug(req, res, next) {
  try {
    const slug = String(req.params.slug).toLowerCase();
    const author = await User.findOne({ slug }).select('name slug bio avatarUrl role createdAt').lean();
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    const articles = await Article.find({ authorId: author._id, status: 'published' })
      .populate('categoryId', 'name slug')
      .populate('authorId', 'name slug')
      .sort({ publishedAt: -1 })
      .lean();

    return res.json({ author, articles });
  } catch (error) {
    next(error);
  }
}

export async function getAdminArticles(req, res, next) {
  try {
    const filter = {};
    if (req.user.role === 'author') {
      filter.authorId = req.user._id;
    }
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }

    const articles = await Article.find(filter)
      .populate('categoryId', 'name slug')
      .populate('authorId', 'name email role')
      .sort({ updatedAt: -1 })
      .lean();

    return res.json({ articles });
  } catch (error) {
    next(error);
  }
}

export async function getAdminArticleById(req, res, next) {
  try {
    const article = await Article.findById(req.params.id)
      .populate('categoryId', 'name slug')
      .populate('authorId', 'name email role')
      .lean();

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.user.role === 'author' && String(article.authorId?._id) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Authors can only access their own drafts' });
    }

    const revisions = await Revision.find({ articleId: article._id })
      .populate('editorId', 'name email')
      .sort({ changedAt: -1 })
      .limit(10)
      .lean();

    return res.json({ article, revisions });
  } catch (error) {
    next(error);
  }
}

export async function createArticle(req, res, next) {
  try {
    const parsed = articleInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message || 'Invalid article input' });
    }

    const data = parsed.data;
    const desiredStatus = data.status || 'draft';

    // Authors cannot directly publish or archive
    if (req.user.role === 'author' && !['draft', 'review'].includes(desiredStatus)) {
      return res.status(403).json({ message: 'Authors can only save drafts or submit for review' });
    }

    const slug = toSlug(data.slug || data.title);
    const existingSlug = await Article.findOne({ slug });
    if (existingSlug) {
      return res.status(409).json({ message: 'An article with this slug already exists' });
    }

    const publishedAt =
      desiredStatus === 'published'
        ? data.publishedAt
          ? new Date(data.publishedAt)
          : new Date()
        : data.publishedAt
          ? new Date(data.publishedAt)
          : null;

    const article = await Article.create({
      ...data,
      slug,
      body: sanitizeArticleHtml(data.body),
      authorId: req.user._id,
      status: desiredStatus,
      publishedAt,
    });

    await recordAuditLog({
      userId: req.user._id,
      action: 'CREATE_ARTICLE',
      entityType: 'Article',
      entityId: article._id,
      details: `Created "${article.title}" (${article.status})`,
    });

    return res.status(201).json({ article });
  } catch (error) {
    next(error);
  }
}

export async function updateArticle(req, res, next) {
  try {
    const existing = await Article.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.user.role === 'author' && String(existing.authorId) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Authors can only edit their own drafts' });
    }

    const parsed = articleInputSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message || 'Invalid update data' });
    }

    const updates = parsed.data;
    if (req.user.role === 'author' && updates.status && !['draft', 'review'].includes(updates.status)) {
      return res.status(403).json({ message: 'Authors cannot publish or archive articles' });
    }

    // Store revision before mutating
    await Revision.create({
      articleId: existing._id,
      editorId: req.user._id,
      previousVersion: {
        title: existing.title,
        slug: existing.slug,
        excerpt: existing.excerpt,
        body: existing.body,
        status: existing.status,
      },
    });

    if (updates.slug) {
      const normalized = toSlug(updates.slug);
      const conflict = await Article.findOne({ slug: normalized, _id: { $ne: existing._id } });
      if (conflict) {
        return res.status(409).json({ message: 'Slug already in use by another article' });
      }
      updates.slug = normalized;
    }

    if (updates.body) {
      updates.body = sanitizeArticleHtml(updates.body);
    }

    if (updates.status === 'published' && !existing.publishedAt && !updates.publishedAt) {
      updates.publishedAt = new Date();
    }

    Object.assign(existing, updates);
    await existing.save();

    await recordAuditLog({
      userId: req.user._id,
      action: 'UPDATE_ARTICLE',
      entityType: 'Article',
      entityId: existing._id,
      details: `Updated "${existing.title}" (${existing.status})`,
    });

    return res.json({ article: existing });
  } catch (error) {
    next(error);
  }
}

export async function deleteArticle(req, res, next) {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await Promise.all([
      Comment.deleteMany({ articleId: article._id }),
      Revision.deleteMany({ articleId: article._id }),
      recordAuditLog({
        userId: req.user._id,
        action: 'DELETE_ARTICLE',
        entityType: 'Article',
        entityId: article._id,
        details: `Deleted "${article.title}"`,
      }),
    ]);

    return res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    next(error);
  }
}
