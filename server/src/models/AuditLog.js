import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: String, default: '' },
  details: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('AuditLog', auditLogSchema);
