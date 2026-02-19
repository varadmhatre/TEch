import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type ProductPageProps = {
  params: { id: string };
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: params.id }, { slug: params.id }],
      isPublished: true
    },
    include: {
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 5
      }
    }
  });

  if (!product) notFound();

  return (
    <article className="grid gap-6 md:grid-cols-2">
      <section className="noir-panel p-4">
        <div className="relative aspect-square overflow-hidden border border-hairline border-border">
          <Image
            src={product.imageUrls[0] ?? "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="noir-panel p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{product.category}</p>
        <h1 className="mt-2 text-3xl font-medium">{product.title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
        <p className="mt-6 text-2xl">${product.price.toString()}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={product.redirectUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="border border-hairline border-foreground px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background"
          >
            Buy Now
          </Link>
          <button className="border border-hairline border-border px-5 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-foreground">
            Add to Wishlist
          </button>
        </div>

        <div className="mt-8 border-t border-hairline border-border pt-6">
          <h2 className="text-sm uppercase tracking-[0.2em]">Latest Reviews</h2>
          <ul className="mt-3 space-y-3">
            {product.reviews.length === 0 ? (
              <li className="text-sm text-muted">No reviews yet.</li>
            ) : (
              product.reviews.map((review) => (
                <li key={review.id} className="border border-hairline border-border p-3">
                  <p className="text-xs text-muted">{review.user.name ?? "Verified Buyer"}</p>
                  <p className="mt-1 text-sm">{review.title}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </article>
  );
}
