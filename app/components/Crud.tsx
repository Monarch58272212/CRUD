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

interface Post {
  id: number;
  imageUrl: string;
  description: string;
  complete: boolean;
}

export default function Crud() {
  const [posts, setPost] = useState<Post[]>([]);
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

  //handle Add

  const handleAdd = async () => {
    if (!imageUrl || !description) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      const newPost: Post = {
        id: Date.now(),
        imageUrl,
        description,
        complete: false,
      };
      setPost([...posts, newPost]);
      setImageUrl("");
      setDescription("");
      toast({
        title: "Success",
        description: "Post added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding post:", error);
      toast({
        title: "Error",
        description: "Failed to add post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPost(updatedPosts);
      toast({
        title: "Success",
        description: "Post deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: Post) => {
    setEditId(post.id);
    setEditImageUrl(post.imageUrl);
    setEditDescription(post.description);
    setIsOpen(true);
  };
  const handleUpdate = async () => {
    if (!editImageUrl || !editDescription) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedPost = posts.map((e) =>
        e.id === editId
          ? { ...e, imageUrl: editImageUrl, description: editDescription }
          : e
      );
      setPost(updatedPost);
      setEditId(null);
      setEditImageUrl("");
      setEditDescription("");
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Post updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Failed to update post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const countAll = useMemo(() => posts.length, [posts]);
  const countNotComplete = posts.filter((e) => !e.complete).length;
  const countComplete = posts.filter((e) => e.complete).length;

  const handleSearch = useMemo(() => {
    return posts
      .filter((e) =>
        e.description.toLowerCase().includes(search.toLowerCase().trim())
      )
      .sort((a, b) =>
        sortz
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description)
      );
  }, [posts, search, sortz]);

  const isComplete = (id: number) => {
    const completed = posts.map((e) =>
      e.id === id ? { ...e, complete: !e.complete } : e
    );
    setPost(completed);
  };

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
      <Flex w={"70%"}>
        <FormControl flex={1} mr={2}>
          <FormLabel>Dire pag Search oiidwdw</FormLabel>
          <Input
            type="text"
            placeholder="Search diria lagi pagnaa kay panitaon hayss"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => setSort(!sortz)} mt={2}>
            {sortz ? "A-Z" : "Z-A"}
          </Button>
        </FormControl>
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

      <Text>
        Count Item: {countAll} / Not Complete: {countNotComplete} / Complete:{" "}
        {countComplete}
      </Text>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {handleSearch.length === 0 ? (
          <Text m={"auto"}>Nooooooo!!!!!!</Text>
        ) : (
          handleSearch.map((e) => (
            <Flex
              key={e.id}
              flexDir={"column"}
              justify={"center"}
              align={"center"}
            >
              <Image
                src={e.imageUrl}
                width={300}
                height={300}
                alt="ambot oii"
                style={{ objectFit: "cover", width: "300px", height: "300px" }}
              />
              <Text
                onClick={() => isComplete(e.id)}
                color={e.complete ? "green.500" : ""}
                textDecor={e.complete ? "line-through" : "none"}
              >
                DESCRIPTION: {e.description}
              </Text>
              <Flex gap={2} mt={2}>
                <Button colorScheme="green" onClick={() => handleEdit(e)}>
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDelete(e.id)}
                  isDisabled={loading}
                  isLoading={loading}
                >
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
          <ModalHeader m={"auto"}>Update</ModalHeader>
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

          <ModalFooter gap={2}>
            <Button
              colorScheme="green"
              onClick={handleUpdate}
              isLoading={loading}
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
