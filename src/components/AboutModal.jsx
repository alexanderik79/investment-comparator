export default function AboutModal({ isOpen, onClose }) {
  // Проверка: если модалка не открыта, возвращаем пустоту
  if (!isOpen) return null;

  return (
    <div
      /* ФОН (OVERLAY): фиксированный на весь экран, z-индекс 100, блюр, скролл разрешен */
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        /* КОНТЕНТ-БОКС: ширина до 672px (2xl), скругление 40px (2.5rem), центрируется за счет my-auto */
        className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 my-auto"
        onClick={(e) => e.stopPropagation()} // Чтобы клик по самому окну не закрывал его
      >
        {/* Цветная полоска сверху для стиля */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500" />

        {/* Основные внутренние отступы всего окна */}
        <div className="p-8 md:p-12">
          
          {/* ШАПКА: Название и кнопка закрытия */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight">
                Fin<span className="text-emerald-500">Pulse</span>
              </h2>
              {/* Подзаголовок версии с моноширинным шрифтом */}
              <p className="text-emerald-500/80 font-mono text-xs uppercase tracking-[0.2em] mt-1">
                Precision Financial Engine v1.2
              </p>
            </div>
            {/* Кнопка-крестик с круглой серой подложкой */}
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
            >
              ✕
            </button>
          </div>

          {/* СЕТКА: 1 колонка на мобиле, 2 на десктопе */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            
            {/* Секция "Master Your Future" (Текст и цитата) */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                Master Your Future
              </h3>
              <p className="text-gray-400 leading-relaxed">
                FinPulse isn't just a calculator—it's a mission control for your
                <span className="text-white font-semibold">
                  {" "}
                  Financial Independence
                </span>
                . We've distilled complex fiscal modeling into a
                high-performance interface.
              </p>
              {/* Блок с цитатой Эйнштейна и изумрудной рамкой */}
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <p className="text-sm text-emerald-400 italic">
                  "Compound interest is the eighth wonder of the world. He who
                  understands it, earns it; he who doesn't, pays it."
                </p>
                <p className="text-sm text-emerald-400 italic text-right">
                  — Albert Einstein
                </p>
              </div>
            </div>

            {/* Секция "Capabilities" (Список фич с точками) */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Capabilities</h3>
              <ul className="space-y-3">
                
                {/* Фича 1: Изумрудная точка со свечением */}
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <div>
                    <p className="text-sm font-bold text-gray-200 leading-none">
                      Multi-Asset Analysis
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Compare Equities, Gold, and Cash performance.
                    </p>
                  </div>
                </li>

                {/* Фича 2: Синяя точка со свечением */}
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  <div>
                    <p className="text-sm font-bold text-gray-200 leading-none">
                      Inflation Shield
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Real-world purchasing power adjustments.
                    </p>
                  </div>
                </li>

                {/* Фича 3: Оранжевая точка со свечением */}
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  <div>
                    <p className="text-sm font-bold text-gray-200 leading-none">
                      FIRE Simulation
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      4% Safe Withdrawal Rate (SWR) modeling.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* НИЗ (FOOTER): Статистика и кнопка старта */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-8 border-t border-gray-800">
            
            {/* Индикаторы безопасности (Client-Side, No-Tracking) */}
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-lg font-bold text-white">100%</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                  Client-Side
                </p>
              </div>
              {/* Вертикальная линия-разделитель */}
              <div className="w-px h-8 bg-gray-800" />
              <div className="text-center">
                <p className="text-lg font-bold text-white">SECURE</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                  No-Tracking
                </p>
              </div>
            </div>

            {/* Главная кнопка: Изумрудная, с тенью и эффектом уменьшения при клике (active:scale-95) */}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-black rounded-2xl transition-all shadow-[0_8px_30px_rgb(16,185,129,0.2)] active:scale-95"
            >
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}