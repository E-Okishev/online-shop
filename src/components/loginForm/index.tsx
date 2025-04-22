import { Button, Form, Input, Typography, Flex } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { registation, login } from "../../slices/loginSlice";
import { UserType } from "../../utils";
import { Link } from "react-router-dom";
const { Title, Paragraph } = Typography;

export const LoginForm = ({ closeModal }: { closeModal: () => void }) => {
  const [openRegistr, setOpenRegistr] = useState(false);
  const { user, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (error === "Пользователь уже зарегистрирован. Войдите") {
      setOpenRegistr(false);
      form.resetFields();
    }
  }, [error]);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const handleFinish = async (values: UserType) => {
    if (values.phone) {
      dispatch(registation(values));
      return;
    }

    dispatch(login(values));
  };

  return (
    <>
      {user ? (
        <>
          <Title level={4}>Добро пожаловать, {user.name}</Title>
          <Link to="/admin">
            <Button type="primary" onClick={() => closeModal()}>
              На страницу администрирования
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Title level={3}>
            {!openRegistr ? "Войти" : "Зарегистрироваться"}
          </Title>

          <Form form={form} onFinish={handleFinish} layout="vertical">
            {openRegistr && (
              <>
                <Form.Item
                  name="name"
                  label="Ваше имя"
                  rules={[{ required: true, message: "Введите имя", max: 64 }]}
                >
                  <Input placeholder="Введите имя" showCount maxLength={64} />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Ваш телефон"
                  rules={[{ required: true, message: "Введите телефон" }]}
                >
                  <Input
                    placeholder="Введите телефон"
                    showCount
                    maxLength={64}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              name="login"
              label="Ваш логин"
              rules={[{ required: true, message: "Введите логин", max: 64 }]}
            >
              <Input placeholder="Введите логин" showCount maxLength={64} />
            </Form.Item>
            <Form.Item
              name="password"
              label="Ваш пароль"
              rules={[
                { required: true, min: 8, message: "Минимум 8 символов" },
              ]}
            >
              <Input
                type="password"
                placeholder="Введите пароль"
                showCount
                minLength={8}
                maxLength={64}
              />
            </Form.Item>
            <Paragraph style={{ color: "red" }}>{error}</Paragraph>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Button type="primary" htmlType="submit">
                  {!openRegistr ? "Войти" : "Зарегистрироваться"}
                </Button>
                <Button type="link" onClick={() => setOpenRegistr(true)}>
                  {!openRegistr ? "Зарегистрироваться" : "Войти"}
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};
