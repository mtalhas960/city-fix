import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoriesPieChart = ({ categoryCounts }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Define category colors and formatted labels
    const categoryColors = {
      pothole: 'rgb(59, 130, 246)', // primary color for Roads
      streetlight: 'rgb(16, 185, 129)', // success color for Lighting
      garbage: 'rgb(245, 158, 11)', // warning color for Waste
      water: 'rgb(239, 68, 68)', // danger color for Water
      other: 'rgb(156, 163, 175)', // gray for Others
      graffiti: 'rgb(139, 92, 246)', // purple for Parks
      sidewalk: 'rgb(107, 114, 128)', // gray for Sidewalks
    };

    const categoryLabels = {
      pothole: 'Roads',
      streetlight: 'Lighting',
      garbage: 'Waste',
      water: 'Water',
      graffiti: 'Graffiti',
      sidewalk: 'Sidewalks',
      other: 'Others',
    };

    // Prepare data for the chart
    const labels = [];
    const data = [];
    const backgroundColor = [];
    const borderColor = [];

    // Sort categories by count for better visualization
    const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

    for (const [category, count] of sortedCategories) {
      labels.push(categoryLabels[category] || category);
      data.push(count);
      
      const bgColor = categoryColors[category] || 'rgb(156, 163, 175)'; // Default to gray
      backgroundColor.push(bgColor.replace('rgb', 'rgba').replace(')', ', 0.7)'));
      borderColor.push(bgColor);
    }

    setChartData({
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    });
  }, [categoryCounts]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
    cutout: '50%',
  };

  return <Pie data={chartData} options={options} />;
};

export default CategoriesPieChart;
