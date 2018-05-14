function generateBarSeries(numberOfSeries) {
  return Array(numberOfSeries).fill().map((_, seriesNumber) => ({
    title: `Series Number ${seriesNumber + 1}`,
    value: (Math.random() * 100).toFixed(0),
  }));
}

function generateLineData(numberOfSeries, lines) {
  return Array(lines).fill().map(() => (
    Array(numberOfSeries).fill().map(() => ({
      value: (Math.random() * 100).toFixed(0),
    }))
  ));
}

export const barChart = generateBarSeries(9);
export const lineChart = generateLineData(20, 3);
