"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdLock } from "react-icons/md";

const Page = () => {
  const [show, setShow] = useState(true);
  const formAction = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(email, password);

    signIn("credentials", { email, password });
  };

  return (
    <div className="bg-gray-200 h-[100vh] flex justify-center items-center">
      <form
        action={formAction}
        className="bg-white border p-10 border-gray-500 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-mono text-[20px] font-bold">Login Form</h1>
          <div className="w-[30%] bg-green-300 h-[4px]"></div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-sans font-light text-[12px]">Email</span>
          <input
            className="border border-gray-400 p-2 rounded-sm outline-none  hover:border-black text-[12px] font-medium"
            type="text"
            name="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sans font-light text-[12px]">Password</span>
          <div className="flex justify-between items-center border border-gray-400  p-2 rounded-sm outline-non hover:border-black text-[12px] font-medium">
            <input
              className=" outline-none"
              type={show ? "password" : "text"}
              name="password"
            />
            <div
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
          </div>

          <Link
            className="text-[10px] hover:underline text-blue-600"
            href="/register"
          >
            Don't have an account? Register here
          </Link>
        </div>

        <button className="bg-blue-600 p-2 rounded-[60px] text-white font-sans text-[]14px flex justify-center items-center gap-2 outline-none">
          <div>
            <MdLock />
          </div>
          <div>Sign In</div>
        </button>
        <div className="flex flex-col gap-1 justify-center items-center"></div>
      </form>
    </div>
  );
};

export default Page;
