import Link from "next/link";

export default function HomePage() {
  return (
    <section className="noir-panel p-10">
      <h1 className="text-3xl font-medium">Noir-Store</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Amazon-style e-commerce with a pure black and white design system and affiliate-based Buy Now flow.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/admin/products/new" className="border border-hairline border-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background">
          Admin: Register Product
        </Link>
        <Link href="/products/demo-product" className="border border-hairline border-border px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-foreground">
          View Demo PDP
        </Link>
      </div>
    </section>
  );
}
