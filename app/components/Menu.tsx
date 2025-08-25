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
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

export default function Menu() {
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
            <Link href={"/"}>
              <Button>Home</Button>
            </Link>
            <Link href={"/Create"}>
              <Button>Create</Button>
            </Link>
            <Link href={"/FetchAll"}>
              <Button>All Post</Button>
            </Link>
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
