import bcrypt from "bcrypt";

import NextAuth, { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogledProvder from "next-auth/providers/google";

import { debug, error } from "console";
import Connection from "@/lib/connectDB";
import User from "@/lib/user";
import { NextResponse } from "next/server";

export const authOptions: AuthOptions = {
    providers: [
        GoogledProvder({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

            async profile(profile) {
                Connection();

                const email = profile.email;
                const image = profile.picture;
                const name = profile.name;
                const password = profile.at_hash;

                console.log(profile);

                const exist_user = await User.findOne({ email });

                if (!exist_user || !exist_user?.hashedPassword) {
                    const newUser = await User.create({
                        email,
                        name,
                        image,
                        hashedPassword: password,
                    });

                    console.log("user created");
                    return newUser;
                }

                return exist_user;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Enter your email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid Credentials");
                }

                Connection();

                console.log(credentials);

                const existingUser = await User.findOne({
                    email: credentials.email,
                });

                if (!existingUser || !existingUser?.hashedPassword) {
                    console.log("Came here");
                    return null;
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    existingUser.hashedPassword
                );

                if (!isCorrectPassword) {
                    console.log("Passwords do not match");
                    return null;
                }

                console.log("Everything is correct");
                return existingUser;
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            Connection();

            const user = await User.findOne({
                email: session.user?.email,
            });
            const newSession = {
                ...session,
                image: user.image,
                id: user._id,
                type: user.type,
            };

            console.log(newSession);

            return newSession;
        },
    },

    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
