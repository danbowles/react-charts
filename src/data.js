function generateData(numberOfSeries) {
  return Array(numberOfSeries).fill().map((_, seriesNumber) => ({
    title: `Series Number ${seriesNumber + 1}`,
    value: (Math.random() * 100).toFixed(0),
  }));
}

export default generateData(9);
