import React from 'react';
import { portfolioHistory, getPortfolioPerformance } from '../data/historyData';
import './PortfolioChart.css';

const PortfolioChart: React.FC = () => {
  const performance = getPortfolioPerformance();
  
  const formatValue = (value: number) => {
    return `$${value.toLocaleString('en-US', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    })}`;
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const getChangeColor = (value: number) => {
    return value >= 0 ? '#4caf50' : '#f44336';
  };

  const maxValue = Math.max(...portfolioHistory.map(p => p.totalValue));
  const minValue = Math.min(...portfolioHistory.map(p => p.totalValue));
  const valueRange = maxValue - minValue;

  return (
    <div className="portfolio-chart">
      <div className="chart-header">
        <h3>Portfolio Performance</h3>
        <div className="performance-metrics">
          <div className="metric">
            <span className="metric-label">24h</span>
            <span 
              className="metric-value"
              style={{ color: getChangeColor(performance.dayChange) }}
            >
              {formatPercentage(performance.dayChange)}
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">7d</span>
            <span 
              className="metric-value"
              style={{ color: getChangeColor(performance.weekChange) }}
            >
              {formatPercentage(performance.weekChange)}
            </span>
          </div>
          <div className="metric">
            <span className="metric-label">30d</span>
            <span 
              className="metric-value"
              style={{ color: getChangeColor(performance.monthChange) }}
            >
              {formatPercentage(performance.monthChange)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="chart-container">
        <svg className="chart-svg" viewBox="0 0 800 200">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#667eea', stopOpacity: 0.05 }} />
            </linearGradient>
          </defs>
          
          <path
            d={
              portfolioHistory
                .map((point, index) => {
                  const x = (index / (portfolioHistory.length - 1)) * 780 + 10;
                  const y = 190 - ((point.totalValue - minValue) / valueRange) * 180;
                  return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                })
                .join(' ') + 
              ` L 790 190 L 10 190 Z`
            }
            fill="url(#chartGradient)"
            stroke="none"
          />
          
          <path
            d={portfolioHistory
              .map((point, index) => {
                const x = (index / (portfolioHistory.length - 1)) * 780 + 10;
                const y = 190 - ((point.totalValue - minValue) / valueRange) * 180;
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              })
              .join(' ')
            }
            fill="none"
            stroke="#667eea"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {portfolioHistory.map((point, index) => {
            if (index % 5 !== 0) return null;
            const x = (index / (portfolioHistory.length - 1)) * 780 + 10;
            const y = 190 - ((point.totalValue - minValue) / valueRange) * 180;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="3"
                fill="#667eea"
                className="chart-point"
              />
            );
          })}
        </svg>
        
        <div className="chart-labels">
          <span className="label-start">
            {portfolioHistory[0]?.date}
          </span>
          <span className="label-end">
            {portfolioHistory[portfolioHistory.length - 1]?.date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioChart;