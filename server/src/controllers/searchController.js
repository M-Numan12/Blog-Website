// TODO: Implement full-text search across published articles
export async function searchArticles(req, res, next) {
  try {
    const query = (req.query.q || '').trim();
    res.json({ query, results: [] });
  } catch (error) {
    next(error);
  }
}
