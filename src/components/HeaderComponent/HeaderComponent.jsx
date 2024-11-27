import styled from 'styled-components';
import { motion } from 'framer-motion';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoIcon = styled(motion.div)`
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

const StyledWrapperTextHeader = styled(WrapperTextHeader)`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(45deg, #FF69B4, #4A90E2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

// Trong component của bạn
<Col span={5}>
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px' 
  }}>
    <motion.div
      whileHover={{ scale: 1.1 }}
      style={{
        width: '35px',
        height: '35px',
        background: 'linear-gradient(45deg, #FF69B4, #4A90E2)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 2px 8px rgba(255, 105, 180, 0.3)'
      }}
    >
      A
    </motion.div>
    <WrapperTextHeader 
      to='/'
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        background: 'linear-gradient(45deg, #FF69B4, #4A90E2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      ATN TOYS
    </WrapperTextHeader>
  </div>
</Col> 