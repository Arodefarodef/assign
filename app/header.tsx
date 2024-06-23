import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import { MdAdd, MdLogout } from "react-icons/md";
import { options } from "./api/auth/[...nextauth]/options";
import { signOut } from "next-auth/react";

const Header = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      {session ? (
        <div className="flex justify-between p-5 bg-blue-600 text-white font-sans ">
          <Link href="/card" className="flex items-center gap-1 cursor-pointer">
            <MdAdd />
            <h4>Add New</h4>
          </Link>
          <div className="flex items-center gap-1 cursor-pointer">
            <MdLogout />
            <h4>LogOut</h4>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
