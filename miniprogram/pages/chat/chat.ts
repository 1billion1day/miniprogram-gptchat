// index.ts
import {ChatList, gptChat} from "../../utils/util";

Page({
    data: {
        chatList: [],
        questionText: ""
    },
    onLoad: function (options) {
        const questionText = options.text
        console.log(questionText)

        this.setData({
            chatList: ChatList.get(),
        })
    },
    bindAskTap: async function () {
        console.log("ask " + this.data.questionText)
        ChatList.add(0, this.data.questionText)
        // let res_data = await gptChat(this.data.questionText)
        // ChatList.add(1, res_data.message)
        wx.showLoading({
            title: '正在思考',
        }).then(() => {
            gptChat(this.data.questionText)
                .then(res_data => {
                        ChatList.add(1, res_data.message)
                        wx.hideLoading()
                        this.setData({
                            chatList: ChatList.get(),
                        })
                    }
                ).catch(() => {
                wx.hideLoading()
                wx.showToast({
                    title: '我的网络不太好，再问我一次吧',
                    icon: 'error'
                })
            })
        })
    },
    i_question: function (res: any) {
        console.log(res.detail.value)
        this.setData({
            questionText: res.detail.value
        })
    },
})
