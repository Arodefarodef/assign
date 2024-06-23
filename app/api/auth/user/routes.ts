import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import myUserModel from "@/app/utils/model/userModel";
import { dbconfig } from "@/app/utils/dbconfig";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbconfig();
    const { name, email, password } = await req.json();
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);
    const getD = await myUserModel.create({ name, email, password: hashed });
    return NextResponse.json({
      message: "User Created",
      status: 200,
      data: getD,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Occured!",
      status: 400,
    });
  }
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbconfig();
    const getD = await myUserModel.find();
    return NextResponse.json({
      message: "User found",
      status: 200,
      data: getD,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error Occured!",
      status: 400,
    });
  }
};
