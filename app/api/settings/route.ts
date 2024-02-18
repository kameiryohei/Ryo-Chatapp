import getCurrentUser from "@/app/acitons/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismasb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { name, image } = body;
    if (!currentUser?.id) {
      return new NextResponse("認証エラーです", { status: 401 });
    }
    const updateUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        name: name,
      },
    });
    return NextResponse.json(updateUser);
  } catch (error: any) {
    return new NextResponse("内部的なエラーです", { status: 500 });
  }
}
