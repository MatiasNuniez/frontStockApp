import React from 'react'

export const Month_end = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex justify-center items-center">
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Historial</h2>
            <ul className="list-disc pl-6">
                {[
                { startDate: '2023-01-01', endDate: '2023-01-31', amount: 1000 },
                { startDate: '2023-02-01', endDate: '2023-02-28', amount: 1500 },
                { startDate: '2023-03-01', endDate: '2023-03-31', amount: 2000 },
                ].map((month, index) => (
                <li key={index} className="mb-3">
                    <span className="font-semibold">{month.startDate}</span> - <span className="font-semibold">{month.endDate}</span>: <span className="text-green-600">${month.amount}</span>
                </li>
                ))}
            </ul>
        </div>
    </div>
  )
}
