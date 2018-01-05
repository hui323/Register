// onebyone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 获取url传过来的变量值
    var _id = options.id;

    that.loadOneByOneFn(_id);
    // 读取缓存中的数据
    wx.getStorage({
      key: _id,
      success: function(res) {
        that.setData({
          // "stores":res.data.stores,
          // "createTime":res.data.createTime,
          "description":res.data.description
        })
      }
    })

    // 获得登录者的头像
    wx.getUserInfo({
      success:function(msg){
        console.info(msg);
        that.setData({
          "createrUrl": msg.userInfo.avatarUrl,
          "createrNickName":msg.userInfo.nickName
        })
      }
    });

    this.initStorageFn();
  },

  /**
   * 传入团购的id号及用户的id号，捞取团购相关内容
   */
  loadOneByOneFn: function(onebyoneId, userId){
    // wx.request({
    //   url:"",
    //   data:{
    //     "onebyoneId" : onebyoneId,
    //     "userId" : userId
    //   },
    //   success:function(res){
    //     var _data = res.data;
        var _data = _json;
        this.setData(_data);
    //   }
    // });
  },

  initStorageFn: function(){
    var _stores = this.data.stores;
    
    wx.setStorage({
      "key":"stores",
      "data":_stores,
      "success":function(){
        console.log("订单数据已经放入本地");
      }
    });
  },

  /**
   * 增加按钮的点击事件
   */
  addNumFn:function(e){
    // 先确定商品的ID
    var _id = e.target.dataset.storeId;
    var _stores = this.data.stores;
    var _store;
    for(var i = 0;i < _stores.length;i++){
      _store = _stores[i];
      if(_store.storeId == _id){
        var _check = this.checkCanSaleFn(_store);

        // 查询可售数量
        if(_check == "false"){
          // 不可售，按钮变灰
          _store.addClass = "addNoCan";
        }else{
          if(_check == "criticality"){
            _store.addClass = "addNoCan";
          }

          _store.buy++;

          // 删除按钮变亮
          _store.delClass = "delCan";
        }

        // 计算总价
        var _totalPrice = this.totalPriceFn();

        // 更新数据
        this.setData({
          stores:_stores,
          totalPrice:_totalPrice,
          updateBtn:{
            "text":"修改订单",
            "disabled":false
          }
        });

        break;
      }
    }
  },

  /**
   * 增加按钮的点击事件
   */
  delNumFn:function(e){
    // 先确定商品的ID
    var _id = e.target.dataset.storeId;
    var _stores = this.data.stores;
    var _store;
    for(var i = 0;i < _stores.length;i++){
      _store = _stores[i];
      if(_store.storeId == _id){
        // 查询可减数量
        if(_store.buy !== "" && Number(_store.buy) > 0){
          _store.buy--;

          if(_store.buy == 0){
            _store.delClass = "delNoCan";
          }
          
          // 新增按钮变亮
          _store.addClass = "addCan";
        }

        // 计算总价
        var _totalPrice = this.totalPriceFn();

        // 更新数据
        this.setData({
          stores:_stores,
          totalPrice:_totalPrice,
          updateBtn:{
            "text":"修改订单",
            "disabled":false
          }
        });

        break;
      }
    }
  },

  /**
   * 计算当前总价
   */
  totalPriceFn:function(){
    // 获取商品列表
    var _stores = this.data.stores;

    var _totalPrice = 0.00;
    for(var i = 0;i < _stores.length;i++){
      
      _totalPrice += _stores[i].storePrice * _stores[i].buy;
      
    }

    return this.toDecimal2(_totalPrice) == false ? "0.00" : this.toDecimal2(_totalPrice) ;
  },

  /**
   * 查询当前商品是否可售
   */
  checkCanSaleFn:function(store){
    // 如果是无上限的，那么永久可售
    if(store.canSale.num == ""){
      return "true";
    }

    var _store = this.getStorageStoreById(store.storeId);

    // 查看订单当前的订货量
    var _initSaleNum = _store.buy;

    // 如果可售数量为0，则不可售
    if((store.canSale.num !== "" && Number(store.canSale.num) == 0) || (Number(store.canSale.num) < Number(store.buy) + 1 - _initSaleNum)){
      return "false";
    }else if(Number(store.canSale.num) == Number(store.buy) + 1 - _initSaleNum){ //如果可售数量
      return "criticality";
    }
    return "true";
  },

  /**
   * 获取本地存储中的某个id的商品
   */
  getStorageStoreById: function(id){
    try{
      var _stores = wx.getStorageSync("stores");

      if(_stores && _stores.length > 0){
        for (var i = 0; i < _stores.length; i++) {
          if(_stores[i].storeId == String(id)){
            return _stores[i];
          }
        }
      }
    }catch (e){

    }
  },

  /**
   * 提交更新按钮
   */
  updateFn:function(e){
    // 抓取团购的id和用户id，然后将整个data全部提交给后台

  },

  /**
   * 修改备注，则按钮点亮
   */
  inputFn:function(){
    this.setData({
      "updateBtn":{
        "text":'修改订单',
        "disabled":false
      }
    });
  },

  /**
   * 强制保留2位小数
   */
  toDecimal2:function (x) {    
    var f = parseFloat(x);    
    if (isNaN(f)) {    
        return false;    
    }    
    var f = Math.round(x*100)/100;    
    var s = f.toString();    
    var rs = s.indexOf('.');    
    if (rs < 0) {    
        rs = s.length;    
        s += '.';    
    }    
    while (s.length <= rs + 2) {    
        s += '0';    
    }    
    return s;    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      "totalPrice":"100"
    });
    wx.showToast({
      title: '上拉刷新'
    })
  }
});

