"use client";

import React, { FormEvent, useState } from "react";
import user from "../../public/user.jpeg";
import { CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import { IoDocument } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "@/actions/revalidateTag";

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateAnnoucementForm = ({ setIsOpen }: Props) => {
    const router = useRouter();
    const session = useSession();
    const [annoucement, setAnnoucement] = useState({
        title: "",
        data: "",
        link: "",
        image: "",
        document: "",
    });

    const handleUploadImage = (result: any) => {
        setAnnoucement({ ...annoucement, image: result?.info?.secure_url });
    };
    const handleUploadDocument = (result: any) => {
        setAnnoucement({ ...annoucement, document: result?.info?.secure_url });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (annoucement.title == "" || annoucement.data == "") {
            toast.error("Necessary fields are not filled");
        }
        axios
            .post("/api/create/annoucement", {
                ...annoucement,
                // @ts-ignore
                user: session.data?.id,
            })
            .then((response) => {
                toast.success("Annoucement published");

                setIsOpen(false);
            })
            .catch((error) => {
                toast.error("An error occured");
            })
            .finally(() => {
                location.reload();
            });

        //@ts-ignore
        console.log(session.data?.id);
    };

    return (
        <div className="mt-4">
            <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col ">
                    <label className="font-bold  text-gray-700">
                        Enter Title*
                    </label>
                    <input
                        type="text"
                        required
                        onChange={(e) =>
                            setAnnoucement({
                                ...annoucement,
                                title: e.target.value,
                            })
                        }
                        placeholder="Enter what is this annoucement is about..."
                        className="px-3 text-sm text-md py-2 outline-none  border-b  border-black border-1"
                    />
                </div>
                <div className="flex flex-col ">
                    <label className="font-bold  text-gray-700">
                        Annoucement detail*
                    </label>
                    <textarea
                        rows={5}
                        required
                        onChange={(e) =>
                            setAnnoucement({
                                ...annoucement,
                                data: e.target.value,
                            })
                        }
                        placeholder="What are the details of your annoucement"
                        className="px-3 text-sm text-md py-2 outline-none  rounded-lg  border-gray-700 border-2"
                    />
                </div>
                <div className="flex flex-col ">
                    <label className="font-bold  text-gray-700">
                        Enter Link
                    </label>
                    <input
                        type="text"
                        onChange={(e) =>
                            setAnnoucement({
                                ...annoucement,
                                link: e.target.value,
                            })
                        }
                        placeholder="Enter the related link or annoucement"
                        className="px-3 text-sm text-md py-2 outline-none  border-b  border-black border-1"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col ">
                        <label className="font-bold  text-gray-700">
                            Enter Image
                        </label>
                        <CldUploadButton
                            options={{
                                maxFiles: 1,
                            }}
                            uploadPreset="s0suaub8"
                            onUpload={handleUploadImage}
                        >
                            <HiPhoto
                                size={30}
                                className={"bg-sky-500 text-white"}
                            />
                        </CldUploadButton>
                    </div>
                    <div className="flex flex-col ">
                        <label className="font-bold  text-gray-700">
                            Enter Document
                        </label>
                        <CldUploadButton
                            options={{
                                maxFiles: 1,
                            }}
                            uploadPreset="s0suaub8"
                            onUpload={handleUploadDocument}
                        >
                            <IoDocument
                                size={30}
                                className={"bg-sky-500 text-white"}
                            />
                        </CldUploadButton>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-3 py-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateAnnoucementForm;
