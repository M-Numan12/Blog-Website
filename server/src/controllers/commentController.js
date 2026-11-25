import { z } from 'zod';
import Article from '../models/Article.js';
import Comment from '../models/Comment.js';
import { recordAuditLog } from '../utils/audit.js';

const commentInputSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters').max(80),
  body: z.string().min(5, 'Comment must be at least 5 characters').max(1500),
});

export async function submitComment(req, res, next) {
  try {
    const parsed = commentInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0]?.message || 'Invalid comment' });
    }

    const article = await Article.findOne({ slug: String(req.params.slug).toLowerCase(), status: 'published' });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const comment = await Comment.create({
      articleId: article._id,
      displayName: parsed.data.displayName,
      body: parsed.data.body,
      status: 'pending',
    });

    return res.status(201).json({
      message: 'Comment submitted and awaiting editorial moderation.',
      comment,
    });
  } catch (error) {
    next(error);
  }
}

export async function listCommentsForModeration(req, res, next) {
  try {
    const filter = req.query.status && req.query.status !== 'all' ? { status: req.query.status } : {};
    const comments = await Comment.find(filter)
      .populate('articleId', 'title slug')
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ comments });
  } catch (error) {
    next(error);
  }
}

export async function moderateComment(req, res, next) {
  try {
    const status = req.body.status;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Status must be approved, rejected, or pending' });
    }

    const comment = await Comment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await recordAuditLog({
      userId: req.user._id,
      action: 'MODERATE_COMMENT',
      entityType: 'Comment',
      entityId: comment._id,
      details: `Marked comment by ${comment.displayName} as ${status}`,
    });

    return res.json({ comment });
  } catch (error) {
    next(error);
  }
}
