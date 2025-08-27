"use client";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { useState } from "react";

interface Product {
  id: number;
  imageURL: string;
  name: string;
  price: number;
}
export default function Page() {
  const [products, setProduct] = useState<Product[]>([]);
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //kinde
  const { isAuthenticated, isLoading } = useKindeAuth();

  //Add Product
  async function handleAdd() {
    if (isLoading) return; // Ensure loading state is set while checking authentication
    if (!isAuthenticated) {
      toast({
        title: "Di ka pa naka-login!",
        description: "Kailangan mong mag-login para mag-add ng product.",
        status: "warning",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    if (!imageURL || !name || !price) {
      toast({
        title: "error man oi",
        description: "butangi tanan para mogana",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const req = await fetch("/api/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageURL,
          name,
          price: Number(price), // Convert price to a number
        }),
      });

      if (!req.ok) {
        throw new Error("Failed to create product");
      }

      const data = await req.json();
      setProduct([data, ...products]);
      setImageURL("");
      setName("");
      setPrice("");
      toast({
        title: "Product created successfully",
        description: "Product has been added to the list",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "error man oi",
        description: "mali imong sa create na catch hays",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Flex
      w={"90%"}
      m={"auto"}
      flexDir={"column"}
      align={"center"}
      justify={"center"}
    >
      <Flex flexDir={"column"} w={"70%"} gap={5}>
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            isDisabled={loading === true}
            type="text"
            placeholder="Image url"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input
            isDisabled={loading === true}
            placeholder="Description"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            isDisabled={loading === true}
            type="number"
            min={0}
            placeholder="Description"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleAdd} isDisabled={loading} isLoading={loading}>
          Add Product
        </Button>
        {imageURL && (
          <Image
            alt="Product preview"
            src={imageURL}
            width={200}
            height={200}
            style={{ objectFit: "contain" }}
          />
        )}
      </Flex>
    </Flex>
  );
}
