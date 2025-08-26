"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";

interface Product {
  id: number;
  name: string;
  price: number;
}
const allProducts = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mouse", price: 500 },
  { id: 3, name: "Keyboard", price: 1500 },
  { id: 4, name: "Monitor", price: 7000 },
  { id: 5, name: "Headset", price: 2500 },
];

export default function ProductChallenge() {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceFilter, setPriceFilter] = useState("all");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = async () => {
    try {
      if (!name.trim() || !price.trim()) {
        toast({
          title: "Error",
          description: "Name and price are required.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newProduct: Product = {
        id: Date.now(),
        name: name.trim(),
        price: parseFloat(price),
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Success",
        description: "Product added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filtered = products
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase().trim()))
    .filter((e) => {
      if (priceFilter === "all") return true;
      else if (priceFilter === "below1k") return e.price < 1000;
      else if (priceFilter === "1kto5k")
        return e.price >= 1000 && e.price <= 5000;
      else if (priceFilter === "above5k") return e.price > 5000;
    })
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const countAll = products.reduce((acc, count) => acc + count.price, 0);
  // 👉 TODO: Filter and sort the products based on search, priceFilter, and sortOrder

  return (
    <Box p={6}>
      <Flex gap={3} p={6}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          w="200px"
        />
        <Input
          placeholder="Search product..."
          value={price}
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          w="200px"
        />
        <Button onClick={handleAddProduct} isLoading={isLoading}>
          Add Product
        </Button>
      </Flex>
      <Flex>
        <Text>{countAll}</Text>
      </Flex>
      <Flex gap={4} mb={6} flexWrap="wrap">
        {/* Search Input */}
        <Input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          w="200px"
        />

        {/* Price Filter */}
        <Select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          w="160px"
        >
          <option value="all">All Prices</option>
          <option value="below1k">Below ₱1,000</option>
          <option value="1kto5k">₱1,000 - ₱5,000</option>
          <option value="above5k">Above ₱5,000</option>
        </Select>

        {/* Sort Buttons */}
        <Button onClick={() => setSortOrder("asc")} colorScheme="teal">
          Sort Low to High
        </Button>
        <Button onClick={() => setSortOrder("desc")} colorScheme="teal">
          Sort High to Low
        </Button>
      </Flex>

      {/* Display Filtered Products */}
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {filtered.length === 0 ? (
          <Text>noooo</Text>
        ) : (
          filtered.map((product) => (
            <Box
              key={product.id}
              p={4}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
            >
              <Text fontWeight="bold">{product.name}</Text>
              <Text color="gray.500">₱{product.price.toLocaleString()}</Text>
            </Box>
          ))
        )}
      </SimpleGrid>
    </Box>
  );
}
