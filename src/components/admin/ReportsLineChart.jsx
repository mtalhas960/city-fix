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
    // Process data based on timeRange
    const processData = () => {
      let labels = [];
      let newReportsData = [];
      let resolvedReportsData = [];
      
      if (timeRange === 'weekly') {
        // Create labels for the last 7 days
        labels = Array(7).fill().map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          return date.toLocaleDateString('en-US', { weekday: 'short' });
        });
        
        // Process report data for each day
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
        // Create labels for the last 4 weeks
        labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        
        // Mock data for monthly view (in a real app, you'd process actual data)
        newReportsData = [48, 65, 42, 56];
        resolvedReportsData = [32, 48, 38, 44];
      } else {
        // Create labels for months in a year
        labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Mock data for yearly view (in a real app, you'd process actual data)
        newReportsData = [150, 180, 210, 250, 280, 240, 260, 270, 290, 310, 330, 350];
        resolvedReportsData = [120, 140, 160, 200, 220, 200, 210, 240, 250, 260, 280, 300];
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
