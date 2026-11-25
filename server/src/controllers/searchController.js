import Article from '../models/Article.js';

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function searchArticles(req, res, next) {
  try {
    const query = String(req.query.q || '').trim();
    if (!query) {
      return res.json({ query: '', results: [] });
    }

    const regex = new RegExp(escapeRegex(query), 'i');

    const results = await Article.find({
      status: 'published',
      $or: [
        { title: regex },
        { excerpt: regex },
        { body: regex },
        { tags: regex },
      ],
    })
      .populate('categoryId', 'name slug')
      .populate('authorId', 'name slug')
      .sort({ publishedAt: -1 })
      .limit(24)
      .lean();

    return res.json({ query, results });
  } catch (error) {
    next(error);
  }
}
