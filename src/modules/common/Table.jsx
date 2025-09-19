export default function Table({ columns, data, actions }) {
  return (
    <div className="card overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-600">{col.title}</th>
            ))}
            {actions && <th className="px-4 py-3"></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b last:border-b-0">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-3">{row[col.key]}</td>
              ))}
              {actions && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {actions.map((a, i) => (
                      <button key={i} onClick={() => a.onClick(row)} className="px-2 py-1 rounded-md border">
                        {a.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
