import React from 'react';

export default function DataTable({
  columns = [], // [{ key, label, render }]
  data = [],
  loading = false,
  emptyMessage = 'No records found.',
}) {
  return (
    <div className="w-full overflow-x-auto rounded-card border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/70 border-b border-slate-100 dark:bg-slate-800/40 dark:border-slate-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-small font-semibold text-slate-500 dark:text-slate-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400">
                <div className="flex justify-center items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent" />
                  <span>Loading data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id || idx}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 text-body text-slate-700 dark:text-slate-300"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
