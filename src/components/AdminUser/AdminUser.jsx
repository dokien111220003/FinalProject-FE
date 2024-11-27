import { Button, Form, Space, Checkbox } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import Loading from '../LoadingComponent/Loading'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import { useEffect } from 'react'
import * as message from '../../components/Message/Message'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { useQuery } from '@tanstack/react-query'
import { DeleteOutlined, EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { StyledCreateButton } from './style'

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState('')
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const searchInput = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    isAdmin: false,
    avatar: '',
    address: '',
    isProductManage: false,
    isOrderManage: false
  })

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = UserService.updateUser(
        id,
        { ...rests }, token)
      return res
    },
  )

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids
      } = data
      const res = UserService.deleteManyUser(
        ids,
        token)
      return res
    },
  )

  const handleDelteManyUsers = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const mutationDeleted = useMutationHooks(
    (data) => {
      const { id,
        token,
      } = data
      const res = UserService.deleteUser(
        id,
        token)
      return res
    },
  )

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    const filteredUsers = res?.data?.filter(user => 
      user.isProductManage || user.isOrderManage
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
        isAdmin: res?.data?.isAdmin,
        address: res?.data?.address,
        avatar: res.data?.avatar,
        isProductManage: res?.data?.isProductManage || false,
        isOrderManage: res?.data?.isOrderManage || false
      })
    }
    setIsLoadingUpdate(false)
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true)
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true)
  }

  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany

  const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
  const { isLoading: isLoadingUsers, data: users } = queryUser
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    )
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

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
      title: 'Product Manager',
      dataIndex: 'isProductManage',
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }
      ],
      onFilter: (value, record) => record.isProductManage === value,
      render: (isProductManage) => isProductManage ? 'TRUE' : 'FALSE'
    },
    {
      title: 'Order Manager',
      dataIndex: 'isOrderManage',
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }
      ],
      onFilter: (value, record) => record.isOrderManage === value,
      render: (isOrderManage) => isOrderManage ? 'TRUE' : 'FALSE'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    },
  ];
  const dataTable = users?.data?.length && users?.data?.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
  })

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === 'OK') {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
      message.success()
    } else if (isErrorDeletedMany) {
      message.error()
    }
  }, [isSuccessDelectedMany])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
    setIsCreateMode(false)
    setStateUserDetails({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      isProductManage: false,
      isOrderManage: false,
      avatar: ''
    })
    form.resetFields()
  }

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  const handleDeleteUser = () => {
    mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

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
  const onUpdateUser = () => {
    mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateUserDetails }, {
      onSettled: () => {
        queryUser.refetch()
      }
    })
  }

  const handleRoleChange = (role) => {
    setStateUserDetails(prev => {
      if (prev[role]) {
        return {
          ...prev,
          [role]: false
        }
      }
      
      const otherRole = role === 'isProductManage' ? 'isOrderManage' : 'isProductManage'
      return {
        ...prev,
        [role]: true,
        [otherRole]: false
      }
    })
  }

  const [isCreateMode, setIsCreateMode] = useState(false)

  const mutationCreateStaff = useMutationHooks(
    (data) => {
      const { token, ...rests } = data
      const res = UserService.createStaff(rests, token)
      return res
    }
  )

  const { data: dataCreated, isLoading: isLoadingCreated, isSuccess: isSuccessCreated, isError: isErrorCreated } = mutationCreateStaff

  const onFinish = () => {
    const hasOneRole = 
      (stateUserDetails.isProductManage && !stateUserDetails.isOrderManage) || 
      (!stateUserDetails.isProductManage && stateUserDetails.isOrderManage)

    if (!hasOneRole) {
      message.error('Please select exactly one role (Product Manager or Order Manager)')
      return
    }

    if (isCreateMode) {
      mutationCreateStaff.mutate({ 
        token: user?.access_token,
        ...stateUserDetails
      }, {
        onSettled: () => {
          queryUser.refetch()
        }
      })
    } else {
      onUpdateUser()
    }
  }

  useEffect(() => {
    if (isSuccessCreated && dataCreated?.status === 'OK') {
      message.success()
      handleCloseDrawer()
      setIsCreateMode(false)
    } else if (isErrorCreated) {
      message.error()
    }
  }, [isSuccessCreated])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <WrapperHeader>User Management</WrapperHeader>
        <StyledCreateButton 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => {
            setIsCreateMode(true)
            setIsOpenDrawer(true)
            setStateUserDetails({
              name: '',
              email: '',
              password: '',
              phone: '',
              address: '',
              isProductManage: false,
              isOrderManage: false,
              avatar: ''
            })
          }}
        >
          Create Staff
        </StyledCreateButton>
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDelteMany={handleDelteManyUsers} columns={columns} isLoading={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
      <DrawerComponent title='User Details' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <InputComponent value={stateUserDetails['email']} onChange={handleOnchangeDetails} name="email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: 'Please input your  phone!' }]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>

            <Form.Item
              label="Adress"
              name="address"
              rules={[{ required: true, message: 'Please input your  address!' }]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>

            <Form.Item
              label="Roles"
              name="roles"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Checkbox
                  checked={stateUserDetails.isProductManage}
                  onChange={() => handleRoleChange('isProductManage')}
                >
                  Product Manager
                </Checkbox>
                <Checkbox
                  checked={stateUserDetails.isOrderManage}
                  onChange={() => handleRoleChange('isOrderManage')}
                >
                  Order Manager
                </Checkbox>
              </div>
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[{ required: isCreateMode, message: 'Please input your image!' }]}
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

            {isCreateMode && (
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input password!' }]}
              >
                <InputComponent 
                  type="password"
                  value={stateUserDetails.password} 
                  onChange={handleOnchangeDetails} 
                  name="password" 
                />
              </Form.Item>
            )}
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent title="Delete User" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
        <Loading isLoading={isLoadingDeleted}>
          <div>Are you sure you want to delete this account?</div>
        </Loading>
      </ModalComponent>
    </div>
  )
}

export default AdminUser