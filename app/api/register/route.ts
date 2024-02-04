import bcyrpt from "bcrypt";

import prisma from "../../libs/prismasb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("情報不足です", { status: 400 });
    }
    const hashedPassword = await bcyrpt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTER ERROR");
    return new NextResponse("エラーが発生しました", { status: 500 });
  }
}
