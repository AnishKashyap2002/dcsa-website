import { getAnnoucements } from "@/actions/getAnnoucements";
import Annoucements from "@/components/Annoucement/Annoucements";
import AuthForm from "@/components/AuthForm";
import { Annoucement } from "@/types";
import axios from "axios";
import Image from "next/image";

export default async function Home() {
    const annoucements = await getAnnoucements();
    return (
        <main className="">
            <Annoucements annoucements={annoucements} />
        </main>
    );
}
