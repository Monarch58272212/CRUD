import { Flex } from "@chakra-ui/react";
import FetchingData from "./components/FetchingData";

export default function Home() {
  return (
    <Flex flexDir={"column"} w={"100%"} justify={"center"} align={"center"}>
      <FetchingData />
    </Flex>
  );
}
