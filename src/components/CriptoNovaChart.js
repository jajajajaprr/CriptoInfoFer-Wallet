import React, { useState, useEffect } from 'react';

const CriptoNovaChart = ({ symbol, interval = '1h', limit = 24 }) => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
        const data = await response.json();

        const formattedData = data.map(kline => ({
          price: parseFloat(kline[4]),
          timestamp: kline[0],
        }));

        setHistoricalData(formattedData);
      } catch (error) {
        console.error(`Error fetching historical data for ${symbol}:`, error);
        setHistoricalData([]);
      }
    };

    if (symbol) {
      fetchHistoricalData();
      const intervalId = setInterval(fetchHistoricalData, 10000);
      return () => clearInterval(intervalId);
    } else {
      setHistoricalData([]);
    }
  }, [symbol, interval, limit]);

  if (historicalData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        Cargando datos históricos o no disponibles para {symbol}...
      </div>
    );
  }

  const prices = historicalData.map(item => item.price);
  const maxVal = Math.max(...prices);
  const minVal = Math.min(...prices);
  const range = maxVal - minVal;

  const areaPoints = historicalData.map((item, index) => {
    const x = (index / (historicalData.length - 1)) * 100;
    const y = 100 - ((item.price - minVal) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const areaPath = `M ${areaPoints} L 100,100 L 0,100 Z`;

  const timeLabels = historicalData
    .filter((_, index) => index % Math.ceil(historicalData.length / 5) === 0 || index === historicalData.length - 1)
    .map(item => {
      const date = new Date(item.timestamp);
      if (interval === '1d') return `${date.getMonth() + 1}/${date.getDate()}`;
      if (interval === '1h') return `${date.getHours()}:00`;
      return `${date.getHours()}:${date.getMinutes()}`;
    });

  return (
    <div className="p-4 bg-gray-800 rounded-2xl shadow-md mt-6">
      <h3 className="text-xl font-bold text-white mb-4">{symbol} - Historial</h3>
      <div className="relative h-40 w-full flex">
        <div className="w-12 text-xs text-gray-400 flex flex-col justify-between py-2 text-left pr-2">
          <span>{maxVal.toFixed(2)}</span>
          <span>{((maxVal + minVal) / 2).toFixed(2)}</span>
          <span>{minVal.toFixed(2)}</span>
        </div>
        <div className="flex-1">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <linearGradient id="chartGradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
            </linearGradient>
            <path d={areaPath} fill="url(#chartGradientGreen)" />

            <polyline
              fill="none"
              stroke="#4ADE80"
              strokeWidth="2"
              points={historicalData.map((item, index) => {
                const x = (index / (historicalData.length - 1)) * 100;
                const y = 100 - ((item.price - minVal) / range) * 100;
                return `${x},${y}`;
              }).join(' ')}
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2 px-12">
        {timeLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default CriptoNovaChart;