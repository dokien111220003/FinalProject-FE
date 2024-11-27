import React from "react";
import { motion } from "framer-motion";
import { Result, Tag } from 'antd';
import { CheckCircleFilled, CarOutlined, DollarOutlined } from '@ant-design/icons';
import {
  WrapperInfo,
  WrapperContainer,
  WrapperItemOrder,
  WrapperItemOrderInfo,
} from "./style";
import Loading from "../../components/LoadingComponent/Loading";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";

const OrderSuccess = () => {
  const location = useLocation();
  const { state } = location;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0
    }
  };

  const getShippingFeeText = (totalPrice) => {
    if (totalPrice >= 50) {
      return <Tag color="success" icon={<CarOutlined />}>Free Shipping (Orders over $50)</Tag>;
    } else if (totalPrice >= 20) {
      return <Tag color="blue" icon={<CarOutlined />}>$1 Shipping Fee ($20-$50)</Tag>;
    } else {
      return <Tag color="warning" icon={<CarOutlined />}>$2 Shipping Fee (Under $20)</Tag>;
    }
  };

  if (!state || !state.orders) {
    return <div>Order not found.</div>;
  }

  return (
    <div style={{ background: "#f5f5fa", width: "100%", minHeight: "100vh", padding: "20px 0" }}>
      <Loading isLoading={false}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "1270px", margin: "0 auto" }}
        >
          <Result
            status="success"
            title="Order Successfully Placed!"
            subTitle={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <span>Thank you for your purchase. Your order has been processed.</span>
                {getShippingFeeText(state?.totalPriceMemo)}
              </div>
            }
          />

          <WrapperContainer>
            <motion.div variants={itemVariants}>
              <WrapperInfo>
                <Tag icon={<CarOutlined />} color="blue">
                  Delivery Method: {orderContant.delivery[state?.delivery]}
                </Tag>
                <Tag icon={<DollarOutlined />} color="green">
                  Payment Method: {orderContant.payment[state?.payment]}
                </Tag>
              </WrapperInfo>
            </motion.div>

            <motion.div variants={itemVariants}>
              <WrapperItemOrderInfo>
                {state.orders.map((order, index) => (
                  <motion.div
                    key={order?.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <WrapperItemOrder>
                      <div
                        style={{
                          width: "500px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <img
                          src={order.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                          alt={order?.name}
                        />
                        <div
                          style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Price: {convertPrice(order?.price)}
                          </span>
                        </span>
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            Amount: {order?.amount}
                          </span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  </motion.div>
                ))}
              </WrapperItemOrderInfo>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              style={{
                marginTop: '20px',
                padding: '15px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <span style={{ 
                fontSize: "18px", 
                color: "#ff4d4f",
                fontWeight: 600
              }}>
                Total Amount: {convertPrice(state?.totalPriceMemo)}
              </span>
            </motion.div>
          </WrapperContainer>
        </motion.div>
      </Loading>
    </div>
  );
};

export default OrderSuccess;
