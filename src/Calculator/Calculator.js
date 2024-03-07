import React, { useState } from 'react';
import '../App.css';

function Calculator() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [isModern, setIsModern] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const resultValue = eval(inputValue);
      setResult(`Result : ${resultValue}`);
      setHistory([...history, `${inputValue} = ${resultValue}`]);
    } catch (error) {
      setResult('Error');
    }
  };

  const clearCalculator = () => {
    setInputValue('');
    setResult('');
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const toggleModern = () => {
    setIsModern(!isModern);
    clearCalculator();
  };

  const handleButtonClick = (value) => {
    setInputValue(inputValue + value);
  };

  const handleOperationClick = (op) => {
    if (inputValue !== '') {
      setInputValue(inputValue + op);
    }
  };

  return (
    <div className={`calculator-container ${isModern ? 'modern' : ''}`}>
      <button className="mode-switch" onClick={toggleModern}>
        {isModern ? 'Switch to Standard Calculator' : 'Switch to Modern Calculator'}
      </button>
      <div className="calculator">
        <form onSubmit={handleFormSubmit}>
          {isModern && (
            <div className="form-group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          )}
          {!isModern ? (
            <>
              <div className="form-group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="number-buttons">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
                  <button
                    key={number}
                    onClick={() => handleButtonClick(`${number}`)}
                    className="number-button"
                  >
                    {number}
                  </button>
                ))}
              </div>
              <div className="operation-buttons">
                {['+', '-', '*', '/'].map((op) => (
                  <button
                    key={op}
                    onClick={() => handleOperationClick(op)}
                    className="operation-button"
                  >
                    {op}
                  </button>
                ))}
              </div>
            </>
          )}
          <button type="submit" className="calculate-button">Calculate</button>
          <button type="button" onClick={clearCalculator} className="clear-button">Clear</button>
        </form>
        <div className="result">{result}</div>
      </div>
      <div className="history">
        <h2>History</h2>
        <button onClick={clearHistory} className="clear-history-button">Clear History</button>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Calculator;
