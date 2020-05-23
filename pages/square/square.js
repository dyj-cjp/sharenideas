// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secoo: "#979797",
    showdata:{}
    //  list:[
    //    {
    //      face_url:"/images/add.png",
    //      username:"多啦A梦",
    //      send_timestamp:"2020-5-1",
    //      content:"jfjjajjfjajfjaj",
    //      total_likes:99,
    //    },
    //    {
    //      face_url: "/images/add.png",
    //      username: "多啦A梦",
    //      send_timestamp: "2020-5-1",
    //      content: "jfjjajjfjajfjaj",
    //      total_likes: 99,
    //    },
    //    {
    //      face_url: "/images/add.png",
    //      username: "多啦A梦",
    //      send_timestamp: "2020-5-1",
    //      content: "jfjjajjfjajfjaj",
    //      total_likes: 99,
    //    },
    //    {
    //      face_url: "/images/add.png",
    //      username: "多啦A梦",
    //      send_timestamp: "2020-5-1",
    //      content: "jfjjajjfjajfjaj",
    //      total_likes: 99,
    //    },
    //    {
    //      face_url: "/images/add.png",
    //      username: "多啦A梦",
    //      send_timestamp: "2020-5-1",
    //      content: "jfjjajjfjajfjaj",
    //      total_likes: 99,
    //    }
    //  ]
  },
  like:function(e){
    var that=this
    var showdata=that.data.showdata
    console.log("id of like:",e.target.id)
    for(var i=0;i<showdata.length;i++){
      if(showdata[i].id==e.target.id){
        if(showdata[i].islike==1){
          wx.showModal({
            title: '提示:',
            content: '已经点过赞了哦，不能更赞啦~',
            showCancel: false,
            success(res) { },
          })
        }else{
          wx.request({
            url: getApp().globalData.server + '/treehole/index.php/Home/Message/do_like', //仅为示例，并非真实的接口地址
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
                var showdata = that.data.showdata
                console.log("id of like:", e.target.id)
                for (var i = 0; i < showdata.length; i++) {
                  if (showdata[i].id == e.target.id){
                    showdata[i].total_likes++
                    showdata[i].islike = 1

                    that.setData({
                      showdata: showdata
                    })
                  }
                }
                console.log(e)
                wx.showModal({
                  title: '提示:',
                  content: '点赞成功哦~',
                  showCancel: false,
                  success(res) { },
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
        }
      }
    }
  },
  first_select: function() {

  },
  second_select: function() {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },
  third_select: function() {
    wx.redirectTo({
      url: '/pages/mine/mine',
    })
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
      url: getApp().globalData.server + '/treehole/index.php/Home/Message/get_all_messages',
      data: {},
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
           showdata:res.data.data
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