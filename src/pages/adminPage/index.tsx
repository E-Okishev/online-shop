import { useAppDispatch } from "../../hooks/reduxHooks";
import { createProduct } from "../../slices/cardSlice";
import { ProductType } from "../../utils";
import s from "./AdminPage.module.css";
import {
  Button,
  Form,
  Input,
  Typography,
  Rate,
  Select,
  InputNumber,
  message,
} from "antd";
const { Title } = Typography;
const { TextArea } = Input;

export const AdminPage = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleFinish = (values: ProductType) => {
    console.log(values);
    dispatch(createProduct({ ...values, quantity: 1, currency: "₽" }));
    message.success("Товар добавлен");
    form.resetFields();
  };

  return (
    <>
      <Title>Создание товара</Title>
      <div className={s.cardInfo}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="brand"
            label="Бренд"
            rules={[{ required: true, message: "Заполните поле бренд" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Наименование"
            rules={[{ required: true, message: "Заполните поле наименование" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: "Заполните поле описание" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            name="price"
            label="Цена"
            rules={[{ required: true, message: "Заполните поле цена" }]}
          >
            <InputNumber suffix="₽" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="newPrice"
            label="Новая цена"
            rules={[{ required: true, message: "Заполните поле новая цена" }]}
          >
            <InputNumber suffix="₽" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория"
            rules={[{ required: true, message: "Заполните поле категория" }]}
          >
            <Select
              options={[
                { value: "phone", label: "Телефон" },
                { value: "laptop", label: "Ноутбук" },
                { value: "pristavka", label: "Игровые консоли" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Рейтинг"
            rules={[{ required: true, message: "Заполните поле рейтинг" }]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Ссылка на фото"
            rules={[{ required: true, message: "Заполните ссылку на фото" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
