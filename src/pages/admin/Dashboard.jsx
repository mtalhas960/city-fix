import React, { useState, useEffect } from 'react';
import { 
  RiFileChartLine, 
  RiTimeLine, 
  RiCheckboxCircleLine, 
  RiCalendarLine,
  RiArrowUpSLine,
  RiArrowDownSLine
} from '@remixicon/react';
import reports from '../../data/reports';
import ReportsLineChart from '../../components/admin/ReportsLineChart';
import CategoriesPieChart from '../../components/admin/CategoriesPieChart';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [allReports, setAllReports] = useState([]);
  
  useEffect(() => {
    const storedIssues = localStorage.getItem('issues');
    const combinedReports = reports.concat(JSON.parse(storedIssues || '[]'));
    setAllReports(combinedReports);
  }, []);

  // Calculate statistics from reports data
  const totalReports = allReports.length;
  const resolvedReports = allReports.filter(report => report.status === 'resolved').length;
  const openReports = totalReports - resolvedReports;
  
  // Calculate reports from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const newThisWeek = allReports.filter(report => new Date(report.submittedAt) >= oneWeekAgo).length;
  
  // Calculate percentage changes (mocked for demo - in real app, you'd compare to previous periods)
  const totalChange = { value: 12, isIncrease: true };
  const openChange = { value: 7, isIncrease: false };
  const resolvedChange = { value: 18, isIncrease: true };
  const weeklyChange = { value: 3, isIncrease: true };

  // Group reports by category
  const categoryCounts = allReports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {});
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  return (
    <div>
      {/* Page Title */}
      <div className="mb-6">
        <h3>Dashboard Overview</h3>
        <p className="text-darkGray/70">Welcome back, Admin! Here's what's happening with your city reports.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Reports */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-darkGray/80">Total Reports</h5>
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center text-primary">
              <RiFileChartLine className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <h4>{totalReports}</h4>
            <span className={`${totalChange.isIncrease ? 'text-success' : 'text-danger'} flex items-center text-sm pb-1`}>
              {totalChange.isIncrease ? <RiArrowUpSLine className="h-4 w-4" /> : <RiArrowDownSLine className="h-4 w-4" />}
              {totalChange.value}%
            </span>
          </div>
        </div>

        {/* Open Reports */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-darkGray/80">Open Reports</h5>
            <div className="bg-warning/10 h-10 w-10 rounded-lg flex items-center justify-center text-warning">
              <RiTimeLine className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <h4>{openReports}</h4>
            <span className={`${openChange.isIncrease ? 'text-success' : 'text-danger'} flex items-center text-sm pb-1`}>
              {openChange.isIncrease ? <RiArrowUpSLine className="h-4 w-4" /> : <RiArrowDownSLine className="h-4 w-4" />}
              {openChange.value}%
            </span>
          </div>
        </div>

        {/* Resolved Reports */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-darkGray/80">Resolved</h5>
            <div className="bg-success/10 h-10 w-10 rounded-lg flex items-center justify-center text-success">
              <RiCheckboxCircleLine className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <h4>{resolvedReports}</h4>
            <span className={`${resolvedChange.isIncrease ? 'text-success' : 'text-danger'} flex items-center text-sm pb-1`}>
              {resolvedChange.isIncrease ? <RiArrowUpSLine className="h-4 w-4" /> : <RiArrowDownSLine className="h-4 w-4" />}
              {resolvedChange.value}%
            </span>
          </div>
        </div>

        {/* New This Week */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-darkGray/80">New This Week</h5>
            <div className="bg-primary/10 h-10 w-10 rounded-lg flex items-center justify-center text-primary">
              <RiCalendarLine className="h-6 w-6" />
            </div>
          </div>
          <div className="flex items-end space-x-3">
            <h4 className="font-poppins font-semibold">{newThisWeek}</h4>
            <span className={`${weeklyChange.isIncrease ? 'text-success' : 'text-danger'} flex items-center text-sm pb-1`}>
              {weeklyChange.isIncrease ? <RiArrowUpSLine className="h-4 w-4" /> : <RiArrowDownSLine className="h-4 w-4" />}
              {weeklyChange.value}%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Line chart (takes 2/3 of space) */}
        <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
          <div className="flex flex-col gap-2 sm:justify-between sm:items-center sm:flex-row mb-6">
            <h3 className="font-poppins font-semibold text-lg">Reports Overview</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleTimeRangeChange('weekly')}
                className={`text-sm px-3 py-1 rounded-md ${timeRange === 'weekly' ? 'bg-primary/10 text-primary' : 'bg-lightGray text-darkGray/70'}`}
              >
                Weekly
              </button>
              <button 
                onClick={() => handleTimeRangeChange('monthly')}
                className={`text-sm px-3 py-1 rounded-md ${timeRange === 'monthly' ? 'bg-primary/10 text-primary' : 'bg-lightGray text-darkGray/70'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => handleTimeRangeChange('yearly')}
                className={`text-sm px-3 py-1 rounded-md ${timeRange === 'yearly' ? 'bg-primary/10 text-primary' : 'bg-lightGray text-darkGray/70'}`}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="h-72">
            <ReportsLineChart timeRange={timeRange} reportsData={allReports} />
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-poppins font-semibold text-lg mb-6">Report Categories</h3>
          <div className="h-60">
            <CategoriesPieChart categoryCounts={categoryCounts} />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary mr-2"></div>
              <span className="text-sm text-darkGray/70">Roads</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-success mr-2"></div>
              <span className="text-sm text-darkGray/70">Lighting</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-warning mr-2"></div>
              <span className="text-sm text-darkGray/70">Waste</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-danger mr-2"></div>
              <span className="text-sm text-darkGray/70">Water</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
              <span className="text-sm text-darkGray/70">Parks</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-gray-400 mr-2"></div>
              <span className="text-sm text-darkGray/70">Others</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;