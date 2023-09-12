import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import connectToDB from "@/Models/Connection";
import CredentialsProvider from "next-auth/providers/credentials";
// import SlackProvider from "next-auth/providers/slack";
import RedditProvider from "next-auth/providers/reddit";

import { compare } from "bcryptjs";
import User from "@/Models/UsersModels";
import { NextApiRequest } from "next";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_SECRET_ID as string,
    }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_ID,
      authorization: {
        params: {
          duration: "permanent",
        },
      },
    }),
    // 1. For slack we have to mention https secured url for redirection, so i would not able to do slack signin
    // 2. For medium signin medium api is not providing us email id.
    // 3. For pintrest, we have to create buissness account, and need to enter personal web-site link.
    // 4. For linkedin, need to create organization page, have to verify that, then only i can do access app.
    CredentialsProvider({
      name: "credentials",
      // type: "credentials",
      async authorize(
        credentials: { email: string; password: string },
        req: NextApiRequest
      ) {
        connectToDB().catch((error) => {
          throw new Error("Connection Failed...!");
        });

        // check user existance
        const result = await User.findOne({ email: credentials.email });

        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        // compare()
        const checkPassword = await compare(
          credentials.password,
          result.password
        );

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return {
          name: result.name,
          image: result.profilePic,
          email: result.email,
        } as {
          name: string;
          image: string;
          email: string;
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user, credentials, profile, email }) {
      console.log({ account, user, credentials, profile, email });
      return true;
    },
  },
  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, // 3 hours
  },
});
