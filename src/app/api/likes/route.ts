import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AnswerValidator } from "@/lib/validators/answer";
import { z } from "zod";
import type { Questions, Likes } from "@prisma/client";
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { userId, questionId } = body;

    const updateQuestion = await db.likes.create({
      data: {
        questionId: questionId,
        userId: userId,
      },
    });

    return new Response(updateQuestion.questionId);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }

    return new Response("couldnt send the questions", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { userId, questionId } = body;

  try {
    const likee = await db.likes.delete({
      where: {
        questionId_userId: {
          questionId: questionId,
          userId: userId,
        },
      },
    });
    return new Response(likee.questionId);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response(err.message, { status: 422 });
    }

    return new Response("couldnt send the questions", { status: 500 });
  }
}
