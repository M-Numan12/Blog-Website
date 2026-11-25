import AuditLog from '../models/AuditLog.js';
import Article from '../models/Article.js';
import Category from '../models/Category.js';
import Comment from '../models/Comment.js';
import Media from '../models/Media.js';

export async function getAuditLogs(req, res, next) {
  try {
    const logs = await AuditLog.find()
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.json({ logs });
  } catch (error) {
    next(error);
  }
}

export async function getDashboardStats(req, res, next) {
  try {
    const [publishedCount, draftCount, reviewCount, categoriesCount, pendingCommentsCount, mediaCount] =
      await Promise.all([
        Article.countDocuments({ status: 'published' }),
        Article.countDocuments({ status: 'draft' }),
        Article.countDocuments({ status: 'review' }),
        Category.countDocuments(),
        Comment.countDocuments({ status: 'pending' }),
        Media.countDocuments(),
      ]);

    return res.json({
      stats: {
        publishedArticles: publishedCount,
        draftArticles: draftCount,
        inReviewArticles: reviewCount,
        categories: categoriesCount,
        pendingComments: pendingCommentsCount,
        mediaAssets: mediaCount,
      },
    });
  } catch (error) {
    next(error);
  }
}
