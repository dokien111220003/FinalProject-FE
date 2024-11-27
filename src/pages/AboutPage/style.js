import styled from 'styled-components';
import { Card } from 'antd';

export const WrapperContainer = styled.div`
  padding: 40px 0;
  background-color: #fff;
`

export const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #333;
`

export const StyledCard = styled(Card)`
  text-align: center;
  margin: 20px 0;
  height: 100%;
  
  .ant-card-body {
    padding: 24px;
  }

  .icon {
    font-size: 40px;
    color: #1890ff;
    margin-bottom: 20px;
  }

  h3 {
    margin-bottom: 16px;
    color: #333;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`

export const Banner = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/path-to-your-banner-image.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
  }

  p {
    font-size: 20px;
    max-width: 600px;
    margin: 0 auto;
  }
`

export const TeamMember = styled.div`
  text-align: center;
  margin: 20px 0;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 15px;
    object-fit: cover;
  }

  h3 {
    margin: 10px 0;
    color: #333;
  }

  p {
    color: #666;
  }
` 