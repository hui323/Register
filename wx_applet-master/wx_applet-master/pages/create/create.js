Page({
    data: {
        optionList: [
            {
                icon: ''
            },
            {
                icon: ''
            }
        ],

        showAddBtn: 1,

        date: "2017-09-01",
        time: "12:01",

        voteType: ['单选', '多选，最多2项', '多选，无限制'],
        voteTypeIndex: 0,

        files: []


    },
    updateVoteType: function (){
        let _optionList = this.data.optionList;
        let _voteType = this.data.voteType;

        _voteType = [];

        _optionList.map(function (obj, i) {

            if (i === 0){
                _voteType.push('单选');
            }else {
                _voteType.push('多选，最多'+ (i + 1) +'项');
            }

            console.log(i)
            console.log(_voteType)

        })
        _voteType.push('多选，无限制');

        this.setData({voteType: _voteType});
        console.log(111)
    },
    showTopTips: function(){
        var that = this;
        this.setData({
            showTopTips: true
        });
        setTimeout(function(){
            that.setData({
                showTopTips: false
            });
        }, 3000);
    },
    bindVoteTypeChange: function (e){
        this.setData({
            voteTypeIndex: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    recordValue: function (e){
        let _optionList = this.data.optionList;
        let _index = e.target.dataset.index;
        let value = e.detail.value;
        _optionList[_index].value = value;

        this.setData({optionList: _optionList});

    },
    addOption: function (e){
        let _optionList = this.data.optionList;

        _optionList.push({icon: '/images/common/5.png'})
        this.setData({optionList: _optionList});

        // 选项大于15个后移除添加按钮
        if(_optionList.length >= 15) {
            this.setData({showAddBtn: 0});
        }

        // 更新投票选项
        this.updateVoteType();

    },
    delOption: function (e){
        let _index = e.target.dataset.index;
        let _optionList = this.data.optionList;

        _optionList.splice(_index, 1);

        this.setData({optionList: _optionList});

        // 更新投票选项
        this.updateVoteType();

    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            count: 1, // 最多可以选择的图片张数
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    }
});