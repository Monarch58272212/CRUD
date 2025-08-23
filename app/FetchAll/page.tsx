"use client";
import { Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  createdBy?: string;
}

export default function Page() {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const res = await fetch("/api/post");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProduct(data);
        toast({
          title: "Success",
          description: "Products fetched successfully.",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to fetch products.",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [toast]);
  if (loading) {
    return <Text>Loading products...</Text>;
  }

  return (
    <Flex>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {products.length === 0 ? (
          <Text m={"auto"}>way data pag add sa!!!</Text>
        ) : (
          products.map((e) => (
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
            </Flex>
          ))
        )}
      </SimpleGrid>
    </Flex>
  );
}
