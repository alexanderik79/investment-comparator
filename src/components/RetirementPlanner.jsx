import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AIModal from './AIModal'; // Не забудь создать этот файл
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function RetirementPlanner({ currency }) {
  // Состояния с автосохранением в LocalStorage
  const [currentAge, setCurrentAge] = useLocalStorage('rp_currentAge', 30);
  const [retirementAge, setRetirementAge] = useLocalStorage('rp_retireAge', 60);
  const [monthlySavings, setMonthlySavings] = useLocalStorage('rp_monthlySavings', 200);
  const [currentSavings, setCurrentSavings] = useLocalStorage('rp_currentSavings', 10000);
  const [expectedReturn, setExpectedReturn] = useLocalStorage('rp_expectedReturn', 7);
  const [monthlyBudget, setMonthlyBudget] = useLocalStorage('rp_monthlyBudget', 1000);

  // Состояние модального окна
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Состояния для расчетов и графика
  const [result, setResult] = useState({
    totalCapital: 0,
    monthlyPassiveIncome: 0,
    isEnough: false,
    shortfall: 0
  });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const yearsToInvest = retirementAge - currentAge;
    const monthlyRate = expectedReturn / 100 / 12;

    let capital = currentSavings;
    const labels = [];
    const data = [];

    for (let i = 0; i <= yearsToInvest; i++) {
      labels.push(`Age ${currentAge + i}`);
      
      if (i > 0) {
        for (let m = 0; m < 12; m++) {
          capital = (capital + monthlySavings) * (1 + monthlyRate);
        }
      }
      data.push(Math.round(capital));
    }

    const finalCapital = capital;
    const passiveIncome = (finalCapital * 0.04) / 12;
    const isEnough = passiveIncome >= monthlyBudget;

    setResult({
      totalCapital: finalCapital,
      monthlyPassiveIncome: passiveIncome,
      isEnough: isEnough,
      shortfall: monthlyBudget - passiveIncome
    });

    setChartData({
      labels,
      datasets: [{
        label: 'Retirement Nest Egg',
        data: data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }]
    });
  }, [currentAge, retirementAge, monthlySavings, currentSavings, expectedReturn, monthlyBudget]);

  return (
    <div className="space-y-8">
      {/* Панель управления (Инпуты) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="space-y-4 bg-gray-800/30 p-5 rounded-2xl border border-gray-700">
          <h3 className="text-emerald-400 font-bold border-b border-gray-700 pb-2">Timeline</h3>
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Current Age: {currentAge}</label>
            <input 
              type="range" 
              min="18" 
              max="70" 
              value={currentAge} 
              onChange={(e) => setCurrentAge(Number(e.target.value))} 
              className="w-full accent-emerald-500 cursor-pointer" 
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 uppercase mb-1">Retirement Age: {retirementAge}</label>
            <input 
              type="range" 
              min={currentAge + 1} 
              max="85" 
              value={retirementAge} 
              onChange={(e) => setRetirementAge(Number(e.target.value))} 
              className="w-full accent-emerald-500 cursor-pointer" 
            />
          </div>
        </div>

        {/* Money */}
        <div className="space-y-4 bg-gray-800/30 p-5 rounded-2xl border border-gray-700">
          <h3 className="text-blue-400 font-bold border-b border-gray-700 pb-2">Money</h3>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Current Savings ({currency})</label>
            <input 
              type="number" 
              value={currentSavings} 
              onChange={(e) => setCurrentSavings(Number(e.target.value))} 
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Monthly Contribution ({currency})</label>
            <input 
              type="number" 
              value={monthlySavings} 
              onChange={(e) => setMonthlySavings(Number(e.target.value))} 
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500 transition-colors" 
            />
          </div>
        </div>

        {/* Target */}
        <div className="space-y-4 bg-gray-800/30 p-5 rounded-2xl border border-gray-700">
          <h3 className="text-amber-400 font-bold border-b border-gray-700 pb-2">Target</h3>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Desired Monthly Budget ({currency})</label>
            <input 
              type="number" 
              value={monthlyBudget} 
              onChange={(e) => setMonthlyBudget(Number(e.target.value))} 
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Expected Return (%)</label>
            <input 
              type="number" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))} 
              className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500 transition-colors" 
            />
          </div>
        </div>
      </div>

      {/* Индикатор FIRE с кнопкой AI */}
      <div className={`p-6 rounded-2xl border-2 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 ${result.isEnough ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-rose-500/10 border-rose-500/50'}`}>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-1">
            {result.isEnough ? '🎉 Ready for Retirement!' : '📉 More Saving Needed'}
          </h2>
          <p className="text-gray-400">
            Based on the 4% rule, your capital will generate <span className="text-white font-bold">{currency}{Math.round(result.monthlyPassiveIncome).toLocaleString()}</span> per month.
          </p>
          
          <button 
            onClick={() => setIsAIModalOpen(true)}
            className="mt-4 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <span className="text-lg">✨</span> Analyze with AI
          </button>
        </div>
        <div className="text-center md:text-right">
          <p className="text-xs uppercase text-gray-400">Target Monthly Gap</p>
          <p className={`text-3xl font-black ${result.isEnough ? 'text-emerald-400' : 'text-rose-400'}`}>
            {result.isEnough ? 'COVERED' : `-${currency}${Math.round(result.shortfall).toLocaleString()}`}
          </p>
        </div>
      </div>

      {/* График */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 h-[400px] shadow-inner">
        <Line 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
              x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#10b981',
                padding: 12,
                borderRadius: 8
              }
            }
          }} 
        />
      </div>

      {/* Финальные карточки */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform hover:scale-[1.02]">
          <p className="text-sm text-gray-400 mb-2">Final Nest Egg</p>
          <p className="text-3xl font-bold text-white">{currency}{Math.round(result.totalCapital).toLocaleString()}</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform hover:scale-[1.02]">
          <p className="text-sm text-gray-400 mb-2">Passive Monthly Income</p>
          <p className="text-3xl font-bold text-emerald-400">{currency}{Math.round(result.monthlyPassiveIncome).toLocaleString()}</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-xl transition-transform hover:scale-[1.02]">
          <p className="text-sm text-gray-400 mb-2">Years of Growth</p>
          <p className="text-3xl font-bold text-blue-400">{retirementAge - currentAge} years</p>
        </div>
      </div>

      {/* Модальное окно AI */}
      <AIModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        contextData={{
          currentAge,
          retirementAge,
          currentSavings,
          monthlySavings,
          expectedReturn,
          monthlyBudget,
          currency,
          passiveIncome: Math.round(result.monthlyPassiveIncome),
          shortfall: Math.round(result.shortfall),
          totalCapital: Math.round(result.totalCapital)
        }}
      />
    </div>
  );
}