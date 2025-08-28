// components/ProductSkeleton.tsx
"use client";
import {
  Box,
  Skeleton,
  SkeletonText,
  VStack,
  SkeletonCircle,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ProductSkeleton() {
  const color = useColorModeValue("white", "gray.500");
  return (
    <Box
      w={"100%"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="5"
      boxShadow="md"
      bg={color}
    >
      <Skeleton height="200px" borderRadius="md" />

      <VStack align="start" spacing="3" mt="4">
        <SkeletonText noOfLines={1} skeletonHeight="4" w="70%" />
        <SkeletonText noOfLines={1} skeletonHeight="4" w="50%" />
        <SkeletonCircle size="5" />
      </VStack>
    </Box>
  );
}
