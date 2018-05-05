import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Chart from './Chart';

// import './App.css';


const App = () => (
  <MuiThemeProvider>
    <AppBar
      title="Responsive React Chart With D3"
      showMenuIconButton={false}
    />
    <Chart />
  </MuiThemeProvider>
);

export default App;
