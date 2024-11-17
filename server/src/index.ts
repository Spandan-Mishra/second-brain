import express from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
import { ContentModel, LinkModel, UserModel } from './db';
// auth
import { JWT_SECRET } from './config';

const userSchema = z.object({
    "username" : z.string().min(3).max(10),
    "password" : z.string().min(8).max(20),
})

const app = express();

app.post("/api/v1/signup", async (req, res) => {
    // zod validation 411

    // password hashing

    const username = req.body("username");
    const password = req.body("password");

    try {
        await UserModel.create({
            username: username,
            password: password
        })

        res.status(200).json({
            message: "User signed up successfully",
        })
    } catch(e) {
        res.status(403).json({
            message: "User already exists",
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    // zod validation 411

    const username = req.body("username");
    const password = req.body("password");

    try {
        const user = await UserModel.findOne({
            username: username,
            password: password
        })

        if(user) {
            const token = jwt.sign({
                id: user._id.toString()
            }, JWT_SECRET);

            res.status(200).json({
                token: token
            })
        } else {
            res.status(403).json({
                message: "Invalid Credentials"
            })
        }
    } catch(e) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/api/v1/content", async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;

    await ContentModel.create({
        link: link,
        title: title,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content", async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username");

    res.json({
        content
    })
})

app.delete("/api/v1/content", async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const contentId = req.body.contenId;

    try {
        await ContentModel.deleteMany({
            contentId,
            userId
        })

        res.status(200).json({
            message: "Content Deleted"
        })
    } catch(e) {
        res.status(403).json({
            message: "Content not owned by you"
        })
    }
})

app.post("/api/v1/brain/share",async (req, res) => {
    const share = req.body.share;

    if(share) {
        const link = await LinkModel.create({
            link: "random",
            // @ts-ignore
            userId: req.userId
        })

        res.json({
            link
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const link = req.params.shareLink;
    // @ts-ignore
    const userId = req.userId;

    const userLink = await LinkModel.find({
        hash: link,
        userId: userId
    })

    if(userLink) {
        const userData = await ContentModel.find({
            userId: userId
        }).populate("userId", "username");

        res.status(200).json({
            userData
        })
    } else {
        res.status(404).json({
            message: "Invalid link or sharing not enabled"
        })
    }
})
 