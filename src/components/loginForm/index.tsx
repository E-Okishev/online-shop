import { Button, Form, Input, Typography, Flex } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { registation } from "../../slices/loginSlice";
import { UserType } from "../../utils";
const { Title } = Typography;

export const LoginForm = () => {
  const [openRegistr, setOpenRegistr] = useState(false);

const dispatch = useAppDispatch()

const handleFinish = (values: UserType) => {
  dispatch(registation(values))
}

  return (
    <>
      <Title level={3}>{!openRegistr ? "Войти" : "Зарегистрироваться"}</Title>
      <Form onFinish={handleFinish}>
        {openRegistr && (
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
        )}
        <Form.Item
          name="login"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="Введите логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, min: 8, message: "Минимум 8 символов" }]}
        >
          <Input type="password" placeholder="Введите пароль" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Button type="primary" htmlType="submit">
              {!openRegistr ? "Войти" : "Зарегистрироваться"}
            </Button>
            <Button type="link" onClick={() => setOpenRegistr(!openRegistr)}>
              {!openRegistr ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};
