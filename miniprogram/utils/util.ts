export const formatTime = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    )
}

const formatNumber = (n: number) => {
    const s = n.toString()
    return s[1] ? s : '0' + s
}

export const gptChat = async (msg: string): Promise<any> => {
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
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export class ChatList {
    public static add(user: 0 | 1, msg: string): string {
        const key = `key_${new Date().getTime()}`;
        const chatlist = wx.getStorageSync('chatlist') || []
        chatlist.push({
            key: key,
            user: user,
            msg: msg,
        })
        wx.setStorageSync('chatlist', chatlist)
        return key
    }

    public static get(): [{ user: 0 | 1, msg: string }] | any {
        return wx.getStorageSync('chatlist') || []
    }

    public static clean() {
        wx.setStorageSync('chatlist', [])
    }
}