"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatList = exports.gptChat = exports.formatTime = void 0;
const formatTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return ([year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':'));
};
exports.formatTime = formatTime;
const formatNumber = (n) => {
    const s = n.toString();
    return s[1] ? s : '0' + s;
};
const gptChat = async (msg) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: 'https://cms-api.wu.ren/weixin/chat/message',
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                message: msg,
            },
            success(res) {
                resolve(res.data);
            },
            fail(err) {
                reject(err);
            }
        });
    });
};
exports.gptChat = gptChat;
class ChatList {
    static add(user, msg) {
        const chatlist = wx.getStorageSync('chatlist') || [];
        chatlist.push({
            user: user,
            msg: msg,
        });
        wx.setStorageSync('chatlist', chatlist);
    }
    static get() {
        return wx.getStorageSync('chatlist') || [];
    }
    static clean() {
        wx.setStorageSync('chatlist', []);
    }
}
exports.ChatList = ChatList;
