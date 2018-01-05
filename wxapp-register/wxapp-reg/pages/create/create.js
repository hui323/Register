Page({
  data: {
    money: '',
    secret: '公开',
    text: '小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发小程序开发',
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startDate: e.detail.value
    });
  },
  onShow: function (option) {
    wx.setNavigationBarTitle({
      title: '创建报名'
    });
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endDate: e.detail.value
    });
  },

  goToBack: function () {
    console.log('------------navigateBack');
    wx.navigateBack({
      delta: 1
    });
  },

  secret: function () {
    var _this = this;
    var list = ['公开', '私有'];
    wx.showActionSheet({
      itemList: list,
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex);
          _this.setData({
            secret: list[res.tapIndex]
          });
        }
      }
    });
  },

  //register userInfo
  bindChildNameInput: function (e) {
    this.childName = e.detail.value;
  },
  bindParentNameInput: function (e) {
    this.parentName = e.detail.value;
  },
  bindMobilePhoneNameInput: function (e) {
    this.mobilePhone = e.detail.value;
  },

  //class Seleceted
  bindClassOneSelected: function (e) {
    console.log("class one selection is:", e.detail.value);
    this.classOneSelected = e.detail.value;
  },
  bindClassTwoSelected: function (e) {
    console.log("class two selection is:", e.detail.value);
    
  },

  formSubmit: function (e) {
    console.log(e)
    var status = true;
    var self = this;
    if (!((self.classOneSelected || self.classTwoSelected) && self.childName && self.parentName && self.mobilePhone)){
      status = false;
      console.log("need more input info")
      var messageTip;
      if (!self.childName){
        messageTip="请输入小孩姓名"
      }
      else if (!self.parentName){
        messageTip = "请输入父母姓名"
      }
      else if (!self.mobilePhone) {
        messageTip = "请输入联系方式"
      }
      
      else if (!(self.classOneSelected || self.classTwoSelected) ){
        messageTip = "请至少选择一种课程"
      }

      wx.showToast({
        title: messageTip,
        icon: 'success',
        duration: 2000
      });
    }
    if (status) {
      wx.showToast({
        title: '报名成功',
        icon: 'success',
        duration: 2000
      });
      wx.showModal({
        title: '提交数据',
        content: 'e.detail.value',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            self.requestSaveData();
            wx.reLaunch({
              url: '/pages/all/all'
            });
          }
        }
      });
    } else {
      wx.showModal({
        title: '提交数据',
        content: '数据填写不完整',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            self.requestSaveData();
            wx.reLaunch({
              url: '/pages/all/all'
            });
          }
        }
      });
    }

  },
  requestSaveData: function () {
    var self = this;
    if (!getApp().globalData.userInfo) {
      getApp().getUserInfo();
    }
    if (!getApp().globalData.openId) {
      getApp().login();
    }
    console.log("request start");
    wx.request({
      url: 'http://localhost:8080/RegServer/SaveData',
      // url: 'http://imvivi.51vip.biz/RegServer/SaveData',
      data: {
        nickName: getApp().globalData.userInfo.nickName,
        openId: getApp().globalData.openId,
        childName: self.childName,
        parentName: self.parentName,
        mobilePhone: self.mobilePhone,
        className: self.className,
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("request success");
        console.log(res.data);
      },
      failed: function (e) {
        console.log("request failed");
      }
    });
  },
  onLoad: function (option) {
    console.log('query', option.id);
    this.setData({
      imageUrl: option.id,
      theme: option.theme
    });
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {

  }

});