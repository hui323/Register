//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    copywriter:{
      xinjianBtn:{
        text:"新建"
      },
      wofabuBtn:{
        text:"我创建的"
      },
      wocanyuBtn:{
        text:"我参与的"
      }
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 进入新建页面
  jumpToNew: function(){
    wx.navigateTo({
      url: '../new1by1/new1by1'
    })
  },
  // 进入我发布的
  jumpToMyPush:function(){
    wx.navigateTo({
      url: '../onebyone/onebyone?id=1189',
    })
  },


  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
