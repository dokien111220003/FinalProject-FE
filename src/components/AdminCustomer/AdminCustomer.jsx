import { Button, Form, Space } from 'antd'
import React, { useState, useRef, useEffect } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import * as message from '../../components/Message/Message'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'

const AdminCustomer = () => {
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const searchInput = useRef(null);
  const user = useSelector((state) => state?.user)
  const [form] = Form.useForm();

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    address: ''
  })

  // Mutations
  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, { ...rests }, token)
      return res
    },
  )

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id, token } = data
      const res = UserService.deleteUser(id, token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids } = data
      const res = UserService.deleteManyUser(ids, token)
      return res
    },
  )

  // Queries
  const getAllCustomers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    const filteredUsers = res?.data?.filter(user => 
      !user.isAdmin && !user.isProductManage && !user.isOrderManage
    );
    return { ...res, data: filteredUsers };
  }

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        avatar: res.data?.avatar
      })
    }
    setIsLoadingUpdate(false)
  }

  const queryCustomer = useQuery({ queryKey: ['customers'], queryFn: getAllCustomers })
  const { isLoading: isLoadingCustomers, data: customers } = queryCustomer

  // Add mutation states destructuring
  const { 
    data: dataUpdated, 
    isLoading: isLoadingUpdated, 
    isSuccess: isSuccessUpdated, 
    isError: isErrorUpdated 
  } = mutationUpdate

  const { 
    data: dataDeleted, 
    isLoading: isLoadingDeleted, 
    isSuccess: isSuccessDeleted, 
    isError: isErrorDeleted 
  } = mutationDeleted

  const { 
    data: dataDeletedMany, 
    isLoading: isLoadingDeletedMany, 
    isSuccess: isSuccessDeletedMany, 
    isError: isErrorDeletedMany 
  } = mutationDeletedMany

  // Add success/error handlers
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success()
      setIsModalOpenDelete(false)
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDeleted])

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      setIsOpenDrawer(false)
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  // Handlers
  const handleDetailsCustomer = () => {
    setIsOpenDrawer(true)
  }

  const handleDeleteCustomer = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryCustomer.refetch()
      }
    })
  }

  const handleDelteManyCustomers = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryCustomer.refetch()
      }
    })
  }

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer', marginRight: '10px' }} 
          onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} 
          onClick={handleDetailsCustomer} />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // Add action column to existing columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address?.length - b.address?.length,
      ...getColumnSearchProps('address')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    }
  ];

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview
    })
  }

  const onUpdateCustomer = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
      onSettled: () => {
        queryCustomer.refetch()
      }
    })
  }

  // Effects
  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const dataTable = customers?.data?.length && customers?.data?.map((customer) => {
    return { ...customer, key: customer._id }
  })

  return (
    <div>
      <WrapperHeader>Customer Management</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent 
          handleDelteMany={handleDelteManyCustomers}
          columns={columns} 
          isLoading={isLoadingCustomers} 
          data={dataTable} 
          onRow={(record, rowIndex) => ({
            onClick: () => setRowSelected(record._id)
          })}
        />
      </div>

      <DrawerComponent 
        title='Customer Details' 
        isOpen={isOpenDrawer} 
        onClose={() => setIsOpenDrawer(false)} 
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateCustomer}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input customer name!' }]}
            >
              <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input customer email!' }]}
            >
              <InputComponent value={stateUserDetails.email} onChange={handleOnchangeDetails} name="email" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input customer phone!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please input customer address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[{ required: true, message: 'Please input customer avatar!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button>Select File</Button>
                {stateUserDetails?.avatar && (
                  <img 
                    src={stateUserDetails?.avatar} 
                    style={{
                      height: '60px',
                      width: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '10px'
                    }} 
                    alt="avatar" 
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      <ModalComponent 
        title="Delete Customer" 
        open={isModalOpenDelete} 
        onCancel={() => setIsModalOpenDelete(false)} 
        onOk={handleDeleteCustomer}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Are you sure you want to delete this customer?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminCustomer
