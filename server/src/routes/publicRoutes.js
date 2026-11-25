import { Router } from 'express';
import { getPublishedArticles, getArticleBySlug, getAuthorBySlug } from '../controllers/articleController.js';
import { getCategories } from '../controllers/categoryController.js';
import { searchArticles } from '../controllers/searchController.js';
import { submitComment } from '../controllers/commentController.js';
import { submitContactMessage } from '../controllers/contactController.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/articles', getPublishedArticles);
router.get('/articles/:slug', getArticleBySlug);
router.get('/authors/:slug', getAuthorBySlug);
router.get('/categories', getCategories);
router.get('/search', searchArticles);
router.post('/articles/:slug/comments', publicFormRateLimiter, submitComment);
router.post('/contact', publicFormRateLimiter, submitContactMessage);

export default router;
