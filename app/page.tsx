import Image from "next/image";
import React from "react";
// import moment from "moment";

const page = async () => {
  const res = await fetch("https://assign-amber.vercel.app/api/card", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  let data = await res.json();

  return (
    <div>
      <div className="p-4 flex flex-col items-center justify-center gap-3">
        {data?.data
          ?.map((props: any) => (
            <div
              key={props?._id}
              className="overflow-hidden border rounded-md w-[300px] h-[400px]"
            >
              <Image
                alt={props?.title}
                src={props?.image}
                width={1000}
                height={1000}
                className="w-full h-[85%] border-b object-cover"
              />

              <p className="mt-1 ml-3 capitalize font-semibold">
                {props?.title}
              </p>
              {/* <div className="flex justify-end p-1">
                <p className="text-[12px] text-gray-500">
                  {moment
                    .utc(`${props?.createdAt}`)
                    .local()
                    .startOf("seconds")
                    .fromNow()}
                </p>
              </div> */}
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default page;
