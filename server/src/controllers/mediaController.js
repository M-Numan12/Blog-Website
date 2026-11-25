import Media from '../models/Media.js';
import { recordAuditLog } from '../utils/audit.js';

export async function getMediaList(req, res, next) {
  try {
    const media = await Media.find()
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ media });
  } catch (error) {
    next(error);
  }
}

export async function uploadMediaAsset(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const altText = String(req.body.altText || '').trim();
    if (!altText) {
      return res.status(400).json({ message: 'Descriptive alt text is required for accessibility' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const media = await Media.create({
      storageKey: req.file.filename,
      url: `${baseUrl}/uploads/${req.file.filename}`,
      altText,
      credit: String(req.body.credit || '').trim(),
      width: Number(req.body.width) || 0,
      height: Number(req.body.height) || 0,
      uploadedBy: req.user._id,
    });

    await recordAuditLog({
      userId: req.user._id,
      action: 'UPLOAD_MEDIA',
      entityType: 'Media',
      entityId: media._id,
      details: `Uploaded ${req.file.filename}`,
    });

    return res.status(201).json({ media });
  } catch (error) {
    next(error);
  }
}
