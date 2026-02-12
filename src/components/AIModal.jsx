import { useState, useEffect } from 'react';

export default function AIModal({ isOpen, onClose, contextData }) {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Имитация процесса анализа при открытии модалки
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setShowResult(false);
      const timer = setTimeout(() => {
        setLoading(false);
        setShowResult(true);
      }, 1500); // 1.5 секунды "думаем"
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const {
    monthlyBudget,
    currency,
    passiveIncome,
    shortfall,
    retirementAge,
    monthlySavings,
    expectedReturn
  } = contextData;

  const isTargetMet = shortfall <= 0;
  const absShortfall = Math.abs(shortfall);

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <span>✨</span> AI Financial Insights
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-2 text-xl leading-none"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-gray-400 animate-pulse font-medium">Analyzing your strategy...</p>
            </div>
          ) : showResult && (
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg animate-in slide-in-from-bottom-4 duration-500">
              
              {isTargetMet ? (
                // СООБЩЕНИЕ ПРИ УСПЕХЕ
                <>
                  <p className="text-emerald-400 font-bold text-xl mb-4">
                    Congratulations on reaching your financial independence goal!
                  </p>
                  <p>
                    Your retirement plan looks solid, and you are on track to retire comfortably at age <span className="text-white font-semibold">{retirementAge}</span>.
                  </p>
                  <p>
                    To protect your capital and continue growing it, consider diversifying your investments across different asset classes such as stocks, bonds, and real estate. Diversification can help reduce risk and enhance long-term returns. Additionally, explore tax-optimized investment vehicles like retirement accounts or tax-efficient funds to maximize your after-tax returns.
                  </p>
                  <p>
                    Keep up the disciplined approach to investing and continue monitoring your plan regularly to make adjustments as needed. Your projected passive income and monthly surplus indicate a well-thought-out strategy. Wishing you continued success on your journey to financial independence and early retirement!
                  </p>
                </>
              ) : (
                // СООБЩЕНИЕ ПРИ ДЕФИЦИТЕ
                <>
                  <p>
                    Based on the provided data and calculations, there is a projected monthly shortfall of <span className="text-rose-400 font-bold">{currency}{absShortfall.toLocaleString()}</span> in achieving your desired retirement budget of {currency}{monthlyBudget.toLocaleString()}. This shortfall primarily stems from the gap between your projected passive income of {currency}{passiveIncome.toLocaleString()} and your desired budget.
                  </p>
                  <p className="font-bold text-white mt-6 mb-2 text-xl">To address this shortfall, here is a 3-step action plan:</p>
                  <ol className="space-y-4 list-decimal pl-5">
                    <li>
                      <span className="text-white font-semibold">Increase Monthly Investments:</span> Consider increasing your monthly investment amount from {currency}{monthlySavings.toLocaleString()} to bridge the gap. By boosting your contributions, you can accumulate a larger capital base.
                    </li>
                    <li>
                      <span className="text-white font-semibold">Explore Higher-Yield Options:</span> Given your current return of {expectedReturn}%, explore opportunities to earn more. This could involve diversifying your portfolio or seeking professional advice on optimizing your strategy.
                    </li>
                    <li>
                      <span className="text-white font-semibold">Adjust Retirement Age or Budget:</span> If increasing contributions isn't feasible, consider extending your working years or revising your retirement budget downwards to align your resources.
                    </li>
                  </ol>
                  <p className="mt-6 border-t border-gray-800 pt-4 text-sm italic">
                    By implementing these strategic adjustments, you can enhance the sustainability of your plan and work towards achieving your desired financial independence.
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-800/50 border-t border-gray-800 text-center text-xs text-gray-500 uppercase tracking-widest">
          Smart Analysis Engine • Not Financial Advice
        </div>
      </div>
    </div>
  );
}