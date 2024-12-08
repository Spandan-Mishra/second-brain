import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
import { ContentModel, LinkModel, UserModel } from './db';
import cors from 'cors';
// auth
import { JWT_PASSWORD, MONGO_URL } from './config';
import { hasher } from './utils';
import { userMiddleware } from './middleware';

const userSchema = z.object({
  "username": z.string().min(3).max(10),
  "password": z.string().min(8).max(20),
})

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/brain/signup", async (req, res) => {
  // zod validation 411

  // password hashing
  const username = req.body.username;
  const password = req.body.password;

  try {
    await UserModel.create({
      username: username,
      password: password
    })

    res.status(200).json({
      message: "User signed up successfully",
    })
  } catch (e) {
    res.status(403).json({
      message: "User already exists",
    })
  }
})

app.post("/api/v1/brain/signin", async (req, res) => {
  // zod validation 411

  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({
      username: username,
      password: password
    })

    if (user) {
      const token = jwt.sign({
        id: user._id.toString()
      }, JWT_PASSWORD);

      res.status(200).json({
        token: token
      })
    } else {
      res.status(403).json({
        message: "Invalid Credentials"
      })
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal server error"
    })
  }
})

app.post("/api/v1/brain/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const title = req.body.title;
  const type = req.body.type;

  await ContentModel.create({
    link: link,
    title: title,
    type: type,
    userId: req.userId,
    tags: []
  })

  res.json({
    message: "Content added"
  })
})

app.get("/api/v1/brain/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const content = await ContentModel.find({
    userId: userId
  }).populate("userId", "username");

  res.json({
    content
  })
})

app.delete("/api/v1/brain/content", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const contentId = req.body.contentId;

  try {
    await ContentModel.deleteMany({
      _id: contentId,
      userId: userId
    })

    res.status(200).json({
      message: "Content Deleted"
    })
  } catch (e) {
    res.status(403).json({
      message: "Content not owned by you"
    })
  }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId
    })

    if (existingLink) {
      res.json({
        // @ts-ignore
        hash: existingLink.hash
      })
      return;
    }

    const hash = hasher(10);
    await LinkModel.create({
      hash: hash,
      userId: req.userId
    })

    res.json({
      hash: hash
    })
  } else {
    await LinkModel.deleteOne({
      userId: req.userId
    })

    res.status(200).json({
      message: "Removed Link"
    })
  }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const userLink = await LinkModel.findOne({
    hash
  })

  if (!userLink) {
    res.status(404).json({
      message: "Invalid link or sharing not enabled"
    })
    return;
  }

  const content = await ContentModel.find({
    userId: userLink.userId
  })

  const user = await UserModel.findOne({
    _id: userLink.userId
  })

  res.status(200).json({
    username: user?.username,
    content: content
  })
})

const main = async () => {
  await mongoose.connect(MONGO_URL);
  app.listen(3000);
  console.log("Listening on port 3000")
}

main();
