import { NextResponse } from "next/server";
import PinataClient from "@pinata/sdk";
import stream from "stream";

const pinata = new PinataClient({ pinataJWTKey: process.env.PINATA_JWT! });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const mbti = formData.get("mbti") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!mbti || !name || !description || !file) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // --- Convert File -> Buffer -> Stream ---
    const buffer = Buffer.from(await file.arrayBuffer());
    const readableStream = new stream.PassThrough();
    readableStream.end(buffer);

    // --- Upload Image to IPFS ---
    const fileResult = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: { name: `${mbti}-image` },
    });

    const imageUri = `ipfs://${fileResult.IpfsHash}`;

    // --- Upload Metadata JSON ---
    const metadata = {
      name,
      description,
      image: imageUri,
      attributes: [{ trait_type: "MBTI", value: mbti }],
    };

    const jsonResult = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: { name: `${mbti}-metadata` },
    });

    const metadataUri = `ipfs://${jsonResult.IpfsHash}`;
    return NextResponse.json({ uri: metadataUri });
  } catch (error) {
    console.error("Pinata upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
