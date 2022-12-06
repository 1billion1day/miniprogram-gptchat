// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        canIUseGetUserProfile: false,
        canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
        questionText: ''
    },
    // 事件处理函数
    bindAskTap: async function () {
        console.log("ask " + this.data.questionText)
        await wx.navigateTo({
            url: '../chat/chat?text=' + this.data.questionText,
        })
    },
    i_question: function (res: any) {
        console.log(res.detail.value)
        this.setData({
            questionText: res.detail.value
        })
    },
    onLoad: function () {
        wx.setBackgroundColor({
            backgroundColor: '#777777',
        })

        // @ts-ignore
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    },
    getUserProfile: function () {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })
    }
})
