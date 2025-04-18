import { Flex, Skeleton } from "antd";

export const CardItemSkeleton = () => {
  return (
    <>
      <Flex vertical gap={8}>
        <Skeleton.Image active style={{ width: 275, height: 300 }} />
        <Flex vertical gap={4}>
          <Skeleton.Input active style={{ width: 100, height: 24 }} />
          <Skeleton.Input active style={{ width: 50, height: 18 }} />
          <Skeleton.Node active style={{ width: 275, height: 32 }} />
          <Skeleton.Node active style={{ width: 45, height: 18 }} />
          <Skeleton.Node active style={{ width: 275, height: 48 }} />
        </Flex>
      </Flex>
    </>
  );
};
