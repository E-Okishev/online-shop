import s from "./cardCommentBlock.module.css";
import { Input, Button, Typography, Form, message } from "antd";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../../services/commentsApi";
const { Title } = Typography;
const { TextArea } = Input;

type FieldType = {
  userName?: string;
  text?: string;
};

type CommentForm = {
  userName: string;
  text: string;
};

export const CardCommentBlock = ({ productId }: { productId: number }) => {
  const [form] = Form.useForm();

  const { data } = useGetCommentsQuery(productId);
  const [addComment] = useAddCommentMutation();

  const handleFinis = (values: CommentForm) => {
    const date = new Date().toLocaleString();

    addComment({ ...values, productId, date });
    message.success("Комментарий добавлен");
    form.resetFields();
  };

  return (
    <div className={s.cardComment}>
      <Title level={3}>Комментарии ({data?.length})</Title>
      <div className={s.commentBlock}>
        <div className={s.form}>
          <Form form={form} onFinish={handleFinis} layout="vertical">
            <Form.Item<FieldType>
              name="userName"
              label="Ваше имя"
              rules={[{ required: true }]}
            >
              <Input placeholder="Ваше имя" />
            </Form.Item>

            <Form.Item<FieldType> name="text" label="Комментарий">
              <TextArea
                rows={4}
                placeholder="Текст комментария"
                maxLength={256}
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ul className={s.commentList}>
          {data?.map((comment) => (
            <li key={comment.id} className={s.commentElem}>
              <div className={s.commentAutor}>
                <div className={s.commentAvatr}>
                  {comment.userName.charAt(0)}
                </div>
                <div className={s.commentAutorDate}>
                  <Title level={4}>{comment.userName}</Title>
                  <span>{comment.date}</span>
                </div>
              </div>
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
