import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';
import { uploadMedia } from '../middleware/upload.js';
import { createArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { getMediaList, uploadMediaAsset } from '../controllers/mediaController.js';
import { listCommentsForModeration, moderateComment } from '../controllers/commentController.js';
import { getAuditLogs } from '../controllers/auditLogController.js';

const router = Router();

router.use(requireAuth);

// Articles
router.post('/articles', requireRole('admin', 'editor', 'author'), createArticle);
router.patch('/articles/:id', requireRole('admin', 'editor', 'author'), updateArticle);
router.delete('/articles/:id', requireRole('admin', 'editor'), deleteArticle);

// Categories
router.post('/categories', requireRole('admin', 'editor'), createCategory);
router.patch('/categories/:id', requireRole('admin', 'editor'), updateCategory);
router.delete('/categories/:id', requireRole('admin'), deleteCategory);

// Media library
router.get('/media', requireRole('admin', 'editor', 'author'), getMediaList);
router.post('/media', requireRole('admin', 'editor', 'author'), uploadMedia.single('file'), uploadMediaAsset);

// Comment moderation
router.get('/comments', requireRole('admin', 'editor'), listCommentsForModeration);
router.patch('/comments/:id', requireRole('admin', 'editor'), moderateComment);

// Audit logs
router.get('/audit-logs', requireRole('admin'), getAuditLogs);

export default router;
