// new1by1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,  //一个自增的序号
    copywriter:{
      title:"编辑团购接龙信息，分享回群！", //宣传导语文案
      textareaPlaceHolder:"请描述下这个团购", //团购的描述的默认文案
      storeName:"商品名称:", //商品名称label
      storeNamePlaceHolder: "请输入商品的名称、单位等", //商品名称输入框的默认文案
      storePrice:"单价(￥):",  //商品价格label
      storeNum:"可售数量:",  //商品数量label
      storeNumPlaceHolder:"如果不输入则代表无限", //商品数量输入框的默认文案
      addStore:"+ 添加商品",  //添加商品按钮文案
      endTime:"截止时间:", //截止时间label
      datePlaceHolder:"请选择日期",  
      timePlaceHolder:"请选择时间",  
    },
    buttons:{
      createBtn:{
        createOneByOne:"生成团购接龙",  //生成团购按钮文案
        createBtnEnable:1,  //生成团购按钮是否可用
      }
    },
    description:"", //团购的描述
    stores:[  //商品列表
    ],
    delIconDisplay:true, //删除icon是否显示
    endDate:"请选择日期", //截止日期
    endTime:"请选择时间"  //截止时间
  },
  /**
   * 绑定生成团购接龙按钮
   */
  createOnebyOneFn:function(){
    /*
    wx.request({
      url:"",
      method:"POST",
      data:{
        "description":this.data.description,
        "stores":this.data.stores
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    });
    */
    var _data = {
      "description":this.data.description,
      "stores":this.data.stores,
      "createTime":new Date()
    }
    console.info(_data);

    // 将数据放入缓存
    wx.setStorage({
      "key":"1189",
      "data":_data
    });

    wx.navigateTo({
      "url":"../onebyone/onebyone?id=1189"
    });
  },

  /**
   * 删除商品
   */
  deleteStoreFn:function(e){
    var _id = e.currentTarget.id;
    var _index = String(_id).match(/\d+/)[0];

    var _stores = this.data.stores;
    _stores.splice(_index,1);
    // delete _stores[_index];
    this.setData({
      stores: _stores
    });
    // 判断下按钮是否仍然是点亮状态
    this.blinkFn();

    // 如果删除到只有一个商品了，那么删除按钮隐藏
    console.warn(_stores.length);
    if(_stores.length == 1){
      this.setData({
        delIconDisplay:false
      });
    }else{
      this.setData({
        delIconDisplay:true
      });
    }
  },



  /**
   * 绑定添加商品按钮
   */
  addStoreFn:function (){
    // 将一个空的数组加入data中
    var _stores = this.data.stores;
    var _store = {};
    var _num = this.data.num;
    _store['num'] = _num;
    _store['name' + _num] = '';
    _store['price' + _num] = '';
    _store['number' + _num] = '';
    _stores.push(_store);
    this.setData({
      stores: _stores,
      // 加入完成，num自增
      num: Number(_num) + 1
    });

    // 将按钮置为不可用
    this.blinkFn();

    if(_stores.length == 1){
      this.setData({
        delIconDisplay:false
      });
    }else{
      this.setData({
        delIconDisplay:true
      });
    }
  },

  /**
   * 绑定文本框输入
   */
  inputFn:function(e){
    var _id = e.currentTarget.id;
    // 取到index
    // var _index = String(_id).match(/\d+/)[0];
    var _index = e.target.dataset.storeIndex;

    var _stores = this.data.stores;
    // 将新的数据覆盖旧的数据
    _stores[_index][_id] = e.detail.value;
    // 把新的数据对象替换掉旧的数据对象
    this.setData({
      stores:_stores
    });
    this.blinkFn();
  },

  /**
   * 绑定文本域输入
   */
  textareaFn:function(e){
    this.setData({
      description: e.detail.value
    });
    this.blinkFn();
  },

  /**
   * 判断按钮是否需要点亮
   */
  blinkFn:function(){
    var _flag = true;
    // 判断团购描述是否已写
    if(this.data.description !== ""){
      _flag = _flag & true;
    }else{
      _flag = _flag & false;
    }
    // 判断数据中的商品资料是否填写完整
    var _stores = this.data.stores;
    var _store,_num;
    if(_stores.length !== 0){
      for(var i = 0;i<_stores.length;i++){
        _store = _stores[i];

        // 根据num找到相应的key
        _num = _store['num'];

        if(_store['name'+_num] !== undefined && 
            _store['name'+_num] !== "" &&
            _store['price'+_num] !== undefined &&
            _store['price'+_num] !== ""
            ){
          _flag = _flag & true;
        }else{
          _flag = _flag & false;
        }

        if(!_flag){
          break;
        }
      }
    }
    // 控制按钮是否可用
    this.setData({
      buttons:{
        createBtn:{
          createOneByOne:"生成团购接龙",  //生成团购按钮文案
          createBtnEnable: !_flag,  //生成团购按钮是否可用
        }
      }
    })
  },

  /**
   * 日期选择框
   */
  bindDateChange:function(e){
    this.setData({
      "endDate":e.detail.value
    });
  },

  /**
   * 时间选择框
   */
  bindTimeChange:function(e){
    this.setData({
      "endTime":e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.addStoreFn();
  }
})