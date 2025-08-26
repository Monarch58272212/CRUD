import prisma from "@/app/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized user" },
      { status: 401 }
    );
  }
  try {
    const data = await req.json();
    if (!data.name || !data.imageURL || data.price === undefined) {
      return NextResponse.json(
        { message: "butangi tanan", success: false },
        { status: 400 }
      );
    }

    // ✅ Make sure user exists in DB
    await prisma.user.upsert({
      where: { id: user.id },
      update: {}, // walang babaguhin kung existing na
      create: {
        id: user.id,
        email: user.email || "",
        name: user.given_name || user.family_name || "Unknown",
        picture: user.picture,
      },
    });

    const created = await prisma.product.create({
      data: {
        name: data.name,
        imageURL: data.imageURL,
        price: Number(data.price),
        createdBy: user.id,
      },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.log("agoy mali jud imong backend na create:", error);
    return NextResponse.json(
      {
        message:
          "something went wrong sa backend create nimo oii paki check gud!!",
        success: false,
      },
      { status: 500 }
    );
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
    const getData = await prisma.product.findMany({
      where: { createdBy: user.id },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(getData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Something went wrong fetching products." },
      { status: 500 }
    );
  }
}
