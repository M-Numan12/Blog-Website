// TODO: Implement audit log retrieval for admins
export async function getAuditLogs(req, res, next) {
  try {
    res.json({ logs: [] });
  } catch (error) {
    next(error);
  }
}
