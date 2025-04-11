// @ts-nocheck

import s from "./cardCommentBlock.module.css";
import type { FormProps } from "antd";
import { Input, Button, Typography, Form } from "antd";
import { useEffect } from "react";
import { createComment, loadComments } from "../../slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
const { Title } = Typography;
const { TextArea } = Input;

type FieldType = {
  userName?: string;
  text?: string;
};

export const CardCommentBlock: React.FC = ({ productId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.card);
  const [form] = Form.useForm();

  const date = new Date().toLocaleString();
  const handleFinis: FormProps<FieldType>["onFinish"] = (values) => {
    const newComment = { ...values, productId, date };
    dispatch(createComment(newComment));
    form.resetFields()
  };

  useEffect(() => {
    dispatch(loadComments(productId));
  }, [productId]);

  return (
    <div className={s.cardComment}>
      <Title level={3}>Комментарии ({comments.length})</Title>
      <div className={s.commentBlock}>
        <div className={s.form}>
          <Form form={form} onFinish={handleFinis}>
            <Form.Item<FieldType> name="userName" rules={[{ required: true }]}>
              <Input placeholder="Ваше имя" />
            </Form.Item>

            <Form.Item<FieldType> name="text">
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
          {comments.map((comment) => (
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
