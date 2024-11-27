import React, { useState, useEffect } from 'react';
import { Card, DatePicker, Row, Col, Statistic } from 'antd';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import * as OrderService from '../../services/OrderService';
import { WrapperHeader } from './style';
import { DollarOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';

// Đăng ký Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const { RangePicker } = DatePicker;

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState({
    totalOrders: 0,
    uniqueCustomers: 0,
    ordersByDate: [],
    topSellingItems: [],
    orderStatus: {
      totalOrders: 0,
      paidOrders: 0,
      deliveredOrders: 0,
      totalRevenue: 0
    }
  });

  const [dateRange, setDateRange] = useState([
    moment('2024-01-01'),
    moment('2025-12-31')
  ]);

  const fetchStatistics = async (dates) => {
    try {
      const response = await OrderService.getStatistics({
        startDate: dates[0].format('YYYY-MM-DD'),
        endDate: dates[1].format('YYYY-MM-DD')
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      fetchStatistics(dates);
    }
  };

  useEffect(() => {
    fetchStatistics(dateRange);
  }, []);

  // Config cho biểu đồ đơn hàng theo thời gian
  const orderChartData = {
    labels: statistics.ordersByDate.map(item => item._id),
    datasets: [{
      label: 'Number of orders',
      data: statistics.ordersByDate.map(item => item.count),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      fill: false
    }]
  };

  // Config cho biểu đồ top sản phẩm bán chạy
  const topSellingChartData = {
    labels: statistics.topSellingItems.map(item => item.productName),
    datasets: [{
      label: 'Number of sold',
      data: statistics.topSellingItems.map(item => item.totalQuantity),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistics of orders by time'
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <WrapperHeader>
        <h1>Statistics</h1>
        <RangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          format="YYYY-MM-DD"
        />
      </WrapperHeader>

      {/* Thống kê tổng quan */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total orders"
              value={statistics.totalOrders}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Number of customers"
              value={statistics.uniqueCustomers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Revenue"
              value={statistics.orderStatus?.totalRevenue || 0}
              prefix={<DollarOutlined />}
              precision={0}
              suffix="$"
            />
          </Card>
        </Col>
      </Row>

      {/* Thống kê trạng thái đơn hàng */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Paid orders"
              value={statistics.orderStatus?.paidOrders || 0}
              suffix={`/ ${statistics.totalOrders}`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Delivered orders"
              value={statistics.orderStatus?.deliveredOrders || 0}
              suffix={`/ ${statistics.totalOrders}`}
            />
          </Card>
        </Col>
        {/* <Col span={8}>
          <Card>
            <Statistic
              title="Average order"
              value={(statistics.orderStatus?.totalRevenue || 0) / (statistics.totalOrders || 1)}
              precision={0}
              suffix="$"
            />
          </Card>
        </Col> */}
      </Row>

      {/* Biểu đồ đơn hàng theo thời gian */}
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Orders by time">
            <Line data={orderChartData} options={chartOptions} />
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ top sản phẩm bán chạy */}
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Top selling products">
            <Bar 
              data={topSellingChartData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: {
                    ...chartOptions.plugins.title,
                    text: 'Top selling products'
                  }
                }
              }} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
