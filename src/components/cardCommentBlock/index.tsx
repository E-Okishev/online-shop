import s from "./cardCommentBlock.module.css";
import type { FormProps } from 'antd';
import { Input, Button, Typography, Form } from "antd";
const { Title } = Typography;
const { TextArea } = Input;

type FieldType = {
  username?: string;
  comment?: string;
};

export const CardCommentBlock: React.FC = () => {
  const handleFinis: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values);
  };

  return (
    <div className={s.cardComment}>
      <Title level={3}>Комментарии</Title>
      <Form onFinish={handleFinis}>
        <Form.Item<FieldType> name="username" rules={[{ required: true }]}>
          <Input placeholder="Ваше имя" />
        </Form.Item>

        <Form.Item<FieldType> name="comment">
          <TextArea rows={4} placeholder="Текст комментария" maxLength={256} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
