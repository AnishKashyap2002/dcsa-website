"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { navLinks } from "@/constants";
import { AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SmallNavbar() {
    return (
        <Menu
            as="div"
            className="relative"
        >
            <Menu.Button
                as="div"
                className="flex gap-2 items-center cursor-pointer bg-gray-700 hover:text-white text-slate-200 px-4 py-2 rounded- md  "
            >
                <div className="text-2xl ">
                    {" "}
                    <AiOutlineMenu />
                </div>
                <span>Menu</span>
                <div className="">
                    <IoMdArrowDropdown />
                </div>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-80"
                enterTo="transform opacity-100 scale-200"
                leave="transition ease-in duration-200"
                leaveFrom="transform opacity-100 scale-200"
                leaveTo="transform opacity-0 scale-80"
            >
                <Menu.Items className="absolute right-0 bg-gray-700 rounded-md  ">
                    {navLinks.map((link) => (
                        <div
                            key={link.title + "small"}
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
