export default function CurrencySelector({ currency, onChange }) {
  return (
    <div className="mb-8">
      <label className="block text-sm mb-2 text-gray-300">Currency</label>
      <select
        value={currency}
        onChange={(e) => onChange(e.target.value)}
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