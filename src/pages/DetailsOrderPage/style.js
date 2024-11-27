import styled from "styled-components"

export const WrapperHeaderUser = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
`

export const WrapperInfoUser = styled.div`
  flex: 1;
  .name-info {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .address-info, .phone-info, .delivery-info, .delivery-fee, .payment-info {
    color: #666;
    font-size: 14px;
    margin-top: 8px;
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .status-payment {
    margin-top: 10px;
    font-weight: 500;
    color: #52c41a;
  }
`

export const WrapperLabel = styled.div`
  color: rgb(36, 36, 36);
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 15px;
`
export const WrapperContentInfo = styled.div`
  height: 118px;
  width: 320px;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
`

export const WrapperStyleContent = styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

export const WrapperProduct = styled.div`
  display:flex;
  align-items:flex-start;
  margin-top: 10px;
`

export const WrapperNameProduct = styled.div`
  display:flex;
  align-items: flex-start;
  width: 670px;
`

export const WrapperItem = styled.div`
  width: 200px;
  font-weight: bold;
  &:last-child {
    color: red
  }
`
export const WrapperItemLabel = styled.div`
  width: 200px;
  &:last-child {
    font-weight: bold;
  }
`

export const WrapperAllPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end
`