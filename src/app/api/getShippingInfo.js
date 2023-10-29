import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function getShippingInfo(address) {
  try {
    const result =
      await sql`SELECT * FROM ShippingInfo WHERE Ethaddress = ${address}`;
    return result;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
