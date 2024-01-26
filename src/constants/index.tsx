import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { RiEditCircleFill } from "react-icons/ri";

export const navLinks = [
    {
        title: "Home",
        href: "/",
        icon: <AiFillHome />,
    },
    {
        title: "My attendence",
        href: "/attendence",
        icon: <BsCardChecklist />,
    },
    {
        title: "Classes",
        href: "/classes",
        icon: <SiGoogleclassroom />,
    },
    {
        title: "Notes",
        href: "/notes",
        icon: <FaNoteSticky />,
    },
];

export const userLinks = [
    {
        title: "Profile",
        href: "/profile",
        icon: <FaUserCircle />,
    },
    {
        title: "Edit",
        href: "/edit-profile",
        icon: <RiEditCircleFill />,
    },
    {
        title: "Logout",
        href: "/logout",
        icon: <AiOutlineLogout />,
    },
];

export const footerLinks = [
    {
        title: "Teachers",
        data: [
            "Dr Sonal Chawla",
            "Dr Anuj Sharma",
            "Dr RK Singla",
            "Dr Indu Chabra",
            "Dr Anuj Kumar",
        ],
    },
    {
        title: "Contact us",
        data: [
            "XX-XXX-XX-XXX",
            "ZZ-ZZZ-ZZ-ZZZ",
            "abc.gmail.com",
            "xyz.gmail.com",
        ],
    },
    {
        title: "Other Info",
        data: ["Ratings", "Companies", "Study Material", "Books"],
    },
];
