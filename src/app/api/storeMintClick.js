import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const createTableMintClick = async () => {
  const result = await sql`CREATE TABLE MintClick (
    ETHAddress varchar(255),
    Cover1 varchar(255),
    Cover2 varchar(255)
  );
`;
};

export async function storeMintClick(req) {
  const { ETHAddress, cover1, cover2 } = req;

  try {
    const result =
      await sql`INSERT INTO MintClick (Ethaddress, Cover1, Cover2) VALUES
        (${ETHAddress}, ${cover1}, ${cover2});`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
