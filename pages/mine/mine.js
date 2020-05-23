// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#979797",
    secco: "#000000",
    usrphoto: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
    usrname: "四月到了",
    timestamp: "2019-03-19 21:27:41",
    content: "阅读，是一次心灵的艺术之旅。前辈们留下了大量优秀的作品，通过这些传世之作给我们以启迪，教会我们如何感受世界。那些震撼心灵的好书往往意义深远，让人相逢恨晚。",
    num: 4,
    showdata:{},
  },
  deleted: function (e) {
    var that = this
    wx.request({
      url: getApp().globalData.server + '/treehole/index.php/Home/Message/delete_message', //仅为示例，并非真实的接口地址
      data: {
        message_id: e.target.id,
        user_id: getApp().globalData.user.data.user_id,


      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.error_code != 0) {
          wx.showModal({
            title: '哎呀:',
            content: '出错了!' + res.data.msg,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.data.error_code == 0) {
          console.log(e)
          wx.showModal({
            title: '提示:',
            content: '删除成功哦~',
            showCancel: false,
            success(res) { },
            complete: function (res) {
              wx.redirectTo({
                url: "/pages/mine/mine"
              })
            }
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: '哎呀:',
          content: '网络不在状态!' + res.data.msg,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
    })
  },

  first_select: function() {
    wx.redirectTo({
      url: '../square/square'
    })
  },

  second_select: function() {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },

  third_select: function() {
    // wx.redirectTo({
    //   url: '/pages/mine/mine'
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: getApp().globalData.server +'/treehole/index.php/Home/Message/get_one_user_all_messages',
      data: {
        user_id: getApp().globalData.user.data.user_id,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        if (res.data.error_code != 0) {
          wx.showModal({
            title: '哎呀:',
            content: '出错了!' + res.data.msg,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else if (res.data.error_code == 0) {
          that.setData({
            showdata: res.data.data
          })
          console.log(that.data.showdata)
        }
      },
      fail: function(res) {
        wx.showModal({
          title: '哎呀:',
          content: '网络不在状态!' + res.data.msg,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})