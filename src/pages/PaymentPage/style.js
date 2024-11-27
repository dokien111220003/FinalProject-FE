import { Radio } from "antd";
import styled  from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`

export const WrapperLeft = styled.div`
  width: 910px;
`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`
export const WrapperCountOrder  = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`

export const WrapperTotal = styled.div`
  display: flex;
   align-items: flex-start; 
   justify-content: space-between;
    padding: 17px 20px;
    background: #fff ;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold
`

export const WrapperRadio = styled(Radio.Group)`
  width: 100%;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  border-radius: 4px;
  padding: 16px;
  margin: 0;

  .ant-radio-wrapper {
    width: 100%;
    margin: 0;
    padding: 12px;
    display: block;

    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    &.ant-radio-wrapper-checked {
      background: rgba(24, 144, 255, 0.1);
    }

    // Fix spacing between radio buttons
    & + .ant-radio-wrapper {
      margin-top: 8px;
    }
  }

  .ant-space {
    width: 100%;
  }

  // Ensure content stays within bounds
  .ant-space-item {
    width: 100%;
  }
`;