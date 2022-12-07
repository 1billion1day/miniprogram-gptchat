"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const util_1 = require("../../utils/util");
// 获取应用实例
// @ts-ignore
const app = getApp();
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
        questionText: ''
    },
    // 事件处理函数
    bindAskTap: async function () {
        console.log("ask " + this.data.questionText);
        util_1.ChatList.clean();
        util_1.ChatList.add(0, this.data.questionText);
        wx.navigateTo({
            url: '../chat/chat',
        }).then(() => {
            util_1.gptChat(this.data.questionText).then(res_data => {
                util_1.ChatList.add(1, res_data.message);
            });
        });
    },
    i_question: function (res) {
        console.log(res.detail.value);
        this.setData({
            questionText: res.detail.value
        });
    },
    onLoad: function () {
        wx.setBackgroundColor({
            backgroundColor: '#777777',
        });
        // @ts-ignore
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            });
        }
    },
    getUserProfile: function () {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息',
            success: (res) => {
                console.log(res);
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            }
        });
    }
});
