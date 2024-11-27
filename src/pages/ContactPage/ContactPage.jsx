import React from 'react';
import { Row, Col } from 'antd';
import { motion } from 'framer-motion';
import { 
  MailOutlined, 
  PhoneOutlined,
  GithubOutlined,
  LinkedinOutlined,
  UserOutlined
} from '@ant-design/icons';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import {
  WrapperContainer,
  ContactCard,
  ContactInfo,
  SocialLinks,
  ProfileImage,
  ContactTitle,
  InfoItem
} from './style';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const ContactPage = () => {
  return (
    <div>
      <WrapperContainer>
        <div style={{ maxWidth: '1270px', margin: '0 auto', padding: '40px 15px' }}>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={18} lg={16}>
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInUp}
              >
                <ContactCard>
                  <Row gutter={[32, 32]} align="middle">
                    <Col xs={24} md={8}>
                      <ProfileImage>
                        <UserOutlined style={{ fontSize: '80px' }} />
                      </ProfileImage>
                    </Col>
                    <Col xs={24} md={16}>
                      <ContactInfo>
                        <ContactTitle>About Developer</ContactTitle>
                        <InfoItem>
                          <UserOutlined /> <strong>Name:</strong> Kelvin Do
                        </InfoItem>
                        <InfoItem>
                          <MailOutlined /> <strong>Email:</strong> 
                          <a href="mailto:dokien11122003@gmail.com"> dokien11122003@gmail.com</a>
                        </InfoItem>
                        <InfoItem>
                          <PhoneOutlined /> <strong>Phone:</strong> 
                          <a href="tel:0778299526"> 0778299526</a>
                        </InfoItem>
                        
                        <SocialLinks>
                          <a href="https://github.com/YourGithub" target="_blank" rel="noopener noreferrer">
                            <GithubOutlined />
                          </a>
                          <a href="https://linkedin.com/in/YourLinkedIn" target="_blank" rel="noopener noreferrer">
                            <LinkedinOutlined />
                          </a>
                        </SocialLinks>

                        <div style={{ marginTop: '20px' }}>
                          <p>I am a passionate web developer specializing in creating modern and user-friendly e-commerce solutions. 
                             With expertise in React.js and Node.js, I strive to deliver high-quality applications that provide great user experiences.</p>
                        </div>
                      </ContactInfo>
                    </Col>
                  </Row>
                </ContactCard>
              </motion.div>
            </Col>
          </Row>
        </div>
      </WrapperContainer>
      <FooterComponent />
    </div>
  );
};

export default ContactPage; 