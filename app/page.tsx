import { Flex } from "@chakra-ui/react";

import FetchingData from "./components/FetchingData";
import { Suspense } from "react";
import ProductSkeleton from "./components/Skeleton";

export default function Home() {
  return (
    <Flex flexDir={"column"} w={"100%"} justify={"center"} align={"center"}>
      <Suspense fallback={<ProductSkeleton />}>
        <FetchingData />
      </Suspense>
    </Flex>
  );
}
