import { Avatar, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import prisma from "../lib/prisma";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Product } from "@prisma/client";

export default async function Page() {
  const data: Product[] = await prisma.product.findMany();

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <Flex flexDir={"column"} w={"100%"} justify={"center"} align={"center"}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {data.map((e: Product) => (
          <Flex key={e.id} flexDir={"column"} align={"center"} gap={2}>
            <Image
              src={e.imageURL || "/default.jpg"}
              width={300}
              height={300}
              layout="responsive"
              alt={e.name}
            />
            {user?.id === e.createdBy ? (
              <Avatar src={user?.picture || undefined} />
            ) : (
              <Avatar src="/logo.png" />
            )}
            <Text> Name: {e.name}</Text>
            <Text>Price: {Number(e.price)}</Text>
            <Flex gap={2}>
              <Button colorScheme="green">Edit</Button>
              <Button colorScheme="red">Delete</Button>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
}
