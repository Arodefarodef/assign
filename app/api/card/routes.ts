import { dbConfig } from "@/app/utils/dbConfig";
import myCardModel from "@/app/utils/model/cardModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConfig();
    const { title, description, image } = await req.json();
    const getD = await myCardModel.create({ title, description, image });
    return NextResponse.json({
      message: "Created",
      status: 200,
      data: getD,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Occured",
      status: 400,
    });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const getD = await myCardModel.find();
    return NextResponse.json({
      message: "Product Found!",
      status: 200,
      data: getD,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Occured",
      status: 400,
    });
  }
};
