// @ts-nocheck
import s from "./Title.module.css";

export const Title = ({ text }) => {
  return <h1 className={s.title}>{text}</h1>;
};
