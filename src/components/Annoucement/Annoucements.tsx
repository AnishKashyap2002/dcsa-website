// "use client";
import AnnoucementButton from "./AnnoucementButton";
import axios from "axios";
import AnnoucementCard from "./AnnoucementCard";

import { getAnnoucements } from "@/actions/getAnnoucements";
import { Annoucement } from "@/types";
import { useEffect, useState } from "react";

const Annoucements = ({ annoucements }: { annoucements: Annoucement[] }) => {
    // const [annoucements, setAnnoucements] = useState<Annoucement[]>([]);

    // const getAnnoucements = async () => {
    //     await axios
    //         .get<Annoucement[]>("/api/get/annoucements")
    //         .then((response) => {
    //             if (response.status >= 200 && response.status < 300) {
    //                 console.log(response.data);
    //                 setAnnoucements(response.data);
    //             } else {
    //                 console.log(response);
    //             }
    //         });
    // };
    // useEffect(() => {
    //     getAnnoucements();
    // }, []);

    return (
        <>
            <div className="min-h-screen mt-4 ">
                <div className="flex justify-center text-2xl">
                    Recent Annoucements
                </div>

                <div className="flex flex-col gap-4 items-center">
                    {annoucements.map((annoucement: Annoucement) => (
                        <AnnoucementCard
                            key={Math.random()}
                            annoucement={annoucement}
                        />
                    ))}
                </div>
                <AnnoucementButton />
            </div>
        </>
    );
};

export default Annoucements;
