"use client";
import { Avatar, Box, Flex, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductSkeleton from "./Skeleton";
import { Product } from "../Types/types";

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
    <Box
      width="95%"
      sx={{
        columnCount: [1, 2, 3, 4, 5, 6],
      }}
      gap={5}
    >
      {products.map((e) => (
        <Box
          key={e.id}
          sx={{ breakInside: "avoid", mb: 4 }}
          bg={"gray.700"}
          p={2}
          gap={2}
          borderRadius={"md"}
          display={"flex"}
          flexDir={"column"}
          boxShadow={"sm"}
        >
          <Image
            src={e.imageURL || "/default.jpg"}
            width={500}
            height={300}
            alt={e.name}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              width: "100%",
              height: "auto",
            }}
          />
          <Flex gap={2} align={"center"}>
            <Avatar src={e.user?.picture || undefined} size={"xs"} />
            <Text fontSize={"xs"} color={"gray.500"}>
              {e.user.name}
            </Text>
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
