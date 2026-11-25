import AuditLog from '../models/AuditLog.js';

export async function recordAuditLog({ userId, action, entityType, entityId = '', details = '' }) {
  try {
    await AuditLog.create({
      userId,
      action,
      entityType,
      entityId: String(entityId || ''),
      details,
    });
  } catch (err) {
    console.error('Failed to write audit log:', err.message);
  }
}
