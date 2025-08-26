// app/components/Navigation.tsx
"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NavigationClient from "./NavigationClient";

export default async function Navigation() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <NavigationClient user={user} />;
}
