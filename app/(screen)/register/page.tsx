"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdLock } from "react-icons/md";

const Page = () => {
  const [show, setShow] = useState(true);
  const formAction = async (formData: FormData) => {
    // "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const url = "/api/user";

    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }).then(() => {
      redirect("/signin");
    });
  };
  return (
    <div className="bg-gray-200 h-[100vh] flex justify-center items-center">
      <form
        action={formAction}
        className="bg-white border p-10 border-gray-500 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-mono text-[20px] font-bold">Register</h1>
          <div className="w-[30%] bg-green-300 h-[4px]"></div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-sans font-light text-[13px]">Name</span>
          <input
            className="border border-gray-400 p-2 rounded-sm outline-none focus:shadow-md focus:border-blue-950 hover:border-black text-[12px] font-medium"
            type="text"
            name="name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-sans font-light text-[12px]">Email Adress</span>
          <input
            className="border border-gray-400 p-2 rounded-sm outline-none focus:shadow-md focus:border-blue-600 hover:border-black text-[12px] font-medium"
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
            className="text-[10px] hover:underline text-blue-950"
            href="/signin"
          >
            Already have an account? Sign in
          </Link>
        </div>

        <button className="bg-blue-600 p-2 rounded-[60px] text-white font-sans text-[]14px flex justify-center items-center gap-2 outline-none">
          <div>
            <MdLock />
          </div>
          <div>Register</div>
        </button>
        <div className="flex flex-col gap-1 justify-center items-center"></div>
      </form>
    </div>
  );
};

export default Page;
