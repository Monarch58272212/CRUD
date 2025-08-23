import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Image from "next/image";
import prisma from "../lib/prisma";

export default async function Page() {
  const data = await prisma.product.findMany();

  return (
    <Flex>
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

              <Text> Name: {e.name}</Text>
              <Text>Price: {Number(e.price)}</Text>
            </Flex>
          ))
        )}
      </SimpleGrid>
    </Flex>
  );
}
