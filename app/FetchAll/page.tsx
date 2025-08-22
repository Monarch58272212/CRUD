"use server";
import { Button, Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";

import Image from "next/image";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  createdBy: string;
}

export default function Page() {
  const [products, setProduct] = useState<Product[]>([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(`/api/products`);
        if (!req.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await req.json();

        setProduct(data);
        toast({
          title: "Products fetched successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error fetching products",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    fetchData();
  }, [toast]);

  return (
    <Flex flexDir={"column"} w={"100%"} justify={"center"} align={"center"}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {products.map((e: Product) => (
          <Flex key={e.id} flexDir={"column"} align={"center"} gap={2}>
            <Image
              src={e.imageURL || "/default.jpg"}
              width={300}
              height={300}
              layout="responsive"
              alt={e.name}
            />

            <Text> Name: {e.name}</Text>
            <Text>Price: {Number(e.price)}</Text>
            <Flex gap={2}>
              <Button colorScheme="green">Edit</Button>
              <Button colorScheme="red">Delete</Button>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
