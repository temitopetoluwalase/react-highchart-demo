import { useState, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const App = () => {
  const [tab, setTab] = useState('line');
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('all');

  const chartRef = useRef(null);

  const salesData = {
    2024: [29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
    2025: [83, 78, 98, 93, 106, 84, 105, 104, 91, 83, 109, 120],
  };

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const filteredCategories = month === 'all' ? months : [month];
  const filteredData =
    month === 'all'
      ? salesData[year]
      : [salesData[year][months.indexOf(month)]];

  const baseChartStyle = { backgroundColor: '#f9fafb' };
  const textColor = '#111827';

  const chartOptions = {
    line: {
      chart: { type: 'line', ...baseChartStyle },
      title: {
        text: `Sales Data (${year}) - Line`,
        style: { color: textColor },
      },
      xAxis: {
        categories: filteredCategories,
        labels: { style: { color: textColor } },
      },
      yAxis: {
        title: { text: 'Sales ($)', style: { color: textColor } },
        labels: { style: { color: textColor } },
      },
      series: [{ name: year, data: filteredData, color: '#3b82f6' }],
      exporting: { enabled: false },
    },
    bar: {
      chart: { type: 'bar', ...baseChartStyle },
      title: {
        text: `Sales Data (${year}) - Bar`,
        style: { color: textColor },
      },
      xAxis: {
        categories: filteredCategories,
        labels: { style: { color: textColor } },
      },
      yAxis: {
        title: { text: 'Sales ($)', style: { color: textColor } },
        labels: { style: { color: textColor } },
      },
      series: [{ name: year, data: filteredData, color: '#f97316' }],
      exporting: { enabled: false },
    },
    area: {
      chart: { type: 'area', ...baseChartStyle },
      title: {
        text: `Sales Data (${year}) - Area`,
        style: { color: textColor },
      },
      xAxis: {
        categories: filteredCategories,
        labels: { style: { color: textColor } },
      },
      yAxis: {
        title: { text: 'Sales ($)', style: { color: textColor } },
        labels: { style: { color: textColor } },
      },
      series: [{ name: year, data: filteredData, color: '#ec4899' }],
      exporting: { enabled: false },
    },
    pie: {
      chart: { type: 'pie', ...baseChartStyle },
      title: {
        text: `Yearly Sales Distribution (Pie)`,
        style: { color: textColor },
      },
      series: [
        {
          name: 'Sales',
          data: [
            {
              name: '2024',
              y: salesData[2024].reduce((a, b) => a + b, 0),
              color: '#3b82f6',
            },
            {
              name: '2025',
              y: salesData[2025].reduce((a, b) => a + b, 0),
              color: '#10b981',
            },
          ],
        },
      ],
      exporting: { enabled: false },
    },
  };

  const handleExport = (type) => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      if (type === 'png') chart.exportChart({ type: 'image/png' });
      if (type === 'pdf') chart.exportChart({ type: 'application/pdf' });
      if (type === 'csv') chart.downloadCSV();
    }
  };

  const TabButton = ({ value, children }) => (
    <button
      onClick={() => setTab(value)}
      className={`px-4 py-2 rounded-xl font-medium transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        tab === value
          ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div
      className={`bg-gray-100 text-black flex justify-center items-center min-h-screen p-6`}
    >
      <div
        className={`w-full max-w-5xl p-6 rounded-2xl shadow-lg bg-white
        `}
      >
        <h1 className='text-2xl font-bold text-center mb-6'>
          Dashboard - Sales Data Visualization (Highcharts + Tailwind CSS)
        </h1>

        {/* Filters */}
        <div className='flex flex-wrap gap-4 justify-center mb-6'>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='border rounded-lg px-3 py-2 shadow-sm bg-white text-black'
          >
            <option value='2024'>2024</option>
            <option value='2025'>2025</option>
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className='border rounded-lg px-3 py-2 shadow-sm bg-white text-black'
          >
            <option value='all'>All Months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Export Buttons */}
          <div className='flex gap-2'>
            <button
              onClick={() => handleExport('png')}
              className='px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600'
            >
              Export PNG
            </button>
            <button
              onClick={() => handleExport('csv')}
              className='px-3 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600'
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className='flex justify-center mb-6 gap-2'>
          <TabButton value='line'>Line</TabButton>
          <TabButton value='bar'>Bar</TabButton>
          <TabButton value='area'>Area</TabButton>
          <TabButton value='pie'>Pie</TabButton>
        </div>

        {tab === 'line' && (
          <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={chartOptions.line}
          />
        )}
        {tab === 'bar' && (
          <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={chartOptions.bar}
          />
        )}
        {tab === 'area' && (
          <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={chartOptions.area}
          />
        )}
        {tab === 'pie' && (
          <HighchartsReact
            ref={chartRef}
            highcharts={Highcharts}
            options={chartOptions.pie}
          />
        )}
      </div>
    </div>
  );
};

export default App;
