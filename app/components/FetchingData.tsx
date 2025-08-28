"use client";
import {
  Avatar,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useToast,
  Button,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ProductSkeleton from "./Skeleton";
import { Product } from "../Types/types";

export default function FetchingData() {
  const [products, setProducts] = useState<Product[]>([]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editImageURL, setEditimageURL] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [search, setSearch] = useState("");
  const color = useColorModeValue("white", "gray.800");

  const handleSearch = useMemo(() => {
    return products.filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [products, search]);

  const handleModal = (product: Product) => {
    setIsOpen(true);
    setEditimageURL(product.imageURL);
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
  };

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
    <Flex flexDir="column" align="center" px={4} py={6} gap={6}>
      {/* Search Bar */}
      <Flex align="center" w="100%" maxW="600px">
        <Input
          placeholder="Search products..."
          borderRadius="full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          px={4}
          py={2}
          borderWidth={1}
        />
      </Flex>
      <Box
        width="95%"
        sx={{
          columnCount: [1, 2, 3, 4],
        }}
        gap={5}
      >
        {handleSearch.length === 0 ? (
          <Text>{`way data ${search}`}</Text>
        ) : (
          handleSearch.map((e) => (
            <Box
              key={e.id}
              sx={{ breakInside: "avoid", mb: 4 }}
              bg={color}
              p={2}
              gap={2}
              borderRadius={"md"}
              display={"flex"}
              flexDir={"column"}
              borderWidth={1}
              boxShadow={"sm"}
            >
              <Image
                onClick={() => handleModal(e)}
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
          ))
        )}

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDir={"column"}>
              <Image
                src={editImageURL || "/default.jpg"}
                width={500}
                height={500}
                alt={editName}
                style={{
                  objectFit: "cover",
                  borderRadius: "8px",
                  width: "100%",
                  height: "auto",
                }}
              />
              <Flex gap={2} align="center" mt={2}>
                <Avatar
                  size="sm"
                  src={
                    products.find((p) => p.id === editId)?.user?.picture ||
                    undefined
                  }
                />
                <Text fontSize="sm" color="gray.400">
                  {products.find((p) => p.id === editId)?.user?.name ||
                    "Unknown"}
                </Text>
              </Flex>
              <Flex
                color="gray.400"
                gap={2}
                flexDir={"column"}
                align={"flex-start"}
              >
                <Text>Name: {editName}</Text>
                <Text>Price: {editPrice}</Text>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}
