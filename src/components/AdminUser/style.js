import { Upload, Button } from "antd";
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

export const StyledCreateButton = styled(Button)`
  background: #ff69b4;
  height: 40px;
  padding: 0 25px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  
  &:hover {
    background: #ff1493 !important;
  }

  .anticon {
    font-size: 16px;
  }
`