"use client";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import ProductSkeleton from "./Skeleton";

interface Product {
  id: string;
  imageURL: string;
  name: string;
  price: number;
}

export default function FetchingData() {
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const toast = useToast();
  const [search, setSearch] = useState("");
  //Edit
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editImageURL, setEditImageURL] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  //kinde
  const { user, isAuthenticated } = useKindeAuth();

  // Total Price
  /*  const totalPrice = useMemo(
    () =>
      products.reduce((sum: number, product) => sum + Number(product.price), 0),
    [products]
  );*/

  //search function
  const searchData = useMemo(() => {
    return products.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [products, search]);

  //Edit FunctionSS
  const handleEdit = (product: Product) => {
    setIsOpen(true);
    setEditId(product.id);
    setEditImageURL(product.imageURL);
    setEditName(product.name);
    setEditPrice(product.price.toString());
  };

  async function handleUpdate() {
    if (!editImageURL || !editName || !editPrice) {
      toast({
        title: "lagyan lahat",
        description: "basta lagyan lahat",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    try {
      setLoadingButton(true);

      const req = await fetch(`/api/post/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageURL: editImageURL,
          name: editName,
          price: Number(editPrice),
        }),
      });
      if (!req.ok) {
        throw new Error("mali napud ka dire sa update hays");
      }

      setProduct(
        products.map((e) =>
          e.id === editId
            ? {
                ...e,
                imageURL: editImageURL,
                name: editName,
                price: Number(editPrice),
              }
            : e
        )
      );
      setIsOpen(false);
      setEditId(null);
      setEditImageURL("");
      setEditName("");
      setEditPrice("");
      toast({
        title: "Product updated successfully",
        description: "Product has been updated",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      console.log("error dire dapit sa update sa frontend", error);
      throw new Error("gagi mali ka sa update");
    } finally {
      setLoadingButton(false);
    }
  }

  // Fetching data from the API
  useEffect(() => {
    if (!isAuthenticated) return;
    async function FetchingData() {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate loading delay
        const res = await fetch("/api/post/");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    FetchingData();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Text>Please login to view your products.</Text>;

  if (loading) {
    return <ProductSkeleton />;
  }

  // Delete product function
  async function handleDelete(id: string) {
    const confirm = window.confirm("sure ka?");
    if (!confirm) return;
    try {
      const res = await fetch(`/api/post/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      const deletedProduct = await res.json();
      setProduct(products.filter((e) => e.id !== deletedProduct.id));

      toast({
        title: "Product deleted successfully",
        description: "Product has been removed from the list",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("agoy mali imong sa delete function sa frontend");
    }
  }

  return (
    <Flex flexDir={"column"} justify={"center"} align={"center"}>
      <Text fontSize={"2xl"} mb={5}>
        Fetching Data from Prisma
      </Text>
      <Input
        w={"md"}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Dire ang search.."
      />
      {/*  <Text>Total Price: {totalPrice}</Text> */}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {searchData.length === 0 ? (
          <Text m={"auto"}>way data pag add sa!!!</Text>
        ) : (
          searchData.map((e) => (
            <Flex key={e.id} flexDir={"column"} align={"center"} gap={2}>
              <Image
                src={e.imageURL || "/default.jpg"}
                width={300}
                height={300}
                layout="responsive"
                alt={e.name}
              />
              <Avatar name="Sasuke Uchiha" src={user?.picture || undefined} />
              <Text> Name: {e.name}</Text>
              <Text>Price: {Number(e.price)}</Text>
              <Flex gap={2}>
                <Button colorScheme="green" onClick={() => handleEdit(e)}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(e.id)}>
                  Delete
                </Button>
              </Flex>
            </Flex>
          ))
        )}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Image</FormLabel>
              <Image
                src={editImageURL || "/default.jpg"}
                width={300}
                height={300}
                layout="responsive"
                alt={"Product Image"}
              />
              <Input
                type="text"
                placeholder="Image url"
                value={editImageURL}
                onChange={(e) => setEditImageURL(e.target.value)}
                isDisabled={loadingButton === true}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                placeholder="Description"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                isDisabled={loadingButton === true}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                min={0}
                placeholder="Description"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                isDisabled={loadingButton === true}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button
              colorScheme="green"
              onClick={handleUpdate}
              isLoading={loadingButton}
            >
              Update
            </Button>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
