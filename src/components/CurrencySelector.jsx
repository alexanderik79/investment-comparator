import { useState } from 'react';

export default function CurrencySelector({ onChange }) {
  const [currency, setCurrency] = useState('€');

  const handleChange = (e) => {
    const value = e.target.value;
    setCurrency(value);
    onChange(value);
  };

  return (
    <div className="mb-8">
      <label className="block text-sm mb-2 text-gray-300">Currency</label>
      <select
        value={currency}
        onChange={handleChange}
        className="w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="€">EUR (€)</option>
        <option value="$">USD ($)</option>
        <option value="£">GBP (£)</option>
        <option value="₴">UAH (₴)</option>
      </select>
    </div>
  );
}