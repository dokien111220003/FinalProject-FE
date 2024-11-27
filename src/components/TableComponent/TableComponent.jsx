import { Table } from "antd";
import React, { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
    handleDelteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
  const handleDeleteAll = () => {
    handleDelteMany(rowSelectedKeys);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <div
          style={{
            background: "#1d1ddd",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpenDelete(true)}
        >
          Delete all
        </div>
      )}

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
      <ModalComponent
        title="Delete product"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteAll}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Are you sure you want to delete this product?</div>
        </Loading>
      </ModalComponent>
    </Loading>
  );
};

export default TableComponent;
