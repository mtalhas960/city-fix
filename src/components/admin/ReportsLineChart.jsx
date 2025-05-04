import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportsLineChart = ({ timeRange, reportsData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const processData = () => {
      let labels = [];
      let newReportsData = [];
      let resolvedReportsData = [];
      if (timeRange === 'weekly') {
        labels = Array(7).fill().map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toLocaleDateString('en-US', { weekday: 'short' });
        });

        Array(7).fill().forEach((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          const startOfDay = new Date(date.setHours(0, 0, 0, 0));
          const endOfDay = new Date(date.setHours(23, 59, 59, 999));

          const newCount = reportsData.filter(report => {
            const reportDate = new Date(report.submittedAt);
            return reportDate >= startOfDay && reportDate <= endOfDay;
          }).length;

          const resolvedCount = reportsData.filter(report => {
            const reportDate = new Date(report.submittedAt);
            return reportDate >= startOfDay && reportDate <= endOfDay && report.status === 'resolved';
          }).length;

          newReportsData.push(newCount);
          resolvedReportsData.push(resolvedCount);
        });

      } else if (timeRange === 'monthly') {
        labels = Array(30).fill().map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }); // e.g., "2 May"
        });

        Array(30).fill().forEach((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          const startOfDay = new Date(date.setHours(0, 0, 0, 0));
          const endOfDay = new Date(date.setHours(23, 59, 59, 999));

          const newCount = reportsData.filter(report => {
            const reportDate = new Date(report.submittedAt);
            return reportDate >= startOfDay && reportDate <= endOfDay;
          }).length;

          const resolvedCount = reportsData.filter(report => {
            const reportDate = new Date(report.submittedAt);
            return reportDate >= startOfDay && reportDate <= endOfDay && report.status === 'resolved';
          }).length;

          newReportsData.push(newCount);
          resolvedReportsData.push(resolvedCount);
        });
      }
      else {
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        newReportsData = [];
        resolvedReportsData = [];

        const now = new Date();
        const year = now.getFullYear();

        labels.forEach((_, monthIndex) => {
          const startOfMonth = new Date(year, monthIndex, 1);
          const endOfMonth = new Date(year, monthIndex + 1, 0); // last day of month
          endOfMonth.setHours(23, 59, 59, 999);

          const newCount = reportsData.filter(report => {
            const reportDate = new Date(report.submittedAt);
            return reportDate >= startOfMonth && reportDate <= endOfMonth;
          }).length;

          const resolvedCount = reportsData.filter(report => {
            const reportDate = new Date(report.submittedAt);
            return reportDate >= startOfMonth && reportDate <= endOfMonth && report.status === 'resolved';
          }).length;

          newReportsData.push(newCount);
          resolvedReportsData.push(resolvedCount);
        });
      }

      return {
        labels,
        datasets: [
          {
            label: 'New Reports',
            data: newReportsData,
            borderColor: '#3b82f6', // primary color
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.3,
          },
          {
            label: 'Resolved Reports',
            data: resolvedReportsData,
            borderColor: '#10b981', // success color
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            tension: 0.3,
          },
        ],
      };
    };

    setChartData(processData());
  }, [timeRange, reportsData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          boxHeight: 6,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        padding: 12,
        boxPadding: 6,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
          color: '#9CA3AF',
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          font: {
            size: 10,
          },
          color: '#9CA3AF',
          padding: 8,
        },
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5,
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default ReportsLineChart;
