import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.string(),
  imageUrls: z.string().min(1),
  category: z.string().min(2),
  redirectUrl: z.string().url()
});

export async function POST(request: Request) {
  try {
    const payload = createProductSchema.parse(await request.json());
    const slug = payload.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const product = await prisma.product.create({
      data: {
        title: payload.title,
        slug,
        description: payload.description,
        price: Number(payload.price),
        imageUrls: payload.imageUrls
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
        category: payload.category,
        redirectUrl: payload.redirectUrl,
        stock: 100,
        isPublished: true
      }
    });

    return NextResponse.json({ id: product.id, slug: product.slug }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to create product" }, { status: 500 });
  }
}
