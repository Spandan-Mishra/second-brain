"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasher = void 0;
const hasher = (len) => {
    let options = "1234567890qwertyuiopasdfghjklzxcvbnm";
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * options.length)];
    }
    return ans;
};
exports.hasher = hasher;
