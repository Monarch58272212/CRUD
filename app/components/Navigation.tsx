"use server";

import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navigation() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <Flex
      m={"auto"}
      w={"70%"}
      gap={5}
      justify={"center"}
      align={"center"}
      borderWidth={1}
      p={5}
      borderRadius={"full"}
      mb={10}
    >
      <Link href={"/"}>
        <Button>Home</Button>
      </Link>
      <Link href={"/Create"}>
        <Button>Create</Button>
      </Link>
      <Link href={"/FetchAll"}>
        <Button>All Post</Button>
      </Link>

      {user ? (
        <Flex justify={"center"} align={"center"} gap={2}>
          {" "}
          <Avatar src={user.picture || ""} />
          <Text>{user.given_name}!</Text>{" "}
          <LogoutLink>
            <Button colorScheme="green">Logout</Button>
          </LogoutLink>
        </Flex>
      ) : (
        <Flex gap={2}>
          <LoginLink>
            <Button colorScheme="green">Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant={"ghost"}>Sign up</Button>
          </RegisterLink>
        </Flex>
      )}
    </Flex>
  );
}
