"use client";
import React from "react";
import { navLinks } from "@/constants";
import ListBoxModal from "./ListBoxModal";

import SmallNavbar from "./SmallNavbar";

const ExpandNavbar = () => {
    return (
        <div className="flex items-center gap-2">
            {navLinks.map((link) => (
                <div
                    key={link.title + "expand"}
                    className="flex gap-1 px-4 rounded-md py-2 hover:text-white cursor-pointer text-slate-200 bg-gray-700 items-center"
                >
                    <div className="text-2xl ">{link.icon}</div>
                    <div className="text-sm font-semibold">{link.title}</div>
                </div>
            ))}
        </div>
    );
};

const Navbar = () => {
    return (
        <div className="flex bg-gray-600 justify-between   gap-4 items-center px-4 py-4">
            <div className="hidden sm:block">
                <ExpandNavbar />
            </div>
            <div className="sm:hidden block">
                <SmallNavbar />
            </div>
            <div className="">
                <ListBoxModal />
            </div>
        </div>
    );
};

export default Navbar;
