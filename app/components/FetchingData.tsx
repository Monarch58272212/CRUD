"use client";
import { Avatar, Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductSkeleton from "./Skeleton";

interface Product {
  id: string;
  imageURL: string;
  name: string;
  price: number;
  user: {
    name: string;
    email: string;
    picture?: string;
  };
}

export default function FetchingData() {
  const [products, setProducts] = useState<Product[]>([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function showAllProduct() {
      try {
        setLoading(true);
        const req = await fetch("/api/products/");
        if (!req.ok) {
          throw new Error("basta mali sa frontend sa get api product ");
        }
        const data = await req.json();
        setProducts(data);
        toast({
          title: "wow goods ang fetching",
          description: "wow good",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log("noooooo error sa api frontend product", error);
        toast({
          title: "gagi mali pajud sa api frontend product",
          description: "mali oi",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
    showAllProduct();
  }, [toast]);
  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
      p={4}
      w={"100%"}
    >
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
              <Avatar src={e.user?.picture || undefined} size={"xs"} />

              <Text> Name: {e.name}</Text>
              <Text>Price: {Number(e.price)}</Text>
            </Flex>
          ))
        )}
      </SimpleGrid>
    </Flex>
  );
}
