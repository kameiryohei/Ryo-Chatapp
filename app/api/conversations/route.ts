import getCurrentUser from "@/app/acitons/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismasb";

export async function POST(request: Response) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("ログインしていません", { status: 401 });
    }
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("グループのメンバーがいません", { status: 400 });
    }
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              { id: currentUser.id },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newConversation);
    }
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: currentUser.id }, { id: userId }],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("内部的エラーです", { status: 500 });
  }
}
