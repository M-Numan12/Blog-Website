'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/admin/audit-logs')
      .then((res) => setLogs(res.logs || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Audit Logs</h1>
      {error && <p className="p-3 bg-red-50 border border-red-200 text-sm text-brand-red">{error}</p>}

      <div className="bg-brand-white border border-black/10 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-black text-brand-white text-xs uppercase tracking-wider">
            <tr>
              <th className="p-3.5">Timestamp</th>
              <th className="p-3.5">User</th>
              <th className="p-3.5">Action</th>
              <th className="p-3.5">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-brand-charcoal/70">
                  No audit events recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id}>
                  <td className="p-3.5 text-xs text-brand-charcoal/70">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3.5 font-medium">{log.userId?.name || 'System'}</td>
                  <td className="p-3.5 font-mono text-xs">{log.action}</td>
                  <td className="p-3.5 text-brand-charcoal/85">{log.details}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
