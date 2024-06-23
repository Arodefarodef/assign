import cloudinary from "@/app/utils/cloudinary";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { MdCancel, MdImage, MdPhoto } from "react-icons/md";

const page = () => {
  const formAction = async (formData: FormData) => {
    "use server";
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image") as File;

    const file = await image.arrayBuffer();
    const buff = new Uint8Array(file);
    const { secure_url }: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            reject(err);
            return;
          } else {
            return resolve(result);
          }
        })
        .end(buff);
    });

    const url = "https://monday-asssignment.vercel.app/api/card";

    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title, description, image: secure_url }),
    }).then(() => {
      console.log("Done");
      redirect("/");
    });
  };

  return (
    <form
      action={formAction}
      className="flex justify-center items-center h-[100vh] w-full "
    >
      <div className="flex flex-col gap-4 border border-gray-300 p-5">
        <Link href="/" className="flex justify-end">
          <MdCancel className="text-black text-[16px]" />
        </Link>

        <div className="flex flex-col gap-2">
          <span className="font-sans font-light text-[12px]">Title</span>
          <input
            className="border border-gray-400 p-2 rounded-sm outline-none  hover:border-black text-[12px] font-medium"
            type="text"
            name="title"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-sans font-light text-[12px]">Description</span>

          <div className="flex items-center justify-center border border-gray-400 rounded-sm outline-none  hover:border-black">
            <input
              className="outline-none text-[12px] font-medium"
              type="text"
              name="description"
            />

            <div className="flex flex-col  p-2 cursor-pointer">
              <label
                htmlFor="id"
                className="cursor-pointer font-semibold text-[20px]"
              >
                <MdPhoto />
              </label>
              <input
                type="file"
                id="id"
                className="hidden border rounded-md h-[45px] font-medium text-[12px]"
                placeholder="Email Adress"
                name="image"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-blue-950 text-white font-sans text-[12px] p-1 rounded-sm">
            Add Image
          </button>
        </div>
      </div>
    </form>
  );
};

export default page;
