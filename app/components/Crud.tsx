"use client";

import {
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
import Image from "next/image";
import { useMemo, useState } from "react";
import { Post } from "../Types/types";

interface Posts {
  title: string;
  productList: Post[];
}

export default function Crud({ productList, title }: Posts) {
  const [posts, setPost] = useState<Post[]>(productList);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortz, setSort] = useState(false);
  //edit here
  const [editId, setEditId] = useState<number | null>(null);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //Search
  const handleSearch = useMemo(() => {
    return posts
      .filter((e) =>
        e.description.toLowerCase().includes(search.trim().toLowerCase())
      )
      .sort((a, b) =>
        sortz
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description)
      );
  }, [posts, search, sortz]);

  //Add Product
  const handleAdd = async () => {
    if (!imageUrl || !description) {
      toast({
        title: "butangi tanan",
        description: "butangi lagi tanan",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      await new Promise((e) => setTimeout(e, 2000));
      const newPost: Post = {
        id: Date.now(),
        imageUrl: imageUrl.trim(),
        description: description.trim(),
        complete: false,
      };

      setPost([...posts, newPost]);
      setDescription("");
      setImageUrl("");
      toast({
        title: "yeheyyy",
        description: "wow",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      console.log("mali oi imong create", error);
    } finally {
      setLoading(false);
    }
  };

  //Delete Product
  const handleDelete = (id: number) => {
    const confirm = window.confirm("sure jud ka???");
    if (!confirm) return;

    const deleted = posts.filter((e) => e.id !== id);
    setPost(deleted);
    toast({
      title: "yeheyyy ok na delete nimo",
      description: "wow goods na imong delete",
      status: "success",
      isClosable: true,
      duration: 3000,
    });
  };

  //Edit Product
  const handleEdit = (post: Post) => {
    setEditId(post.id);
    setEditImageUrl(post.imageUrl);
    setEditDescription(post.description);
    setIsOpen(true);
  };

  //Update Product
  const handleUpdate = async () => {
    try {
      if (!editDescription || !editImageUrl) {
        toast({
          title: "butangi tanan sa edit oii",
          description: "butangi lagi tanan dire sa edit",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
        return;
      }
      setLoading(true);
      await new Promise((e) => setTimeout(e, 3000));
      const updated = posts.map((e) =>
        e.id === editId
          ? { ...e, imageUrl: editImageUrl, description: editDescription }
          : e
      );
      setPost(updated);
      setEditDescription("");
      setEditImageUrl("");
      setIsOpen(false);
      toast({
        title: "yeheyyy ok na update nimo",
        description: "wow goods na imong update",
        status: "success",
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      console.log("agoy mali ka sa update nimo", error);
    } finally {
      setLoading(false);
    }
  };

  //Complete
  const handleComplete = (id: number) => {
    const completed = posts.map((e) =>
      e.id === id ? { ...e, complete: !e.complete } : e
    );
    setPost(completed);
  };

  const completeProduct = posts.filter((e) => e.complete).length;
  const notCompleteProduct = posts.filter((e) => !e.complete).length;
  const count = posts.length;

  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      w={"70%"}
      borderWidth={1}
      p={5}
      gap={10}
    >
      <Text>
        Complete: {completeProduct} / Not Complete: {notCompleteProduct} / Count
        Product: {count}
      </Text>
      <Flex justify={"center"} gap={3} align={"center"}>
        <Text>{title}</Text>
        <FormControl>
          <Input
            type="text"
            placeholder="Search dire"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
        <Button onClick={() => setSort(!sortz)}>
          {sortz ? "A - Z" : "Z - A"}
        </Button>
      </Flex>
      <Flex
        flexDir={"column"}
        justify={"center"}
        w={"70%"}
        align={"center"}
        gap={2}
      >
        <FormControl>
          <FormLabel>Image</FormLabel>
          <Input
            type="text"
            placeholder="Image url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="teal"
          isLoading={loading}
          onClick={handleAdd}
          isDisabled={loading}
          width="full"
        >
          Submit
        </Button>
      </Flex>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={3}>
        {handleSearch.length === 0 ? (
          <Text>Way sulod pag add sa oi</Text>
        ) : (
          handleSearch.map((e) => (
            <Flex key={e.id} flexDir={"column"}>
              <Image
                alt="basta"
                width={300}
                height={300}
                layout="responsive"
                src={e.imageUrl}
              />
              <Text
                onClick={() => handleComplete(e.id)}
                color={e.complete ? "gray.600" : ""}
                textDecor={e.complete ? "line-through" : ""}
              >
                Description: {e.description}
              </Text>
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
              <Input
                type="text"
                placeholder="Image url"
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button
              colorScheme="green"
              isLoading={loading}
              onClick={handleUpdate}
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
