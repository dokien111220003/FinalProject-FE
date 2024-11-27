import { message } from "antd";

const success = (mes = 'Success') => {
    message.success(mes);
};

const error = (mes = 'Error') => {
    message.error(mes);
};

const errorregis = (mes = 'Email already used or password is invalid') => {
    message.error(mes);
};

const errorlog = (mes = 'Invalid email or password') => {
    message.error(mes);
};

const warning = (mes = 'Warning') => {
    message.warning(mes);
};

export { success, error, warning, errorregis, errorlog }