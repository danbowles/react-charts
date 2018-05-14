import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { barChart, lineChart } from '../data';

const margins = {
  top: 50,
  right: 20,
  bottom: 100,
  left: 60,
};

const App = () => (
  <MuiThemeProvider>
    <AppBar
      title="Responsive React Chart With D3"
      showMenuIconButton={false}
    />
    <BarChart margins={margins} data={barChart} />
    <LineChart margins={margins} data={lineChart} />
  </MuiThemeProvider>
);

export default App;
