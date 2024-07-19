import { Button, Checkbox, Form, Input, Divider } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "../../../api";

const Register = () => {
    const navigate = useNavigate();
    const form = Form.useForm();

    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post("/auth", values);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            navigate("/auth");
        }

        form.resetFields();
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
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
                Register
            </h1>
            <Form.Item
                style={{ marginBottom: "5px" }}
                label="Firstname"
                name="first_name"
                rules={[
                    {
                        required: true,
                        message: "Please input your firstname!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                style={{ marginBottom: "5px" }}
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
                style={{ marginBottom: "10px" }}
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                style={{ width: "100%", marginBottom: "10px" }}
                wrapperCol={{
                    span: 24,
                }}
            >
                <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                >
                    Register
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
                Already have an account?
                <NavLink to="/auth">Login</NavLink>
            </p>
        </Form>
    );
};

export default Register;
