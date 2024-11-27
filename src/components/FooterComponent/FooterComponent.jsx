import React from 'react';
import { 
  FacebookOutlined, 
  InstagramOutlined, 
  YoutubeOutlined, 
  MailOutlined, 
  PhoneOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import { Col, Row } from 'antd';
import styled from 'styled-components';

const WrapperFooter = styled.footer`
  background-color: #001529;
  color: #fff;
  padding: 40px 0;
  margin-top: 50px;
`

const FooterSection = styled.div`
  padding: 0 20px;
  
  h3 {
    color: #fff;
    font-size: 18px;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 10px;
      
      a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s;
        
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
`

const SocialIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  a {
    color: #fff;
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
`

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const FooterComponent = () => {
  return (
    <WrapperFooter>
      <div style={{ maxWidth: '1270px', margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <FooterSection>
              <h3>About Us</h3>
              <p>ATN Shop - Your trusted destination for toys and educational products. We provide high-quality products for children's development and entertainment.</p>
              <SocialIcons>
                <a href="#"><FacebookOutlined /></a>
                <a href="#"><InstagramOutlined /></a>
                <a href="#"><YoutubeOutlined /></a>
              </SocialIcons>
            </FooterSection>
          </Col>
          
          <Col span={6}>
            <FooterSection>
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </FooterSection>
          </Col>
          
          <Col span={6}>
            <FooterSection>
              <h3>About ATN Shop</h3>
              <ul>
                <li>Founded in 2020</li>
                <li>More than 1000+ customers trust</li>
                <li>100% genuine products</li>
                <li>Nationwide delivery</li>
              </ul>
            </FooterSection>
          </Col>
          
          <Col span={6}>
            <FooterSection>
              <h3>Contact Info</h3>
              <ul>
                <li>
                  <EnvironmentOutlined style={{ marginRight: '8px' }} />
                  123 Toy Street, HN City, Vietnam
                </li>
                <li>
                  <PhoneOutlined style={{ marginRight: '8px' }} />
                  <a href="tel:+77829952">+77829952</a>
                </li>
                <li>
                  <MailOutlined style={{ marginRight: '8px' }} />
                  <a href="mailto:info@atnshop.com">info@atnshop.com</a>
                </li>
              </ul>
            </FooterSection>
          </Col>
        </Row>
        
        <FooterBottom>
          <p>© 2024 ATN Shop. All rights reserved.</p>
        </FooterBottom>
      </div>
    </WrapperFooter>
  );
};

export default FooterComponent; 