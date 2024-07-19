import { Button, Checkbox, Form, Input, Divider } from "antd";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const notify = () => toast("Wow so easy!");
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post("/auth/login", values);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            notify();
        }

        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 24,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "40px",
                    marginBottom: "10px",
                }}
            >
                Login
            </h1>
            <Form.Item
                style={{ marginBottom: "5px" }}
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                style={{ marginBottom: "15px" }}
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                style={{ width: "100%" }}
                wrapperCol={{
                    span: 24,
                }}
            >
                <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                >
                    Login
                </Button>
                <Divider
                    style={{
                        fontSize: "17px",
                        marginBottom: "10px",
                        fontWeight: "600",
                        color: "gray",
                    }}
                >
                    Or
                </Divider>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                        useOneTap
                    />
                </div>
            </Form.Item>
            <p>
                Don't have an account?{" "}
                <NavLink to="/auth/register">Register</NavLink>
            </p>
        </Form>
    );
};

export default Login;
