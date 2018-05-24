import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { barChart, lineChart } from '../data';

const theme = createMuiTheme();

const margins = {
  top: 50,
  right: 20,
  bottom: 100,
  left: 60,
};

const Container = styled.div`
  background: #EEEEEE;
  padding: 1em;
`;

const SpacedCard = styled(Card)`
  margin: 0 auto 2em;
  max-width: 75%;
`;

const App = () => (
  <MuiThemeProvider theme={theme}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Responsive React+D3 Charts
        </Typography>
      </Toolbar>
    </AppBar>
    <Container>
      <SpacedCard>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Bar Chart
          </Typography>
          <BarChart margins={margins} data={barChart} />
        </CardContent>
      </SpacedCard>
      <SpacedCard>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Line Chart - Basis
          </Typography>
          <LineChart margins={margins} data={lineChart} />
        </CardContent>
      </SpacedCard>
    </Container>
  </MuiThemeProvider>
);

export default App;
