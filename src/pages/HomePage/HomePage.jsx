import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Row, Col, Badge } from 'antd'
import { 
  FireOutlined, 
  GiftOutlined, 
  StarOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'
import slider3 from '../../assets/images/slider3.webp'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(6)
  const [typeProducts, setTypeProducts] = useState([])
  const [sortBySold, setSortBySold] = useState(false);
  const navigate = useNavigate();
  
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)

    return res

  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])

  const sortedProducts = sortBySold && products?.data ? 
    [...products.data].sort((a, b) => b.selled - a.selled) : 
    products?.data;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  }

  // Thêm Featured Categories section
  const featuredCategories = [
    { icon: <GiftOutlined />, title: 'New Toys', desc: 'Newest products' },
    { icon: <FireOutlined />, title: 'Best Sellers', desc: 'Most popular' },
    { icon: <StarOutlined />, title: 'Best Rated', desc: 'Highest rated' },
    { icon: <ThunderboltOutlined />, title: 'Deal of the Day', desc: 'Special deals' }
  ]

  return (
    <Loading isLoading={isLoading || loading}>
      {/* Featured Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          width: '1270px', 
          margin: '20px auto',
          padding: '20px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Row gutter={[32, 32]} justify="space-around">
          {featuredCategories.map((category, index) => (
            <Col key={index} span={6}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => {
                  if (category.title === 'New Toys') {
                    navigate('/new-products');
                  } else if (category.title === 'Best Sellers') {
                    navigate('/best-sellers');
                  } else if (category.title === 'Deal of the Day') {
                    navigate('/hot-deals');
                  } else if (category.title === 'Best Rated') {
                    navigate('/best-rated');
                  }
                }}
              >
                <div style={{
                  fontSize: '32px',
                  color: 'rgb(11, 116, 229)',
                  marginBottom: '10px'
                }}>
                  {category.icon}
                </div>
                <h3 style={{ margin: '10px 0', color: '#333' }}>{category.title}</h3>
                <p style={{ color: '#666' }}>{category.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>

      {/* Existing Type Products Section with enhanced styling */}
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px 0',
            padding: '20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <WrapperTypeProduct>
            {typeProducts.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TypeProduct name={item} />
              </motion.div>
            ))}
          </WrapperTypeProduct>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setSortBySold(!sortBySold)}
            style={{
              padding: '10px 20px',
              backgroundColor: sortBySold ? 'rgb(11, 116, 229)' : '#fff',
              color: sortBySold ? '#fff' : 'rgb(11, 116, 229)',
              border: '1px solid rgb(11, 116, 229)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {sortBySold ? (
              <>
                <ThunderboltOutlined /> New Toys
              </>
            ) : (
              <>
                <FireOutlined /> Best Sellers
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Products Section */}
      <div className='body' style={{ width: '100%', backgroundColor: '#f5f5f5', padding: '20px 0' }}>
        <div id="container" style={{ width: '1270px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '30px' }}
          >
            <SliderComponent arrImages={[slider1, slider2, slider3]} />
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <WrapperProducts>
              {sortedProducts?.map((product) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {product.discount > 0 && (
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
                  )}
                  {!product.discount && (
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

          {/* Enhanced Load More Button */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <WrapperButtonMore
                textbutton={isPreviousData ? 'Loading...' : "View more products"}
                type="outline"
                styleButton={{
                  border: '1px solid rgb(11, 116, 229)',
                  color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11, 116, 229)'}`,
                  width: '280px',
                  height: '45px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
                disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                styleTextButton={{ 
                  fontWeight: 500, 
                  color: products?.total === products?.data?.length && '#fff' 
                }}
                onClick={() => setLimit((prev) => prev + 6)}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </Loading>
  )
}

export default HomePage 