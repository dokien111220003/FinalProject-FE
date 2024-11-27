import React from 'react';
import { Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { 
  ShopOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  HeartOutlined 
} from '@ant-design/icons';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import {
  WrapperContainer,
  SectionTitle,
  StyledCard,
  Banner,
  TeamMember
} from './style';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MotionCard = motion(StyledCard);
const MotionTeamMember = motion(TeamMember);

const AboutPage = () => {
  return (
    <div>
      <Banner>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Welcome to ATN Shop</h1>
          <p>Your Trusted Destination for Quality Toys and Educational Products</p>
        </motion.div>
      </Banner>

      <WrapperContainer>
        <div style={{ maxWidth: '1270px', margin: '0 auto', padding: '0 15px' }}>
          {/* Our Story Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <SectionTitle>Our Story</SectionTitle>
            <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
              <Col span={24}>
                <p style={{ fontSize: '16px', lineHeight: '1.8', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                  Founded in 2020, ATN Shop has grown from a small local store to become one of Vietnam's leading toy retailers. 
                  Our mission is to bring joy and education to children through carefully selected toys and learning materials. 
                  We believe in the power of play to shape young minds and create lasting memories.
                </p>
              </Col>
            </Row>
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <SectionTitle>Why Choose Us</SectionTitle>
            <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
              <Col xs={24} sm={12} md={6}>
                <MotionCard
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShopOutlined className="icon" />
                  <h3>Quality Products</h3>
                  <p>We carefully select each product to ensure the highest quality and safety standards.</p>
                </MotionCard>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <MotionCard
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <TeamOutlined className="icon" />
                  <h3>Expert Support</h3>
                  <p>Our knowledgeable team is always ready to help you find the perfect toys for your children.</p>
                </MotionCard>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <MotionCard
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrophyOutlined className="icon" />
                  <h3>Best Prices</h3>
                  <p>We offer competitive prices and regular promotions to provide the best value for our customers.</p>
                </MotionCard>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <MotionCard
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <HeartOutlined className="icon" />
                  <h3>Customer First</h3>
                  <p>Your satisfaction is our top priority. We go above and beyond to meet your needs.</p>
                </MotionCard>
              </Col>
            </Row>
          </motion.div>

          {/* Our Team Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <SectionTitle>Our Team</SectionTitle>
            <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
              <Col xs={24} sm={12} md={8}>
                <MotionTeamMember
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src="/path-to-team-member-1.jpg" 
                    alt="Team Member 1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3>John Doe</h3>
                  <p>Founder & CEO</p>
                </MotionTeamMember>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <MotionTeamMember
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src="/path-to-team-member-2.jpg" 
                    alt="Team Member 2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3>Jane Smith</h3>
                  <p>Product Manager</p>
                </MotionTeamMember>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <MotionTeamMember
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img 
                    src="/path-to-team-member-3.jpg" 
                    alt="Team Member 3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3>Mike Johnson</h3>
                  <p>Customer Service Manager</p>
                </MotionTeamMember>
              </Col>
            </Row>
          </motion.div>
        </div>
      </WrapperContainer>
      <FooterComponent />
    </div>
  );
};

export default AboutPage; 