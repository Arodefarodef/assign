import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import myUserModel from "@/app/utils/model/userModel";
import { dbconfig } from "@/app/utils/dbconfig";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbconfig();
    const { email, password } = await req.json();
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    const hashed = await bcryptjs.compare(password, hash);
    const emailExist = await myUserModel.findOne({ email });
    if (emailExist) {
      if (hashed) {
        return NextResponse.json({
          message: "Logged in succefully",
          status: 200,
          data: emailExist,
        });
      } else {
        return NextResponse.json({
          message: "Error Reading Password",
          status: 400,
        });
      }
    } else {
      return NextResponse.json({
        message: "Error getting user",
        status: 400,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error Occured!",
      status: 400,
    });
  }
};
