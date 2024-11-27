import React, { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { useQuery, useMutation } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import * as message from '../Message/Message';
import { Tag, Radio } from 'antd';
import moment from 'moment';

const AdminOrder = () => {
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const fetchAllOrders = async () => {
    const res = await OrderService.getAllOrder();
    return res.data;
  }

  const queryOrder = useQuery({ 
    queryKey: ['all-orders'], 
    queryFn: fetchAllOrders 
  });

  const { isLoading, data } = queryOrder;

  const filteredOrders = data?.filter((order) => {
    switch (filterStatus) {
      case 'delivered':
        return order.isDelivered;
      case 'pending':
        return !order.isDelivered;
      default:
        return true;
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: (data) => {
      const { id, isDelivered } = data;
      return OrderService.updateDeliveryStatus(id, { isDelivered });
    },
    onSuccess: () => {
      message.success('Update status successfully');
      queryOrder.refetch();
    },
    onError: () => {
      message.error('An error occurred');
    }
  });

  const mutationCancel = useMutation({
    mutationFn: (data) => {
      const { id, orderItems, userId } = data;
      const token = localStorage.getItem('access_token');
      return OrderService.cancelOrder(id, token, orderItems, userId);
    },
    onSuccess: () => {
      message.success('Cancel order successfully');
      queryOrder.refetch();
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || 'An error occurred');
    }
  });

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`);
  }

  const handleCancelOrder = (order) => {
    mutationCancel.mutate({
      id: order._id,
      orderItems: order.orderItems,
      userId: order.user,
    });
  }

  const handleUpdateDelivery = (order) => {
    mutationUpdate.mutate({
      id: order._id,
      isDelivered: !order.isDelivered
    });
  }

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}> 
          <img 
            src={order?.image} 
            style={{
              width: '70px', 
              height: '70px', 
              objectFit: 'cover',
              border: '1px solid rgb(238, 238, 238)',
              padding: '2px'
            }}
          />
          <div style={{
            width: 260,
            overflow: 'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            marginLeft: '10px'
          }}>
            {order?.name}
          </div>
          <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>
            {convertPrice(order?.price)}
          </span>
        </WrapperHeaderItem>
      )
    })
  }

  return (
    <Loading isLoading={isLoading || mutationUpdate.isLoading || mutationCancel.isLoading}>
      <WrapperContainer>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px' 
          }}>
            <h4>Order Management</h4>
            <Radio.Group value={filterStatus} onChange={handleFilterChange}>
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="delivered">Delivered</Radio.Button>
              <Radio.Button value="pending">Pending</Radio.Button>
            </Radio.Group>
          </div>
          <WrapperListOrder>
            {filteredOrders?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '14px', fontWeight: 'bold'}}>
                        Customer: {order.shippingAddress.fullName}
                      </span>
                      <span style={{fontSize: '14px'}}>
                        Phone: {order.shippingAddress.phone}
                      </span>
                    </div>
                    <div style={{margin: '10px 0'}}>
                      <span>Address: {order.shippingAddress.address}, {order.shippingAddress.city}</span>
                    </div>
                    <div style={{margin: '10px 0', color: '#888'}}>
                      Order time: {moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                    </div>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                      <Tag color={order.isPaid ? 'green' : 'red'}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </Tag>
                      <Tag color={order.isDelivered ? 'green' : 'gold'}>
                        {order.isDelivered ? 'Delivered' : 'Pending'}
                      </Tag>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Total: </span>
                      <span style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}>
                        {convertPrice(order?.totalPrice)}
                      </span>
                    </div>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                      <ButtonComponent
                        onClick={() => handleUpdateDelivery(order)}
                        styleButton={{
                          height: '36px',
                          border: '1px solid #389e0d',
                          borderRadius: '4px',
                          background: order.isDelivered ? '#fff' : '#389e0d',
                          minWidth: '120px'
                        }}
                        textbutton={order.isDelivered ? 'Delivered' : 'Pending'}
                        styleTextButton={{ 
                          color: order.isDelivered ? '#389e0d' : '#fff', 
                          fontSize: '14px'
                        }}
                      />
                      <ButtonComponent
                        onClick={() => handleCancelOrder(order)}
                        styleButton={{
                          height: '36px',
                          border: '1px solid #ff4d4f',
                          borderRadius: '4px',
                          background: '#fff',
                          minWidth: '80px'
                        }}
                        textbutton={'Cancel'}
                        styleTextButton={{ 
                          color: '#ff4d4f', 
                          fontSize: '14px' 
                        }}
                      />
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px',
                          background: '#fff',
                          minWidth: '80px'
                        }}
                        textbutton={'Details'}
                        styleTextButton={{ 
                          color: 'rgb(11, 116, 229)', 
                          fontSize: '14px' 
                        }}
                      />
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    </Loading>
  )
}

export default AdminOrder;
