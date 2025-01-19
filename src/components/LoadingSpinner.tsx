import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Loading...' 
}) => {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;