import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeProvider from './providers/ThemeProvider'
import Root from './components/rootTheme/index'
ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
      <App />
      {/* <Root/> */}
    {/* </ThemeProvider> */}
</React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
