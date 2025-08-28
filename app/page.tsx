import { Flex } from "@chakra-ui/react";

import FetchingData from "./components/FetchingData";
import { Suspense } from "react";
import ProductSkeleton from "./components/Skeleton";
import Crud from "./components/Crud";

export default function Home() {
  const productList = [
    {
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1756074277712-1df732f679f8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
      description: "qwertyuio",
      complete: false,
    },
    {
      id: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1756017353605-01901a3f86e8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
      description: "lalladlaall",
      complete: false,
    },
    {
      id: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1755896487474-c5b369b35504?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D",
      description: "dasdasd",
      complete: true,
    },
  ];

  const title = "Search Heree";
  return (
    <Flex flexDir={"column"} w={"100%"} justify={"center"} align={"center"}>
      <Suspense fallback={<ProductSkeleton />}>
        <FetchingData />
      </Suspense>
    </Flex>
  );
}
