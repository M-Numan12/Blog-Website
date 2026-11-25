import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    storageKey: { type: String, required: true },
    url: { type: String, required: true },
    altText: { type: String, required: true, trim: true },
    credit: { type: String, default: '', trim: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
