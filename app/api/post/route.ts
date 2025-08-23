import prisma from "@/app/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    const data = await request.json();
    if (!data.imageURL || !data.name || !data.price) {
      return NextResponse.json(
        { success: false, message: "lagyan lahat oii" },
        { status: 400 }
      );
    }

    const created = await prisma.product.create({
      data: {
        imageURL: data.imageURL,
        name: data.name,
        price: Number(data.price),
        createdBy: user.id,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    NextResponse.json({ message: `${error}, "how sad"` }, { status: 500 });
  }
}

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized user" },
      { status: 401 }
    );
  }
  try {
    const data = await prisma.product.findMany({
      where: {
        createdBy: user.id,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `${error}, "how sad"` },
      { status: 500 }
    );
  }
}
