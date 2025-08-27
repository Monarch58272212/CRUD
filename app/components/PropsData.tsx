import { effect, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Products {
  id: number;
  name: string;
  price: number;
}
interface Data {
  product: Products[];
}

export default function PropsData({ product }: Data) {
  return (
    <Flex flexDir={"column"} gap={3}>
      {product.map((e) => (
        <Flex key={e.id} flexDir={"column"} gap={3} borderWidth={1}>
          {" "}
          <Text>{e.name}</Text>
          <Text>{e.price}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
