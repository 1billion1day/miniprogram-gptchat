"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const util_1 = require("../../utils/util");
Page({
    data: {
        chatList: [],
        questionText: ""
    },
    onLoad: function (options) {
        const questionText = options.text;
        console.log(questionText);
        this.setData({
            chatList: util_1.ChatList.get(),
        });
    },
    bindAskTap: async function () {
        console.log("ask " + this.data.questionText);
        util_1.ChatList.add(0, this.data.questionText);
        let res_data = await util_1.gptChat(this.data.questionText);
        util_1.ChatList.add(1, res_data.message);
        this.setData({
            chatList: util_1.ChatList.get(),
        });
    },
    i_question: function (res) {
        console.log(res.detail.value);
        this.setData({
            questionText: res.detail.value
        });
    },
});
