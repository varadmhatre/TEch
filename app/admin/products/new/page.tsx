"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CreateProductPayload = {
  title: string;
  description: string;
  price: string;
  imageUrls: string;
  category: string;
  redirectUrl: string;
};

const defaultValues: CreateProductPayload = {
  title: "",
  description: "",
  price: "",
  imageUrls: "",
  category: "",
  redirectUrl: ""
};

export default function AdminNewProductPage() {
  const router = useRouter();
  const [values, setValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Failed to create product.");
      setLoading(false);
      return;
    }

    setMessage("Product published. Redirecting to PDP...");
    router.push(`/products/${data.slug}`);
  }

  return (
    <section className="noir-panel mx-auto max-w-3xl p-6 md:p-8">
      <h1 className="text-xl uppercase tracking-[0.2em]">Register New Product</h1>
      <p className="mt-2 text-sm text-muted">This admin form powers the PDP Buy Now CTA redirect URL.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {[
          { key: "title", label: "Product Title", type: "text" },
          { key: "description", label: "Description", type: "text" },
          { key: "price", label: "Price (USD)", type: "number" },
          { key: "imageUrls", label: "Image URLs (comma separated)", type: "text" },
          { key: "category", label: "Category", type: "text" },
          { key: "redirectUrl", label: "Amazon Affiliate Redirect URL", type: "url" }
        ].map((field) => (
          <div key={field.key}>
            <label htmlFor={field.key} className="noir-label">
              {field.label}
            </label>
            <input
              id={field.key}
              type={field.type}
              className="noir-input mt-2"
              required
              value={values[field.key as keyof CreateProductPayload]}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, [field.key]: event.target.value }))
              }
            />
          </div>
        ))}

        <button
          disabled={loading}
          className="border border-hairline border-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
        >
          {loading ? "Publishing..." : "Publish Product"}
        </button>

        {message ? <p className="text-xs text-muted">{message}</p> : null}
      </form>
    </section>
  );
}
