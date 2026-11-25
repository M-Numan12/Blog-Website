import mongoose from 'mongoose';

const revisionSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  editorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  previousVersion: { type: mongoose.Schema.Types.Mixed, required: true },
  changedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Revision', revisionSchema);
