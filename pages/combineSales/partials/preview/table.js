import React from 'react'

export default function Table() {
  return (
    <div className="overflow-x-auto">
    <table className="w-full font-12 text-left">
      <thead>
        <tr className="*:pb-1 *:border-b *:border-b-gray-400">
          <th>SL</th>
          <th>Code</th>
          <th>Name</th>
          <th className="text-right">Price</th>
          <th className="text-right">Qty</th>
          <th className="text-right w-1/4">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr className="*:py-1 *:border-b *:border-b-gray-400">
          <td>1</td>
          <td>Pro-116</td>
          <td>Coconut Prawn</td>
          <td className="text-right">699</td>
          <td className="text-right">1</td>
          <td className="text-right">699</td>
        </tr>
        <tr className="*:py-1 *:border-b *:border-b-gray-400">
          <td>1</td>
          <td>Pro-112</td>
          <td>Chicken Dopiaza (6p)</td>
          <td className="text-right">549</td>
          <td className="text-right">1</td>
          <td className="text-right">549</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
