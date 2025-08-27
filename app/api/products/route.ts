import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
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
