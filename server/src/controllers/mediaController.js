// TODO: Implement media library listing, upload persistence & deletion
export async function getMediaList(req, res, next) {
  try {
    res.json({ media: [] });
  } catch (error) {
    next(error);
  }
}

export async function uploadMediaAsset(req, res, next) {
  try {
    res.status(501).json({ message: 'Media upload endpoint ready for implementation' });
  } catch (error) {
    next(error);
  }
}
