import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage'; // Импортируем наш хук
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
  Filler
} from 'chart.js';

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function CapitalGrowth({ currency }) {
  // Используем useLocalStorage вместо useState для сохранения данных
  // Ключи начинаются с 'cg_' (Capital Growth), чтобы не было конфликтов с другими вкладками
  const [startCapital, setStartCapital] = useLocalStorage('cg_startCapital', 10000);
  const [annualContrib, setAnnualContrib] = useLocalStorage('cg_annualContrib', 2400);
  const [returnRate, setReturnRate] = useLocalStorage('cg_returnRate', 7);
  const [period, setPeriod] = useLocalStorage('cg_period', 10);

  // Эти состояния оставляем через useState, так как это вычисляемые данные (результаты),
  // их не нужно хранить в памяти, они пересчитываются при загрузке из инпутов выше.
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [summary, setSummary] = useState({
    final: 0,
    contribution: 0,
    invested: 0,
    profit: 0,
    profitPercent: 0
  });

  useEffect(() => {
    const labels = [];
    const capitalByYear = [startCapital];
    const investedByYear = [startCapital];

    const rate = returnRate / 100;

    for (let i = 1; i <= period; i++) {
      // Логика: (предыдущий капитал + взнос) * доходность
      const previous = capitalByYear[i - 1];
      const updated = (previous + annualContrib) * (1 + rate);
      
      capitalByYear.push(Number(updated.toFixed(2)));
      investedByYear.push(startCapital + (annualContrib * i));
    }

    // Создаем метки (Year 0, Year 1...)
    for (let i = 0; i <= period; i++) {
      labels.push(`Year ${i}`);
    }

    const finalValue = capitalByYear[capitalByYear.length - 1];
    const totalInvested = investedByYear[investedByYear.length - 1];
    const totalProfit = finalValue - totalInvested;

    setSummary({
      final: finalValue,
      contribution: annualContrib * period,
      invested: totalInvested,
      profit: totalProfit,
      profitPercent: (totalProfit / totalInvested) * 100
    });

    setChartData({
      labels,
      datasets: [
        {
          label: `Capital (${currency})`,
          data: capitalByYear,
          borderColor: '#10b981', // emerald-500
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.3,
        },
        {
          label: `Invested (${currency})`,
          data: investedByYear,
          borderColor: '#9ca3af', // gray-400
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0,
        }
      ],
    });
  }, [startCapital, annualContrib, returnRate, period, currency]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#9ca3af' } },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${currency}${ctx.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
      x: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } }
    }
  };

  return (
    <div className="space-y-8">
      {/* Сетка инпутов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <label className="block text-sm text-gray-400 mb-2">Initial Capital</label>
          <input
            type="number"
            value={startCapital}
            onChange={(e) => setStartCapital(Number(e.target.value))}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <label className="block text-sm text-gray-400 mb-2">Annual Contribution</label>
          <input
            type="number"
            value={annualContrib}
            onChange={(e) => setAnnualContrib(Number(e.target.value))}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <label className="block text-sm text-gray-400 mb-2">Annual Return (%)</label>
          <input
            type="number"
            value={returnRate}
            onChange={(e) => setReturnRate(Number(e.target.value))}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
          <label className="block text-sm text-gray-400 mb-2">Period: {period} years</label>
          <input
            type="range"
            min="1"
            max="50"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>

      {/* График */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-[400px]">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Результаты */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Final Capital</p>
          <p className="text-xl font-bold text-emerald-400">{currency}{summary.final.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl text-center border border-gray-700">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Contrib.</p>
          <p className="text-xl font-bold">{currency}{summary.contribution.toLocaleString()}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-xl text-center border border-gray-700">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Invested</p>
          <p className="text-xl font-bold">{currency}{summary.invested.toLocaleString()}</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Net Profit</p>
          <p className="text-xl font-bold text-blue-400">{currency}{summary.profit.toLocaleString()}</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Profit %</p>
          <p className="text-xl font-bold text-amber-400">{summary.profitPercent.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}