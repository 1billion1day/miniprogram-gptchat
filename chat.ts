// index.ts
Page({
    data: {},
    onLoad: function (options) {
        const questionText = options.text
        console.log(questionText)


        // @ts-ignore
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    }
})
