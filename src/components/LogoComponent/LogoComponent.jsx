import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const LogoText = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #FF69B4; // Pink color
  letter-spacing: 1px;
  font-family: 'Nunito', sans-serif;
  
  span {
    color: #4A90E2; // Blue color for TOYS
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #FF69B4, #4A90E2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.3);
`;

const LogoComponent = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <LogoWrapper onClick={onClick}>
        <LogoIcon>A</LogoIcon>
        <LogoText>
          ATN <span>TOYS</span>
        </LogoText>
      </LogoWrapper>
    </motion.div>
  );
};

export default LogoComponent; 