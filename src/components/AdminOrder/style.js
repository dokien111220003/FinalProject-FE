import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
`

export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
    & .ant-upload-list-item {
        display: none;
    }
`

export const WrapperContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px 0;
`

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`

export const WrapperItemOrder = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,.12);
`

export const WrapperStatus = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 10px;
`

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
`

export const WrapperFooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
`