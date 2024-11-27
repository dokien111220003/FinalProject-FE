import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { StarOutlined } from '@ant-design/icons';
import * as ProductService from '../../services/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperProducts } from './style';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const BestRatedPage = () => {
  const { isLoading, data: products } = useQuery(['bestRated'], async () => {
    const res = await ProductService.getAllProduct('', 100);
    return {
      ...res,
      // Lọc sản phẩm có rating >= 4 và sắp xếp theo rating giảm dần
      data: res?.data
        ?.filter(product => product.rating >= 4)
        ?.sort((a, b) => b.rating - a.rating)
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px 0',
        minHeight: 'calc(100vh - 100px)'
      }}>
        <div style={{ 
          width: '1270px', 
          margin: '0 auto',
          padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              textAlign: 'center',
              marginBottom: '30px',
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <StarOutlined style={{ 
                fontSize: '40px', 
                color: '#faad14',
                marginBottom: '10px'
              }} />
              <h1 style={{ 
                fontSize: '28px',
                color: '#333',
                margin: '10px 0'
              }}>Best Rated</h1>
              <p style={{ 
                color: '#666',
                fontSize: '16px'
              }}>Top 10 highest rated products</p>
            </div>
          </motion.div>

          {products?.data?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '40px',
                background: '#fff',
                borderRadius: '8px'
              }}
            >
              <h2>No products have been rated yet</h2>
              <p>Please check back later!</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <WrapperProducts>
                {products?.data?.map((product, index) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{
                      position: 'relative',
                      background: '#fff',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      {/* Top Rating Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '40px',
                        right: '10px',
                        background: 'linear-gradient(45deg, #FF69B4, #FF1493)',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(255, 105, 180, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}>
                        <StarOutlined style={{ color: '#FFD700' }}/>
                        {product.rating} Sao
                      </div>
                

                      {product.discount > 0 ? (
                        <Badge.Ribbon 
                          text={`-${product.discount}%`}
                          color="red"
                        >
                          <CardComponent
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            selled={product.selled}
                            discount={product.discount}
                            id={product._id}
                          />
                        </Badge.Ribbon>
                      ) : (
                        <CardComponent
                          countInStock={product.countInStock}
                          description={product.description}
                          image={product.image}
                          name={product.name}
                          price={product.price}
                          rating={product.rating}
                          type={product.type}
                          selled={product.selled}
                          discount={product.discount}
                          id={product._id}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </WrapperProducts>
            </motion.div>
          )}
        </div>
      </div>
      <FooterComponent />
    </Loading>
  );
};

export default BestRatedPage; 