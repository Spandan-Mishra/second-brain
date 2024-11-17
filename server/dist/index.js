"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);
const userSchema = zod_1.z.object({
    "username": zod_1.z.string().min(3).max(10),
    "password": zod_1.z.string().min(8).max(20),
});
const app = (0, express_1.default)();
// app.post("/api/v1/signup", async (req, res) => {
//     // zod validation 411
//     // password hashing
//     const username = req.body("username");
//     const password = req.body("password");
//     const existingUser = await UserModel.findOne({
//         username: username
//     })
//     try {
//         await UserModel.create({
//             username: username,
//             password: password
//         })
//         res.status(200).json({
//             message: "User signed up successfully",
//         })
//     } catch(e) {
//         res.status(403).json({
//             message: "User already exists",
//         })
//     }
// })
// app.post("/api/v1/signin", async (req, res) => {
//     // zod validation 411
//     const username = req.body("username");
//     const password = req.body("password");
//     try {
//         const user = await UserModel.findOne({
//             username: username,
//             password: password
//         })
//         if(user) {
//             const token = jwt.sign({
//                 id: user._id.toString()
//             }, JWT_SECRET);
//             res.status(200).json({
//                 token: token
//             })
//         } else {
//             res.status(403).json({
//                 message: "Invalid Credentials"
//             })
//         }
//     } catch(e) {
//         res.status(500).json({
//             message: "Internal server error"
//         })
//     }
// })
// app.post("/api/v1/content", (req, res) => {
// })
// app.get("/api/v1/content", (req, res) => {
// })
// app.delete("/api/v1/content", (req, res) => {
// })
// app.post("/api/v1/brain/share", (req, res) => {
// })
// app.get("/api/v1/brain/:shareLink", (req, res) => {
// })
