var avatars = [
	'http://img.huizecdn.com/test/avatar1.jpg',
	'http://img.huizecdn.com/test/avatar2.jpg',
	'http://img.huizecdn.com/test/avatar3.jpg'
];
var tplBanner = {
	'001': 'http://img.huizecdn.com/test/001.jpg',
	'002': 'http://img.huizecdn.com/test/002.jpg',
	'003': 'http://img.huizecdn.com/test/003.jpg',
	'004': 'http://img.huizecdn.com/test/004.jpg',
	'005': 'http://img.huizecdn.com/test/005.jpg',
	'006': 'http://img.huizecdn.com/test/006.jpg',
	'007': 'http://img.huizecdn.com/test/007.jpg',
};
var tpls = [{
	theme: '爬山，运动',
	banner: tplBanner['001'],
	number: '24'
}, {
	theme: '同学聚会',
	banner: tplBanner['002'],
	number: '33'
}, {
	theme: '同学聚会',
	banner: tplBanner['003'],
	number: '3'
}, {
	theme: '同学聚会',
	banner: tplBanner['004'],
	number: '40'
}, {
	theme: '同学聚会',
	banner: tplBanner['005'],
	number: '120'
}, {
	theme: '同学聚会',
	banner: tplBanner['006'],
	number: '10'
}, {
	theme: '同学聚会',
	banner: tplBanner['007'],
	number: '2'
}];
module.exports = {
	avatars: avatars,
	tplBanner: tplBanner,
	tpls: tpls,
	list: [{
		id: "001",
		name: '沙盘游戏',
		avatar: avatars[0],
		tel: '138XXXXXXXX',
		type: 'free',
		des: '沙盘亲子游戏，开始报名啦！',
    images: ['/image/adv1.jpg', '/image/adv3.jpg', '/image/adv4.jpg'],

		time: '2018-01-29',
    startTime: '2018-01-29',
    endTime: '2018-02-02',
    latitude: '22.615937',
    longitude: '113.864960',
		address: '广东深圳市宝安区西乡桃源居幼儿园',
		num: '20',
		like: '12'
	}
  /*, {
		id: "002",
		name: '唐僧',
		avatar: 'http://img.huizecdn.com/test/avatar2.jpg',
		tel: '13714412575',
		type: '￥130.00',
		des: '南山地区练习瑜伽',
		images: ['http://img.huizecdn.com/test/a2.jpg', 'http://img.huizecdn.com/test/b3.jpg'],
		time: '2016-11-01',
		startTime: '2016-11-01',
		endTime: '2016-12-10',
		latitude: '22.54677',
		longitude: '114.05938',
		address: '广东深圳南山区南油大',
		num: '20',
		like: '12'
	}, {
		id: "003",
		name: '秦时明月',
		avatar: 'http://img.huizecdn.com/test/avatar3.jpg',
		type: '￥50.00',
		des: '鹏程第一峰-深圳海拔第一高峰',
		images: ['http://img.huizecdn.com/test/avatar3.jpg', 'http://img.huizecdn.com/test/a3.jpg', 'http://img.huizecdn.com/test/a4.jpg'],
		time: '2016-11-01',
		startTime: '2016-11-01',
		endTime: '2016-12-10',
		latitude: '22.543058',
		longitude: '114.056099',
		address: '广东深圳龙岗区盐田区交界地区',
		num: '20',
		like: '12'
	}*/
  ]
};