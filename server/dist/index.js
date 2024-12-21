"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
// auth
const config_1 = require("./config");
const utils_1 = require("./utils");
const middleware_1 = require("./middleware");
const userSchema = zod_1.z.object({
    "username": zod_1.z
        .string()
        .min(3, { message: "Username must be atleast 3 characters long" })
        .max(10, { message: "Username cannot be more than 10 characters" }),
    "password": zod_1.z
        .string()
        .min(8, { message: "Password must be alteast 8 characters long" })
        .max(20, { message: "Password cannot be 20 characters" }),
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/brain/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // zod validation 411
    const parsedData = userSchema.safeParse(req.body);
    if (!parsedData.success) {
        const errors = parsedData.error.errors.map((entry) => ({
            path: entry.path[0],
            message: entry.message
        }));
        res.status(400).json({ errors });
        return;
    }
    // password hashing
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({
            username: username,
            password: password
        });
        res.status(200).json({
            message: "User signed up successfully",
        });
    }
    catch (e) {
        res.status(403).json({
            message: "User already exists",
        });
    }
}));
app.post("/api/v1/brain/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // zod validation 411
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = yield db_1.UserModel.findOne({
            username: username,
            password: password
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id.toString()
            }, config_1.JWT_PASSWORD);
            res.status(200).json({
                token: token
            });
        }
        else {
            res.status(403).json({
                message: "Invalid Credentials"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}));
app.post("/api/v1/brain/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link: link,
        title: title,
        type: type,
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
}));
app.get("/api/v1/brain/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/brain/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contentId = req.body.contentId;
    try {
        yield db_1.ContentModel.deleteMany({
            _id: contentId,
            userId: userId
        });
        res.status(200).json({
            message: "Content Deleted"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "Content not owned by you"
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                // @ts-ignore
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.hasher)(10);
        yield db_1.LinkModel.create({
            hash: hash,
            userId: req.userId
        });
        res.json({
            hash: hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.status(200).json({
            message: "Removed Link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const userLink = yield db_1.LinkModel.findOne({
        hash
    });
    if (!userLink) {
        res.status(404).json({
            message: "Invalid link or sharing not enabled"
        });
        return;
    }
    const content = yield db_1.ContentModel.find({
        userId: userLink.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: userLink.userId
    });
    res.status(200).json({
        username: user === null || user === void 0 ? void 0 : user.username,
        content: content
    });
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(config_1.MONGO_URL);
    app.listen(3000);
    console.log("Listening on port 3000");
});
main();
