# Noir-Store (Next.js 14 + Prisma + Tailwind)

## Scalable folder structure

```txt
.
├── app
│   ├── admin/products/new/page.tsx
│   ├── api/admin/products/route.ts
│   ├── api/products/[id]/route.ts
│   ├── products/[id]/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
├── lib
│   ├── prisma.ts
│   └── utils.ts
├── prisma
│   └── schema.prisma
├── public
│   └── index.html
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Notes
- Authentication stack can be wired with **Clerk** or **NextAuth**. The Prisma schema includes NextAuth-compatible tables.
- Product `redirectUrl` directly powers the PDP Buy Now action.
- Use Cloudflare R2 or Cloudinary URLs in `imageUrls`.
