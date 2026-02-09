import { useState } from 'react';
import AssetComparison from './AssetComparison';
import CapitalGrowth from './CapitalGrowth';
import RetirementPlanner from './RetirementPlanner';

export default function CalculatorTabs({ currency }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Asset Comparison', component: <AssetComparison currency={currency} /> },
    { name: 'Capital Growth', component: <CapitalGrowth currency={currency} /> },
    { name: 'Retirement Planner', component: <RetirementPlanner currency={currency} /> },
  ];

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-700 mb-8 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
              activeTab === index
                ? 'text-emerald-400 border-b-2 border-emerald-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tabs[activeTab].component}
      </div>
    </div>
  );
}