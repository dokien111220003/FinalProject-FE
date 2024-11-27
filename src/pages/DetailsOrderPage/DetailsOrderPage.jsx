import React from 'react'
import { motion } from 'framer-motion'
import { Tag, Steps } from 'antd'
import { 
  ShoppingOutlined, 
  CarOutlined, 
  CheckCircleOutlined,
  DollarOutlined
} from '@ant-design/icons'
import { WrapperAllPrice, WrapperContentInfo, WrapperHeaderUser, WrapperInfoUser, WrapperItem, WrapperItemLabel, WrapperLabel, WrapperNameProduct, WrapperProduct, WrapperStyleContent } from './style'
import logo from '../../assets/images/logo.png'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as OrderService from '../../services/OrderService'
import { useQuery } from '@tanstack/react-query'
import { orderContant } from '../../contant'
import { convertPrice } from '../../utils'
import { useMemo } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useDispatch, useSelector } from "react-redux";

const DetailsOrderPage = () => {
  const params = useParams()
  const location = useLocation()
  const { state } = location
  const { id } = params
  const order = useSelector((state) => state.order);

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token)
    return res.data
  }

  const queryOrder = useQuery({ queryKey: ['orders-details'], queryFn: fetchDetailsOrder }, {
    enabled: id
  })
  const { isLoading, data } = queryOrder

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    },0)
    return result
  },[data])

  const getOrderStatus = () => {
    if (data?.isDelivered) return 3
    if (data?.isPaid) return 2
    return 1
  }

  return (
    <Loading isLoading={isLoading}>
      <div style={{width: '100%', background: '#f5f5fa', minHeight: '100vh', padding: '20px 0'}}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '1270px', margin: '0 auto' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}>
            <ShoppingOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <h2 style={{ margin: 0 }}>Order Details</h2>
          </div>

          <Steps
            current={getOrderStatus()}
            items={[
              {
                title: 'Order Placed',
                icon: <ShoppingOutlined />,
              },
              {
                title: 'Payment Confirmed',
                icon: <DollarOutlined />,
              },
              {
                title: 'Delivered',
                icon: <CheckCircleOutlined />,
              },
            ]}
            style={{ marginBottom: '30px' }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <WrapperHeaderUser>
              <WrapperInfoUser>
                <WrapperLabel>Delivery Address</WrapperLabel>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: '#fff',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className='name-info'>{data?.shippingAddress?.fullName}</div>
                  <div className='address-info'>
                    <span>Address: </span> 
                    {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                  </div>
                  <div className='phone-info'>
                    <span>Phone: </span> 
                    {data?.shippingAddress?.phone}
                  </div>
                </motion.div>
              </WrapperInfoUser>

              {/* Similar styling for other info sections */}
            </WrapperHeaderUser>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <WrapperStyleContent>
              {/* Product list header */}
              <div style={{
                padding: '15px',
                background: '#fff',
                borderRadius: '8px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{width: '670px'}}>Product</div>
                  <WrapperItemLabel>Price</WrapperItemLabel>
                  <WrapperItemLabel>Amount</WrapperItemLabel>
                  <WrapperItemLabel>Discount</WrapperItemLabel>
                </div>
                {data?.orderItems?.map((order) => {
                  return (
                    <WrapperProduct>
                      <WrapperNameProduct>
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
                          marginLeft: '10px',
                          height: '70px',
                        }}></div>
                      </WrapperNameProduct>
                      <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                      <WrapperItem>{order?.amount}</WrapperItem>
                      <WrapperItem>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</WrapperItem>
                      
                      
                    </WrapperProduct>
                  )
                })}
              </div>

              {/* Price summary */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  padding: '20px',
                  background: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <WrapperAllPrice>
                  <div style={{ marginBottom: '10px' }}>
                    <WrapperItemLabel>Temporary</WrapperItemLabel>
                    <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <WrapperItemLabel>Delivery fee</WrapperItemLabel>
                    <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
                  </div>
                  <div style={{
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '10px',
                    marginTop: '10px'
                  }}>
                    <WrapperItemLabel>Total</WrapperItemLabel>
                    <WrapperItem style={{
                      fontSize: '20px',
                      color: '#ff4d4f'
                    }}>
                      {convertPrice(data?.totalPrice)}
                    </WrapperItem>
                  </div>
                </WrapperAllPrice>
              </motion.div>
            </WrapperStyleContent>
          </motion.div>
        </motion.div>
      </div>
    </Loading>
  )
}

export default DetailsOrderPage