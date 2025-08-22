import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(req: NextRequest) {
    console.log("Secured route:", req.nextUrl.pathname);
  },
  {
    publicPaths: ["/", "/about"],
  }
);

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|css|js)).*)"],
};
