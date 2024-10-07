import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title } = await req.json();
  console.log(title);

  const todo = await prisma.todos.create({
    data: { title },
  });

  return NextResponse.json(todo);
}

export async function GET() {
  const todos = await prisma.todos.findMany();
  return NextResponse.json(todos);
}
