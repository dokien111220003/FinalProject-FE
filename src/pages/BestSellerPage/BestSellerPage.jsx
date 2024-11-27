import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { FireOutlined } from '@ant-design/icons';
import * as ProductService from '../../services/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperProducts } from './style';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const BestSellerPage = () => {
  const { isLoading, data: products } = useQuery(['bestSellers'], async () => {
    const res = await ProductService.getAllProduct('', 100); 
    return {
      ...res,
      data: res?.data?.sort((a, b) => b.selled - a.selled).slice(0, 10)
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
              marginBottom: '30px'
            }}>
              <FireOutlined style={{ 
                fontSize: '32px', 
                color: '#ff4d4f',
                marginBottom: '10px'
              }} />
              <h1 style={{ 
                fontSize: '28px',
                color: '#333',
                margin: '10px 0'
              }}>Best Sellers</h1>
              <p style={{ color: '#666' }}>Top 10 most popular products</p>
            </div>
          </motion.div>

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
                  <div style={{ position: 'relative' }}>
                    {/* Thêm badge cho top 3 */}
                    {index < 3 && (
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        zIndex: 1,
                        background: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        Top {index + 1}
                      </div>
                    )}
                    
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
        </div>
      </div>
      <FooterComponent />
    </Loading>
  );
};

export default BestSellerPage; 