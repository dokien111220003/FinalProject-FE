import { Col, Image, Rate, Row, Divider, Tag } from "antd";
import { motion } from "framer-motion";
import React from "react";
import imageProductSmall from "../../assets/images/imagesmall.webp";
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperBtnQualityProduct,
} from "./style";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import { useEffect } from "react";
import * as message from "../Message/Message";
import CommentComponent from "../CommentComponent/CommentComponent";
import { useMemo } from "react";

const ProductDetailsComponent = ({ idProduct, showDescription }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success("Add product to cart success");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    { enabled: !!idProduct }
  );
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // {
      //     name: { type: String, required: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Row
          style={{
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Col
            span={10}
            style={{ 
              borderRight: "1px solid #e5e5e5", 
              paddingRight: "24px" 
            }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={productDetails?.image}
                alt="image product"
                preview={false}
                style={{ 
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              />
            </motion.div>
          </Col>
          <Col span={14} style={{ paddingLeft: "24px" }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <WrapperStyleNameProduct>
                {productDetails?.name}
              </WrapperStyleNameProduct>

              <div style={{ margin: '16px 0' }}>
                <Rate
                  allowHalf
                  defaultValue={productDetails?.rating}
                  value={productDetails?.rating}
                  style={{ fontSize: '20px' }}
                />
                <Tag color="blue" style={{ marginLeft: '10px' }}>
                  {productDetails?.rating} / 5
                </Tag>
              </div>

              <WrapperPriceProduct>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <WrapperPriceTextProduct>
                    {convertPrice(productDetails?.price)}
                  </WrapperPriceTextProduct>
                </motion.div>
              </WrapperPriceProduct>

              {showDescription && productDetails?.description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  style={{
                    margin: '20px 0',
                    padding: '20px',
                    background: '#f5f5f5',
                    borderRadius: '8px'
                  }}
                >
                  <h3 style={{ 
                    marginBottom: '12px',
                    color: '#333',
                    fontSize: '18px'
                  }}>
                    Description
                  </h3>
                  <div style={{ 
                    lineHeight: '1.6',
                    color: '#666'
                  }}>
                    {productDetails.description}
                  </div>
                </motion.div>
              )}

              <Divider />

              <div style={{ margin: "20px 0" }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '500',
                  marginBottom: '12px',
                  color: '#333'
                }}>
                  Quantity
                </h3>
                <WrapperQualityProduct>
                  <button
                    style={{
                      border: "1px solid #e5e5e5",
                      width: "32px",
                      height: "32px",
                      background: "#fff",
                      cursor: "pointer",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      "&:hover": {
                        borderColor: "#1890ff",
                        color: "#1890ff"
                      }
                    }}
                    onClick={() => handleChangeCount("decrease", numProduct === 1)}
                  >
                    <MinusOutlined style={{ 
                      color: numProduct === 1 ? "#ccc" : "#333",
                      fontSize: "14px"
                    }} />
                  </button>

                  <WrapperInputNumber
                    onChange={onChange}
                    defaultValue={1}
                    max={productDetails?.countInStock}
                    min={1}
                    value={numProduct}
                    size="small"
                    style={{
                      width: "50px",
                      margin: "0 8px",
                      textAlign: "center",
                      borderRadius: "4px",
                      border: "1px solid #e5e5e5",
                      "&:hover": {
                        borderColor: "#1890ff"
                      }
                    }}
                  />

                  <button
                    style={{
                      border: "1px solid #e5e5e5",
                      width: "32px",
                      height: "32px",
                      background: "#fff",
                      cursor: "pointer",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      "&:hover": {
                        borderColor: "#1890ff",
                        color: "#1890ff"
                      }
                    }}
                    onClick={() => handleChangeCount(
                      "increase",
                      numProduct === productDetails?.countInStock
                    )}
                  >
                    <PlusOutlined style={{ 
                      color: numProduct === productDetails?.countInStock ? "#ccc" : "#333",
                      fontSize: "14px"
                    }} />
                  </button>
                </WrapperQualityProduct>
              </div>

              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "16px",
                marginTop: '24px'
              }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ButtonComponent
                    size={40}
                    styleButton={{
                      background: "rgb(255, 57, 69)",
                      height: "48px",
                      width: "220px",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: '0 2px 8px rgba(255, 57, 69, 0.3)'
                    }}
                    onClick={handleAddOrderProduct}
                    textbutton={"Add to Cart"}
                    styleTextButton={{
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ButtonComponent
                    size={40}
                    styleButton={{
                      background: "#fff",
                      height: "48px",
                      width: "220px",
                      border: "1px solid rgb(13, 92, 182)",
                      borderRadius: "8px",
                    }}
                    textbutton={"Buy Now"}
                    styleTextButton={{ 
                      color: "rgb(13, 92, 182)", 
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  />
                </motion.div>
              </div>

              {errorLimitOrder && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ 
                    color: "red",
                    marginTop: '12px',
                    fontWeight: '500'
                  }}
                >
                  Sorry, this product is out of stock
                </motion.div>
              )}
            </motion.div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ marginTop: '24px' }}
        >
          <CommentComponent
            dataHref={
              process.env.REACT_APP_IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                : window.location.href
            }
            width="1270"
          />
        </motion.div>
      </motion.div>
    </Loading>
  );
};

export default ProductDetailsComponent;
