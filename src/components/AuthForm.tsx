"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type VARIANT = "LOGIN" | "REGISTER";
type USER = {
    username: String;
    email: String;
    password: String;
};

const AuthForm = () => {
    const [variant, setVariant] = useState<VARIANT>("LOGIN");

    const router = useRouter();
    const [user, setUser] = useState({
        username: "",

        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const submitEvent = (e: FormEvent) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            toast.error("All fields are necessary");
            console.log("Everything not come", user);
            return;
        }

        if (variant == "LOGIN") {
            setLoading(true);
            signIn("credentials", {
                redirect: false,
                email: user.email,
                password: user.password,
            }).then((response) => {
                console.log(response);
                if (response?.error) {
                    toast.error("Invalid credentials");
                    setLoading(false);
                } else if (response?.ok) {
                    toast.success("Signed In successfully");
                    router.push("/");
                }
            });
        } else {
            if (!user.username) {
                toast.error("All fields are necessary");
                return;
            }
            setLoading(true);

            axios
                .post("/api/register", user)
                .then((response) => {
                    toast.success("User created successfully");
                })
                .catch((error) => {
                    toast.error("A problem occured");
                    setLoading(false);
                });

            console.log("The data is ", user);
        }
    };

    const socialAction = (action: string) => {
        setLoading(true);

        signIn(action, { callbackUrl: "/" }).then((callback) => {
            console.log(callback);
            if (callback?.ok) {
                toast.success("Login Success");
                router.push("/");
            } else if (callback?.error) {
                toast.error("Invalid credentials");
            }
        });
    };

    return (
        <div className="flex h-full w-full items-center justify-center my-8 ">
            <div
                className={`shadow-md bg-gradient-to-r  from-green-500 min-w-[500px] to-yellow-500 px-2 py-2 rounded-xl ${
                    loading && "opacity-50"
                }`}
            >
                <form
                    onSubmit={submitEvent}
                    className="bg-white  rounded-md px-3 py-2 flex flex-col gap-2"
                >
                    <legend className="font-bold text-2xl flex justify-center">
                        {" "}
                        {variant == "LOGIN" ? "Log In" : "Sign Up"}{" "}
                    </legend>
                    {variant == "REGISTER" && (
                        <div className="bg-gradient-to-r from-yellow-300 to-green-300 rounded-md px-3 py-2 flex flex-col">
                            <label
                                htmlFor=""
                                className="text-lg"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                className=" outline-none px-2 py-1 rounded-lg bg-white"
                                placeholder="Enter your username..."
                                required
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        username: e.target.value,
                                    })
                                }
                            />
                        </div>
                    )}
                    <div className="bg-gradient-to-r from-yellow-300 to-green-300 rounded-md px-3 py-2 flex flex-col">
                        <label
                            htmlFor=""
                            className="text-lg"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="px-2 outline-none py-1 rounded-lg bg-white"
                            placeholder="Enter your email..."
                            required
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="bg-gradient-to-r from-yellow-300 to-green-300 rounded-md px-3 py-2 flex flex-col">
                        <label
                            htmlFor=""
                            className="text-lg"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="px-2 py-1 outline-none rounded-lg bg-white"
                            placeholder="Enter your password..."
                            required
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password: e.target.value,
                                })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-gradient-to-r ${
                            loading && "opacity-50"
                        }  from-green-500 to-cyan-500 px-4 py-2 rounded-md font-bold text-xl w-fit`}
                    >
                        {variant == "LOGIN" ? "Log In" : "Sign Up"}{" "}
                    </button>
                    <div className="flex jusify-center">
                        {variant == "LOGIN" ? (
                            <div className="">
                                <span>New user? </span>
                                <span
                                    className=" text-blue-600 cursor-pointer"
                                    onClick={() => setVariant("REGISTER")}
                                >
                                    Sign Up
                                </span>
                            </div>
                        ) : (
                            <div className="">
                                <span>Existing User? </span>
                                <span
                                    className=" text-blue-600 cursor-pointer"
                                    onClick={() => setVariant("LOGIN")}
                                >
                                    Sign In
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="relative pt-4">
                        <div className="flex justify-center  px-8 z-0">
                            {" "}
                            <p className="bg-white px-8 font-bold ">
                                Login using
                            </p>
                        </div>
                        <div className="bg-gray-500 h-[2px]  " />
                    </div>
                    <div className="flex justify-center gap-2 w-full">
                        <div
                            onClick={() => socialAction("google")}
                            className="cursor-pointer px-3 py-2 rounded-md bg-gradient-to-r from-yellow-300 to-green-300"
                        >
                            Google
                        </div>
                        <div
                            onClick={() => socialAction("github")}
                            className=" cursor-pointer px-3 py-2 rounded-md bg-gradient-to-r from-yellow-300 to-green-300"
                        >
                            Github
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