var _json = {
    "userInfo": {}, //查看此页面的用户信息
    "isCreater":false,  //是否是创建者本人
    "onebyoneId":'1101',  //团购的ID号
    "createrUrl": '', //创建者的头像
    "createrNickName": 'Adrian',  //创建者的昵称
    "createTime": '2017-05-11 2:33pm',  //创建的时间
    "status": { //接龙的状态
      "text":"接龙中", //状态的文案，有『接龙中』和『已截止』2种
      "class":"green" //样式名，有『green』和『red』，接龙中是绿色，已截止是红色。
    },
    "description": '肉包子打狗', //接龙的描述，此描述是用户输入的。希望能够保留用户的回车换行符
    "stores": [ //商品的列表
      {
        "storeName": '肉包', //商品名称
        "storePrice": '10.00',  //商品的单价
        "storeId":"110",  //商品的ID
        "hasSale": {  //商品的库存量
          "text": "已售", //已售的文案
          "num": "4"  //已售的数量
        },
        "canSale": {  //可以销售量
          "text": "剩余", //可售的文案
          "num": "5" //可售的数量
        },
        "buy": '2', //此用户当前购买的数量，默认为0
        "addClass": 'addNoCan', //增加数量按钮样式，有『addNoCan』和『addCan』目前我是用CSS画的，我想换成jpg
        "delClass": 'delCan'  //删除数量按钮，有『delNoCan』和『delCan』同增加数量按钮
      },
      {
        "storeName": '烧卖',
        "storeId":'119',
        "storePrice": '10.00',
        "hasSale": {
          "text": "已售",
          "num": "6"
        },
        "canSale": {
          "text": "剩余",
          "num": "5"
        },
        "buy": '3',
        "addClass": 'addCan',
        "delClass": 'delNoCan'
      },
      {
        "storeName": '发糕',
        "storeId":'120',
        "storePrice": '10.00',
        "hasSale": {
          "text": "已售",
          "num": "6"
        },
        "canSale": {
          "text": "剩余",
          "num": ""
        },
        "buy": '3',
        "addClass": 'addCan',
        "delClass": 'delNoCan'
      }
    ],
    "customs": [  //团购人员列表
      {
        "customNo": '213',  //团购人的序号
        "customFace": 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqJze44VFYicicGLicHiaRibta4Xgp0lMutiaOVibrXXoHsFibHIicsqudN5OHiaj4LEYJbe4wI3BGZaiaPiaxzuw/0',  //参加团购人的头像,头像要保存到七牛上,应该是七牛的地址
        "customNickName": 'Adrian', //团购人的微信昵称
        "storeNameAndNum": [  //团购的内容
          {
            "storeName": '肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包',  //商品名称
            "number": '2' //购买的数量
          },
          {
            "storeName": '烧卖',
            "number": '4'
          }
        ],
        "customOthers": '天下雨了肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包肉包', //其他的备注
        "joinTime": '2017-05-11 2:33pm' //参加的时间,不是更新的时间.更新的时间后台如果可以的话,最好记录下
      },
      {
        "customNo": '1',
        "customFace": 'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqJze44VFYicicGLicHiaRibta4Xgp0lMutiaOVibrXXoHsFibHIicsqudN5OHiaj4LEYJbe4wI3BGZaiaPiaxzuw/0', "customNickName": 'Kuhn',
        "storeNameAndNum": [
          {
            "storeName": '肉包',
            "number": '2'
          },
          {
            "storeName": '烧卖',
            "number": '2'
          }
        ],
        "customOthers": '要冻的',
        "joinTime": '2017-05-11 2:33pm'
      }
    ],
    "stopBtn": {  //截止按钮,只有创建者可见
      "text": '截止', //按钮文案
      "display": '0'  //是否显示
    },
    "totalCustomerBtn": { //提取团购人的信息,可以无限次的提取,就算仍然在团购中也可以.
      "text": '导出报名信息', //按钮文案
      "display": '0'  //是否显示
    },
    "totalPrice": '￥99.00', //团购商品的总价
    "otherInput": 'nothing',  //备注信息,如果用户写了,再进来的时候,这里要回绑的.
    "updateBtn": {  //更新按钮,会更新此用户的信息，及其购买的数量等等，如果均为0，那就是放弃团购了。
      "text": '修改订单', //文案
      "disabled": true //是否可用
    }
  };