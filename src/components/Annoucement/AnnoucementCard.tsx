import { Annoucement, User } from "@/types";
import defaultUser from "../../../public/user.jpeg";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type AnnoucementCardProps = {
    annoucement: Annoucement;
};

const AnnoucementCard = ({ annoucement }: AnnoucementCardProps) => {
    return (
        <div className="px-4 py-2 flex flex-col gap-2 shadow-md border-2  border-black rounded-md sm:max-w-[700px] w-full ">
            <div className="flex gap-2 items-center">
                <div className="relative h-[30px] w-[30px] rounded-full">
                    <Image
                        src={annoucement?.user?.image || defaultUser}
                        alt="User profile pic"
                        className="object-fit"
                        fill
                    />
                </div>

                <div className="flex flex-col">
                    <span className="font-medium ">
                        {annoucement?.user?.name}
                    </span>
                    <span className="text-xs text-gray-700">
                        {annoucement?.createdAt.toDateString()}
                    </span>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="font-bold text-xl"> {annoucement.title}</div>
                <div className="text-sm text-gray-800">{annoucement.data}</div>
            </div>
            {annoucement?.image && (
                <div className="relative min-h-[300px]">
                    <Image
                        src={annoucement.image}
                        alt="image"
                        fill
                    />
                </div>
            )}
            {annoucement?.link && (
                <div className="flex gap-2">
                    <span className="font-bold break-words break-all  ">
                        Links:{" "}
                    </span>
                    <Link
                        className="text-red-400"
                        href={annoucement.link}
                    >
                        {annoucement.link}
                    </Link>
                </div>
            )}
            {annoucement?.document && (
                <div className="flex gap-2 break-words">
                    <span className="font-bold">Document: </span>
                    <span className=" break-words break-all w-full">
                        <Link
                            href={annoucement?.document}
                            className="text-green-700"
                        >
                            {annoucement.document}
                        </Link>
                    </span>
                </div>
            )}
        </div>
    );
};

export default AnnoucementCard;
