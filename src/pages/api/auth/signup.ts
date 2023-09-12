import connectToDB from "@/Models/Connection";
import User from "@/Models/UsersModels";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectToDB()
    .then(async () => {
      if (req.method === "POST") {
        if (!req.body) {
          return res.status(404).json({ error: "Don't have form data...!" });
        } else {
          const { name, email, password } = req.body;

          const checkUserExist = await User.findOne({ email });

          if (checkUserExist)
            return res
              .status(422)
              .json({ message: "User is already exists...!" });

          User.create({ name, email, password: await hash(password, 12) })
            .then(() =>
              res
                .status(201)
                .json({ status: true, message: "User Created Successfully!" })
            )
            .catch((err) => res.status(404).json({ err }));
        }
      } else {
        res
          .status(500)
          .json({ message: "HTTP method not valid only POST Accepted" });
      }
    })
    .catch(() => res.status(500).json({ message: "Connections failed...!" }));
}
