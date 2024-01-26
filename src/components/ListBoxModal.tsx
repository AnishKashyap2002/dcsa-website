"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { userLinks } from "@/constants";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import user from "../../public/user.jpeg";
import Image from "next/image";
export default function ListBoxModal() {
    const session = useSession();
    const { data } = session;

    const handleClick = (route: string) => {
        if (route == "/logout") {
            signOut();
        }
    };

    if (session.status == "unauthenticated" || session.status == "loading") {
        return (
            <div className="text-white font-bold cursor-pointer">Sign In </div>
        );
    }

    return (
        <Menu
            as="div"
            className="relative"
        >
            <Menu.Button
                as="div"
                className="flex gap-2 items-center cursor-pointer bg-gray-700 hover:text-white text-slate-200 px-4 py-2 rounded- md  "
            >
                <div className=" relative  h-[30px] w-[30px] rounded-full bg-green-400 ">
                    {" "}
                    <Image
                        src={data?.user?.image || user}
                        alt=""
                        className="object-fit rounded-full"
                        fill
                    />
                </div>
                <span>{data?.user?.name}</span>
                <div className="">
                    <IoMdArrowDropdown />
                </div>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 bg-gray-700 rounded-md  ">
                    {userLinks.map((link) => (
                        <div
                            key={link.title}
                            onClick={() => handleClick(link.href)}
                            className="flex gap-2 cursor-pointer items-center text-sm  bg-gray-800 transition duration-200 hover:bg-gray-500 hover:text-white text-slate-200 rounded-md px-4 py-2"
                        >
                            <div className="font-bold text-2xl">
                                {link.icon}
                            </div>
                            <div className="">{link.title}</div>
                        </div>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
