import React, { useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import * as message from "../../components/Message/Message";
import { GoogleLogin } from "@react-oauth/google";
import AuthService from "../../services/Auth";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(data?.refresh_token));
      
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    if (user?.id) {
      if (user?.isAdmin || user?.isProductManage || user?.isOrderManage) {
        navigate('/system/admin');
      } else {
        navigate('/');
      }
    }
  }, [user]);

  const handleGetDetailsUser = async (id, token) => {
    try {
      const storage = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storage);
      const res = await UserService.getDetailsUser(id, token);
      
      console.log('User details response:', res);
      
      const userData = {
        ...res?.data,
        id: res?.data?._id,
        access_token: token,
        refreshToken,
        isAdmin: res?.data?.isAdmin || false,
        isProductManage: res?.data?.isProductManage || false,
        isOrderManage: res?.data?.isOrderManage || false
      };
      
      console.log('Dispatching user data:', userData);
      dispatch(updateUser(userData));
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  };

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  const handleSuccess = async (credentialResponse) => {
    try {
      const result = await AuthService.googleAuth(
        credentialResponse.credential
      );
      if (result?.role === "user") {

        navigate("/");
      }
    } catch (error) {
      const data = error?.response?.data;
      alert(data?.message || " Login failed");
    }
  };

  const handleError = () => {
    alert(" Login failed");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Hello</h1>
          <p>Sign in and register</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textbutton={"Sign in"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
            {/* <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
            /> */}
          </Loading>
          <p>
            <WrapperTextLight>Forgot password?</WrapperTextLight>
          </p>
          <p>
            Don't have an account?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              {" "}
              Sign up
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="iamge-logo"
            height="203px"
            width="203px"
          />
          <h4>The ATN toy world</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
