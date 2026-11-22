import { NextResponse } from "next/server";
import { getProdutos } from "@/lib/getProducts";

export const revalidate = 30;

export async function GET() {
  const produtos = await getProdutos();
  return NextResponse.json(produtos, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
    },
  });
}
