"use strict";
// app.ts
// import DelayLoading from 'wx-delay-loading/lib/index'
App({
    globalData: {},
    onLaunch() {
        // 登录
        wx.login({
            success: res => {
                console.log(res.code);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        });
    },
});
