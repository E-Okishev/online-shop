import { Flex, Skeleton } from "antd";
import { CardItemSkeleton } from "../../../components/cardItem/cardItemSkeleton";
import s from '../mainPage.module.css'

export const MainSkeleton = () => {
  return (
    <Flex vertical>
    <Skeleton.Input
      active
      style={{ width: 275, height: 46, marginBottom: 19 }}
    />
    <Skeleton.Input
      active
      style={{
        width: 230,
        height: 38,
        marginBlockEnd: 16,
      }}
    />
    <div className={s.cardList}>
      {[...Array(10).keys()].map((i) => (
        <CardItemSkeleton key={i} />
      ))}
    </div>
  </Flex>
  )
}