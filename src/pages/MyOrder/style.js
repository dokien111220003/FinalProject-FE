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
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  };
  margin-bottom: 4px;
`

export const WrapperContainer = styled.div`
  width: 100%;
  background-color: #f5f5fa;
`

export const WrapperLeft = styled.div`
  width: 910px;
`

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`
export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction : column;
  gap: 10px;
  border-top: 1px solid rgb(235, 235, 240);
  width: 100%;
  align-items:flex-end;
  padding-top: 10px;
`

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items:flex-start;
  height: 90px;
  width: 100%;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
  flex-direction: column;
  width: 950px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`

export const WrapperStatus = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 15px;
  padding: 15px;
  border-bottom: 1px solid rgb(235, 235, 240);
  flex-direction: column;
  background: #fafafa;
  border-radius: 8px;

  .ant-tag {
    padding: 4px 8px;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`