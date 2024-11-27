import styled from 'styled-components';

export const WrapperContainer = styled.div`
  background-color: #f5f5f5;
  min-height: calc(100vh - 100px);
`

export const ContactCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`

export const ContactInfo = styled.div`
  color: #333;
`

export const ContactTitle = styled.h1`
  font-size: 28px;
  color: #1890ff;
  margin-bottom: 24px;
`

export const InfoItem = styled.div`
  margin-bottom: 16px;
  font-size: 16px;

  .anticon {
    margin-right: 10px;
    color: #1890ff;
  }

  a {
    color: #1890ff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

export const SocialLinks = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 20px;

  a {
    color: #1890ff;
    font-size: 24px;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.2);
      color: #40a9ff;
    }
  }
`

export const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: #1890ff;
` 