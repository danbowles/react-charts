import { csvParse } from 'd3-dsv';

// const lineChartCSV =
// `Year,Line 1,Line 2,Line 3,Line 4
// 1980,70,52,145,75
// 1981,77,51,156,80
// 1982,81,55,169,79
// 1983,78,55,171,91
// 1984,80,55,187,102
// 1985,79,53,199,103
// 1986,79,54,204,102
// 1987,78,53,218,104
// 1988,75,51,232,105
// 1989,78,48,233,106
// 1990,76,51,233,112`;

// const multiBarCSV =
// `State,Under 5 Years,5 to 13 Years,14 to 17 Years,18 to 24 Years,25 to 44 Years,45 to 64 Years,65 Years and Over
// California,2704659,4499890,2159981,3853788,10604510,8819342,4114496
// Texas,2027307,3277946,1420518,2454721,7017731,5656528,2472223
// New York,1208495,2141490,1058031,1999120,5355235,5120254,2607672
// Florida,1140516,1938695,925060,1607297,4782119,4746856,3187797
// Illinois,894368,1558919,725973,1311479,3596343,3239173,1575308
// Pennsylvania,737462,1345341,679201,1203944,3157759,3414001,1910571
// config,colors,test`;

const multiBarCSV =
`Year,Employee-Based,Direct-Purchase,Medicare,Medicaid,Military Health Care,Uninsured
2013,174418,35755,49020,54919,14016,41795
2014,175027,46165,50546,61650,14143,32968
2015,177540,52057,51865,62384,14849,28966
2016,178455,51961,53372,62303,14638,28052`;

const barChartCSV =
`Day of Week,Some Arbitrary Amount
Sunday,86
Monday,23
Tuesday,55
Wednesday,78
Thursday,92
Friday,3
Saturday,3`;

/*
 *  [
 *    {
 *      value: 100,
 *    }
 *  ]
*/

function generateLineData(numberOfSeries, lines) {
  return Array(lines).fill().map(() => (
    Array(numberOfSeries).fill().map(() => ({
      value: (Math.random() * 100).toFixed(0),
    }))
  ));
}

// function parseLineChartCSV(csv = lineChartCSV) {
//   let series;
//   const parsed = csvParse(csv, (data, index, columns) => {
//     series = columns.slice(1);
//   });

//   console.log(parsed, series);
// }

function parseMultiBarChart(csv = multiBarCSV) {
  let keys;
  const parsed = csvParse(csv, (data, index, columns) => {
    keys = columns.slice(1);
    const parseConfig = data[columns[0]] === 'config';
    const dataIn = { ...data };
    if (!parseConfig) {
      for (let i = 1, n = columns.length; i < n;) {
        dataIn[columns[i]] = +data[columns[i]];
        i += 1;
      }
      return {
        key: dataIn[columns[0]],
        values: keys.map((key) => ({
          key: `${key}`,
          value: dataIn[key],
        })),
      };
    }
  });

  return {
    data: [...parsed],
    keys,
    colors: ['#E53935', '#A12E62', '#6D1EAA', '#502CB1', '#4543AB', '#6781E5', '#7295E5'],
    xAxis: {
      label: parsed.columns[0],
      domain: parsed.map((x) => x.key),
    },
    yAxis: {
      label: 'Amount', // TODO: make configurable
      domain: [0, Math.max(...parsed.reduce((acc, curr) =>
        [...acc, ...curr.values.map((x) => x.value)], [])),
      ],
    },
  };
}

function parseBarChartCSV(csv = barChartCSV) {
  const parsed = csvParse(csv, (data, index, columns) => ({
    key: data[columns[0]],
    value: +data[columns[1]],
  }));

  return {
    data: [...parsed],
    colors: ['#00ACC1'],
    xAxis: {
      label: parsed.columns[0],
      domain: parsed.map((d) => d.key),
    },
    yAxis: {
      label: parsed.columns[1],
      domain: [0, Math.max(...parsed.map((d) => d.value))],
    },
  }
}

export const parsedBarChartData = parseBarChartCSV;
export const barChart = parseBarChartCSV();
export const lineChart = generateLineData(20, 3);
export const multiBarChart = parseMultiBarChart();
