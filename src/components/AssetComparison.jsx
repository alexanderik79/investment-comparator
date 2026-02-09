import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { calculateFutureValue } from '../utils/calculateFutureValue';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AssetComparison({ currency }) {
  const [initial, setInitial] = useState(100000);
  const [monthly, setMonthly] = useState(2000);
  const [years, setYears] = useState(20);
  const [rateAccum, setRateAccum] = useState(8.9);
  const [rateDist, setRateDist] = useState(7.5);
  const [rateGold, setRateGold] = useState(6.0);
  const [inflation, setInflation] = useState(2.0);
  const [adjustInflation, setAdjustInflation] = useState(true);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [tableRows, setTableRows] = useState([]);

  const keyYears = [5, 10, 15, 20, 25, 30].filter(y => y <= years);

  useEffect(() => {
    const labels = [];
    const accumData = [];
    const distData = [];
    const goldData = [];
    const rows = [];

    for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 20))) {
      labels.push(`${y} years`);

      const params = {
        initial,
        monthly,
        years: y,
        inflationRate: inflation,
        adjustForInflation: adjustInflation,
      };

      const accum = calculateFutureValue({ ...params, annualRate: rateAccum });
      const dist = calculateFutureValue({ ...params, annualRate: rateDist });
      const gold = calculateFutureValue({ ...params, annualRate: rateGold });

      accumData.push(accum);
      distData.push(dist);
      goldData.push(gold);

      if (keyYears.includes(y) || y === years) {
        rows.push({ year: y, accum, dist, gold });
      }
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Accumulating',
          data: accumData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Distributing',
          data: distData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Gold',
          data: goldData,
          borderColor: '#fbbf24',
          backgroundColor: 'rgba(251, 191, 36, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    });

    setTableRows(rows);
  }, [initial, monthly, years, rateAccum, rateDist, rateGold, inflation, adjustInflation, currency]);

  const totalInvested = initial + monthly * years * 12;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#ddd' } },
    },
    scales: {
      y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
      x: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
    },
  };

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm mb-2 text-gray-300">Initial Amount ({currency})</label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-2 text-gray-300">Monthly Contribution ({currency})</label>
          <input
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-2 text-gray-300">Years: {years}</label>
          <input
            type="range"
            min="1"
            max="40"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm mb-2 text-gray-300">Inflation %</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="w-20 bg-gray-800 border border-gray-600 rounded-lg px-2 py-1 text-white"
            />
            <label className="flex items-center gap-1 text-xs text-gray-400">
              <input 
                type="checkbox" 
                checked={adjustInflation} 
                onChange={(e) => setAdjustInflation(e.target.checked)} 
              />
              Adjust
            </label>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 h-96 border border-gray-800">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm">Total Invested</p>
          <p className="text-xl font-bold">{currency}{totalInvested.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-emerald-400 text-sm">Accumulating</p>
          <p className="text-xl font-bold">
            {currency}{calculateFutureValue({ 
                initial, monthly, annualRate: rateAccum, years, 
                inflationRate: inflation, adjustForInflation: adjustInflation 
            }).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-blue-400 text-sm">Distributing</p>
          <p className="text-xl font-bold">
            {currency}{calculateFutureValue({ 
                initial, monthly, annualRate: rateDist, years, 
                inflationRate: inflation, adjustForInflation: adjustInflation 
            }).toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
          <p className="text-amber-400 text-sm">Gold</p>
          <p className="text-xl font-bold">
            {currency}{calculateFutureValue({ 
                initial, monthly, annualRate: rateGold, years, 
                inflationRate: inflation, adjustForInflation: adjustInflation 
            }).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}