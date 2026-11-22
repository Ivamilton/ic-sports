import { NextResponse } from "next/server";
import { getProdutos } from "@/lib/getProducts";

export const revalidate = 300;

export async function GET() {
  const produtos = await getProdutos();
  return NextResponse.json(produtos, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
    },
  });
}
