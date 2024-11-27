import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import { getItem } from "../../utils";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  ImportOutlined,
  TeamOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderCompoent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminImportHistory from "../../components/AdminImportHistory/AdminImportHistory";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import AdminCustomer from "../../components/AdminCustomer/AdminCustomer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [keySelected, setKeySelected] = useState("");

  useEffect(() => {
    if (!user?.isAdmin && !user?.isProductManage && !user?.isOrderManage) {
      navigate("/");
    }

    if (user?.isProductManage) {
      setKeySelected("product");
    } else if (user?.isOrderManage) {
      setKeySelected("order");
    } else if (user?.isAdmin) {
      setKeySelected("dashboard");
    }
  }, [user, navigate]);

  const getMenuItems = () => {
    if (user?.isAdmin) {
      return [
        getItem("Dashboard", "dashboard", <DashboardOutlined />),
        getItem("User", "user", <UserOutlined />),
        getItem("Customer", "customer", <TeamOutlined />),
        getItem("Product", "product", <GiftOutlined />),
        getItem("Import history", "importHistorySchema", <ImportOutlined />),
        getItem("Order", "order", <ShoppingCartOutlined />),
      ];
    } else if (user?.isProductManage) {
      return [
        getItem("Product", "product", <GiftOutlined />),
        getItem("Import history", "importHistorySchema", <ImportOutlined />),
      ];
    } else if (user?.isOrderManage) {
      return [getItem("Order", "order", <ShoppingCartOutlined />)];
    }
    return [];
  };

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "customer":
        return <AdminCustomer />;
      case "product":
        return <AdminProduct />;
      case "importHistorySchema":
        return <AdminImportHistory />;
      case "dashboard":
        return <AdminDashboard />;
      case "order":
        return <AdminOrder />;

      default:
        return <></>;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex", overflowX: "hidden" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={getMenuItems()}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: "15px 0 15px 15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
