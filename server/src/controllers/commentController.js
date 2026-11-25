// TODO: Implement public comment submission & admin moderation (approve/reject)
export async function submitComment(req, res, next) {
  try {
    res.status(501).json({ message: 'Submit comment endpoint ready for implementation' });
  } catch (error) {
    next(error);
  }
}

export async function listCommentsForModeration(req, res, next) {
  try {
    res.json({ comments: [] });
  } catch (error) {
    next(error);
  }
}

export async function moderateComment(req, res, next) {
  try {
    res.status(501).json({ message: 'Moderate comment endpoint ready for implementation' });
  } catch (error) {
    next(error);
  }
}
