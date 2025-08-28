import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("q") || "";

  try {
    const data = await prisma.product.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error, "mali imong api product hays");
    return NextResponse.json(
      { message: "agoy mali sa api product", success: false },
      { status: 400 }
    );
  }
}
