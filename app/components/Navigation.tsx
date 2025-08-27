// app/components/Navigation.tsx

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NavigationClient from "./NavigationClient";

export default async function Navigation() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const links = [
    { name: "Home", href: "/" },
    { name: "Create", href: "/Create" },
    { name: "All Post", href: "/YourPost" },
  ];

  return <NavigationClient user={user} links={links} />;
}
