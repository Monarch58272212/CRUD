"use server";

import { Avatar, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import prisma from "../lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function FetchingData() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
      p={4}
      w={"100%"}
    >
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {data.length === 0 ? (
          <Text m={"auto"}>way data pag add sa!!!</Text>
        ) : (
          data.map((e) => (
            <Flex key={e.id} flexDir={"column"} align={"center"} gap={2}>
              <Image
                src={e.imageURL || "/default.jpg"}
                width={300}
                height={300}
                layout="responsive"
                alt={e.name}
              />
              <Avatar src={user?.picture || ""} size={"xs"} />

              <Text> Name: {e.name}</Text>
              <Text>Price: {Number(e.price)}</Text>
            </Flex>
          ))
        )}
      </SimpleGrid>
    </Flex>
  );
}
