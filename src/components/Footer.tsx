import React from "react";
import { footerLinks } from "@/constants";

const Footer = () => {
    return (
        <div className="flex mt-10 flex-wrap justify-center  text-white bg-gray-600    gap-4  px-4 py-4">
            {footerLinks.map((link) => (
                <div
                    className=""
                    key={link.title}
                >
                    <h1 className=" text-2xl flex gap-1 px-4 rounded-md py-2 hover:text-white cursor-pointer text-slate-200 bg-gray-700 items-center">
                        {link.title}
                    </h1>
                    <div className="px-2 py-3">
                        {link.data.map((content) => (
                            <p
                                className="  text-xs"
                                key={content}
                            >
                                {content}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Footer;
