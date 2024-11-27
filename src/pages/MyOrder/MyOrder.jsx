import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Tag } from 'antd'
import { ShoppingOutlined, ClockCircleOutlined, CarOutlined } from '@ant-design/icons'
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message'
import moment from 'moment'

const MyOrderPage = () => {
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token)
    return res.data
  }
  const user = useSelector((state) => state.user)

  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: fetchMyOrder }, {
    enabled: state?.id && state?.token
  })
  const { isLoading, data } = queryOrder

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  }

  const mutation = useMutationHooks(
    (data) => {
      const { id, token , orderItems, userId } = data
      const res = OrderService.cancelOrder(id, token,orderItems, userId)
      return res
    }
  )

  const handleCanceOrder = (order) => {
    mutation.mutate({id : order._id, token:state?.token, orderItems: order?.orderItems, userId: user.id }, {
      onSuccess: () => {
        queryOrder.refetch()
      },
    })
  }
  const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success()
    } else if(isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error(dataCancel?.message)
    }else if (isErrorCancle) {
      message.error()
    }
  }, [isErrorCancle, isSuccessCancel])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}> 
              <img src={order?.image} 
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
              }}>{order?.name}</div>
              <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
          })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <Loading isLoading={isLoading || isLoadingCancel}>
      <WrapperContainer>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            height: '100%', 
            width: '1270px', 
            margin: '0 auto',
            padding: '20px'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <ShoppingOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <h2 style={{ margin: 0 }}>My Orders</h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <WrapperListOrder>
              {data?.map((order) => (
                <motion.div
                  key={order?._id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <WrapperItemOrder>
                    <WrapperStatus>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <Tag color={order.isDelivered ? 'success' : 'processing'}>
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </Tag>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          color: '#888'
                        }}>
                          <ClockCircleOutlined />
                          {moment(order.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '20px',
                        marginTop: '10px',
                        flexWrap: 'wrap'
                      }}>
                        <div>
                          <div style={{ color: '#888', marginBottom: '5px' }}>Delivery Method</div>
                          <Tag color="blue" icon={<CarOutlined />}>
                            {order.shippingMethod || 'Standard Delivery'}
                          </Tag>
                        </div>
                        
                        <div>
                          <div style={{ color: '#888', marginBottom: '5px' }}>Delivery Status</div>
                          <Tag color={order.isDelivered ? 'success' : 'warning'}>
                            {order.isDelivered ? 'Delivered' : 'Not delivered'}
                          </Tag>
                        </div>

                        <div>
                          <div style={{ color: '#888', marginBottom: '5px' }}>Payment Status</div>
                          <Tag color={order.isPaid ? 'success' : 'warning'}>
                            {order.isPaid ? 'Paid' : 'Not paid'}
                          </Tag>
                        </div>

                        {!order.isDelivered && (
                          <div>
                            <div style={{ color: '#888', marginBottom: '5px' }}>Estimated Delivery</div>
                            <Tag color="cyan" icon={<ClockCircleOutlined />}>
                              {moment(order.createdAt).add(3, 'days').format('DD/MM/YYYY')}
                            </Tag>
                          </div>
                        )}
                      </div>
                    </WrapperStatus>

                    {renderProduct(order?.orderItems)}

                    <WrapperFooterItem>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ color: '#888' }}>Total Amount:</span>
                        <span style={{
                          fontSize: '18px',
                          color: '#ff4d4f',
                          fontWeight: 700
                        }}>
                          {convertPrice(order?.totalPrice)}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        {!order.isDelivered && (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <ButtonComponent
                              onClick={() => handleCanceOrder(order)}
                              size={40}
                              styleButton={{
                                height: '36px',
                                border: '1px solid #ff4d4f',
                                borderRadius: '6px',
                                background: '#fff'
                              }}
                              textbutton={'Cancel Order'}
                              styleTextButton={{ 
                                color: '#ff4d4f', 
                                fontSize: '14px',
                                fontWeight: '500'
                              }}
                            />
                          </motion.div>
                        )}
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <ButtonComponent
                            onClick={() => handleDetailsOrder(order?._id)}
                            size={40}
                            styleButton={{
                              height: '36px',
                              background: '#1890ff',
                              borderRadius: '6px',
                              border: 'none'
                            }}
                            textbutton={'View Details'}
                            styleTextButton={{ 
                              color: '#fff', 
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          />
                        </motion.div>
                      </div>
                    </WrapperFooterItem>
                  </WrapperItemOrder>
                </motion.div>
              ))}
            </WrapperListOrder>
          </motion.div>
        </motion.div>
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrderPage