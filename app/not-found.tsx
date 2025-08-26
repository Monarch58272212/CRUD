// app/not-found.tsx
"use client";

import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        <Heading size="2xl" color="red.500">
          404
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Oops! The page you are looking for does not exist.
        </Text>
        <Link href="/" passHref>
          <Button colorScheme="teal" size="lg">
            Go Back Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}
