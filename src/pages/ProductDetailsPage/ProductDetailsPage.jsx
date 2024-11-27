import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  return (
    <div style={{width: '100%', background: '#efefef', height: '100%'}}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '1270px', height: '100%', margin: '0 auto', padding: '20px 0' }}
      >
        <Breadcrumb
          items={[
            {
              title: (
                <span 
                  onClick={() => navigate('/')}
                  style={{ 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <HomeOutlined />
                  Home
                </span>
              ),
            },
            {
              title: 'Product Details',
            },
          ]}
          style={{
            margin: '10px 0 20px',
            fontSize: '16px'
          }}
        />
        <ProductDetailsComponent idProduct={id} showDescription={true} />
      </motion.div>
      <FooterComponent />
    </div>
  )
}

export default ProductDetailsPage