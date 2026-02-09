import { useState } from 'react';
import CalculatorTabs from './components/CalculatorTabs';
import CurrencySelector from './components/CurrencySelector';
import Footer from './components/Footer';

function App() {
  const [currency, setCurrency] = useState('€');

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 lg:px-16 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-emerald-400">
          Investment & Retirement Calculator
        </h1>

        <CurrencySelector onChange={setCurrency} />

        <CalculatorTabs currency={currency} />
      </div>
      <Footer/>
    </div>
  );
}

export default App;