import { NextResponse } from "next/server";
import { getProdutos } from "@/lib/getProducts";

export const dynamic = "force-dynamic";

export async function GET() {
  const produtos = await getProdutos();
  return NextResponse.json(produtos);
}
