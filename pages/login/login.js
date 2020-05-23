// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    username: "",
    password: "",
  },

  signup: function () {
    wx.navigateTo({
      url: '/pages/enroll/enroll'
    })
  },

  login: function () {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入用户名！',
        success: function (res) { }
      })
    } else if (that.data.username.length != 11) {
      wx.showModal({
        title: '提示！',
        content: '手机号码长度有误，请重新输入',
        showCancel: false,
        success(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // } else if (res.cancel) {
          //   console.log('用户点击取消')
          // }
        }
      })
    } else if (!myreg.test(that.data.username)) {
      wx.showModal({
        title: '提示！',
        content: '请输入正确的手机号码',
        showCancel: false,
        success(res) {
          // if (res.confirm) {
          //   console.log('用户点击确定')
          // } else if (res.cancel) {
          //   console.log('用户点击取消')
          // }
        }
      })
    }
    else if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入密码！',
        success: function (res) { }
      })
    }
    else {
      // wx.request({
      //   url: getApp().globalData.server + '/API/Login/phone_login',
      //   data: {
      //     phone: that.data.username,
      //     password: that.data.password,
      //     user_id: getApp().globalData.userInfo_detail.user_id,
      //     shop_id: getApp().globalData.settings.shop_id,
      //     company_id: getApp().globalData.settings.company_id,
      //   },
      //   method: "POST",
      //   header: {
      //     "Content-Type": "application/x-www-form-urlencoded"
      //   },
      //   success: function (res) {
      //     console.log(res.data)
      //     if (res.data.error_no == 10012) {
      //       wx.showModal({
      //         title: '提示！',
      //         showCancel: false,
      //         content: '密码错误！',
      //         success: function (res) { }
      //       })
      //     }
      //     else if (res.data.error_no == 10008) {
      //       wx.showModal({
      //         title: '提示！',
      //         showCancel: false,
      //         content: '手机号不存在！',
      //         success: function (res) { }
      //       })
      //     }
      //     else if (res.data.error_no != 0) {
      //       wx.showModal({
      //         title: '哎呀～',
      //         content: '出错了呢！' + res.data.data.error_msg,
      //         success: function (res) {
      //           if (res.confirm) {
      //             console.log('用户点击确定')
      //           } else if (res.cancel) {
      //             console.log('用户点击取消')
      //           }
      //         }
      //       })
      //     }
      //     else if (res.data.error_no == 0) {
      //       getApp().globalData.userInfo_detail = res.data.data
      //       //console.log(getApp().globalData.userInfo_detail)
      //       wx.showModal({
      //         title: '恭喜！',
      //         showCancel: false,
      //         content: '登录成功',
      //         success: function (res) {
      //           if (res.confirm) {
      //             console.log('用户点击确定')
      //           } else if (res.cancel) {
      //             console.log('用户点击取消')
      //           }
      //         },
      //         complete: function (res) {
      //           wx.reLaunch({
      //             url: '../load/load'
      //           })
      //         }
      //       })
      //     }
      //   },
      //   fail: function (res) {
      //     wx.showModal({
      //       title: '哎呀～',
      //       content: '网络不在状态呢！',
      //       success: function (res) {
      //         if (res.confirm) {
      //           console.log('用户点击确定')
      //         } else if (res.cancel) {
      //           console.log('用户点击取消')
      //         }
      //       }
      //     })
      //   }
      // })
      console.log(that.data.username);
      wx.request({
        url: getApp().globalData.server + '/treehole/index.php/Home/User/login',
        data: {
          // username: that.data.username,
          phone: that.data.username,
          password: that.data.password,
          // password_again: that.data.passwordack,
          // face_url: getApp().globalData.userInfo.avatarUrl,

        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.error_code == 1) {
            wx.showModal({
              title: '提示:',
              content: res.data.msg,
              showCancel: false,
              success(res) { }
            })
          } else if (res.data.error_code == 2) {
            wx.showModal({
              title: '提示:',
              content: '不存在该手机用户，请注册!',
              showCancel: false,
              success(res) { }
            })
          } else if (res.data.error_code == 3) {
            wx.showModal({
              title: '提示:',
              content: '密码不存在，请重新输入!',
              showCancel: false,
              success(res) { }
            })
          } else if (res.data.error_code != 0) {
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
            getApp().globalData.user = res.data
            console.log(getApp().globalData.user)
            wx.showModal({
              title: '恭喜:',
              content: '登录成功',
              showCancel: false,
              success(res) { },
              complete: function (res) {
                wx.reLaunch({
                  url: "/pages/square/square"
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
        }
      })
    }
  },
  usernameInput: function (e) {
    this.data.username = e.detail.value
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})