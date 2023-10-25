import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function CreateTable(request) {
  try {
    const result = await sql`CREATE TABLE ShippingInfo (
        ETHAddress varchar(255),
        fullName varchar(255),
        email varchar(255),
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        postal VARCHAR(20) NOT NULL,
        country VARCHAR(255) NOT NULL
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function handler(req) {
  const { ETHAddress, fullName, email, address, city, postal, country } = req;
  // console.log(req);
  try {
    const result =
      await sql`INSERT INTO ShippingInfo (Ethaddress, Fullname, Email, Address, City, Postal, Country) VALUES
        (${ETHAddress}, ${fullName}, ${email}, ${address}, ${city}, ${postal}, ${country});`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
