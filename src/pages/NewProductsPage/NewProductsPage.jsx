import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from 'antd';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperProducts } from './style';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const NewProductsPage = () => {
  const { isLoading, data: products } = useQuery(['newProducts'], async () => {
    const res = await ProductService.getAllProduct('', 10);
    // Sắp xếp theo thời gian tạo mới nhất
    return {
      ...res,
      data: res?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    };
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
            <h1 style={{ 
              textAlign: 'center',
              fontSize: '28px',
              color: '#333',
              marginBottom: '30px'
            }}>New Products</h1>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <WrapperProducts>
              {products?.data?.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                >
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

export default NewProductsPage; 