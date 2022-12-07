// index.ts
import {ChatList, gptChat} from "../../utils/util";

Page({
    data: {
        chatList: [],
        questionText: "",
        viewId: ""
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
        if (this.data.questionText.length == 0) {
            wx.showToast({
                title: '你想问点啥？',
                icon: 'error',
            })
            return
        }
        ChatList.add(0, this.data.questionText)
        wx.showLoading({
            title: '正在思考',
            mask: true
        }).then(() => {
            gptChat(this.data.questionText)
                .then(res_data => {
                        wx.hideLoading()
                        let viewId = ChatList.add(1, res_data.message)
                        this.setData({
                            chatList: ChatList.get(),
                            viewId: viewId,
                            questionText: ""
                        })
                    }
                ).catch(() => {
                wx.hideLoading()
                wx.showToast({
                    title: '我的网络不太好，再问我一次吧',
                    icon: 'error'
                })
                let viewId = ChatList.add(1, '我的网络不太好，再问我一次吧')
                this.setData({
                    chatList: ChatList.get(),
                    viewId: viewId
                })
            })
        })
    },
    i_question: function (res: any) {
        this.setData({
            questionText: res.detail.value
        })
    },
})
