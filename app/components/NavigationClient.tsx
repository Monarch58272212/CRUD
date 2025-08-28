"use client";

import {
  Avatar,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import Menu from "./Menu";
import { Links } from "../Types/types";

interface NavigationClientProps {
  links: Links[];
  user: KindeUser<Record<string, undefined>> | null;
}

export default function NavigationClient({
  user,
  links,
}: NavigationClientProps) {
  const pathname = usePathname();
  const linkColor = useColorModeValue("teal.500", "teal.300");

  return (
    <Flex
      m="auto"
      w={["90%", "80%", "70%"]}
      gap={5}
      justify="center"
      align="center"
      borderWidth={1}
      p={5}
      borderRadius="full"
      mb={10}
    >
      {links?.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link key={link.name} href={link.href}>
            <Button
              display={["none", "none", "block"]}
              fontWeight={isActive ? "bold" : "normal"}
              color={isActive ? linkColor : "inherit"}
              borderBottom={isActive ? "2px solid" : "none"}
              borderColor={isActive ? linkColor : "transparent"}
              _hover={{
                transform: "scale(1.1)",
                transition: "all 0.2s",
                color: linkColor,
              }}
            >
              {link.name}
            </Button>
          </Link>
        );
      })}

      {user ? (
        <Flex justify="center" align="center" gap={2}>
          <Avatar src={user.picture || ""} size="sm" />
          <Text fontSize="sm">{user.given_name}!</Text>
          <LogoutLink>
            <Button colorScheme="green" display={["none", "none", "block"]}>
              Logout
            </Button>
          </LogoutLink>
        </Flex>
      ) : (
        <Flex gap={2}>
          <LoginLink>
            <Button colorScheme="green">Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant="ghost">Sign up</Button>
          </RegisterLink>
        </Flex>
      )}
      <Menu />
    </Flex>
  );
}
