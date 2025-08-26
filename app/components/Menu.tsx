"use client";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";

export default function Menu() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Create", href: "/Create" },
    { name: "All Post", href: "/FetchAll" },
  ];

  const pathname = usePathname();
  const linkColor = useColorModeValue("teal.500", "teal.300");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <Flex display={["flex", "flex", "none"]} alignItems={"center"}>
      <Button ref={btnRef} variant="ghost" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody display={"flex"} flexDir={"column"} gap={3} w={"90%"}>
            {links.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link href={link.href} key={index}>
                  {" "}
                  <Button
                    color={isActive ? linkColor : "inherit"}
                    borderBottom={isActive ? "1px solid" : "none"}
                    borderColor={isActive ? linkColor : "transparent"}
                    _hover={{
                      transform: "scale(1.1)",
                      transition: "all 0.3s",
                      color: linkColor,
                      borderBottom: "1px solid",
                    }}
                  >
                    {link.name}
                  </Button>
                </Link>
              );
            })}
          </DrawerBody>

          <DrawerFooter display={"flex"} justifyContent={"space-between"}>
            <LogoutLink>
              <Button colorScheme="green">Logout</Button>
            </LogoutLink>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
