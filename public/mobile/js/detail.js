//轮播图开始
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//动态渲染页面
var urlObj = new URLSearchParams(location.search);
var proId = urlObj.get('proId');
// console.log(proId);
$.ajax({
  url: '/product/queryProductDetail',
  type: 'GET',
  data: {
    id: proId,
  },
  success: function (msg) {
    console.log(msg);
    // console.log(msg.pic)
    var sizeArr = msg.size.split('-');
    var newSizeArr = [];
    for (var i = 0; i < sizeArr.length; i++) {
      newSizeArr.push(parseInt(sizeArr[i]));
    }
    msg.newSizeArr = newSizeArr;
    var html1 = template('detail-tpl1', msg);
    console.log(html1);
    $('.content').html(html1);
    
    var gallery = mui('.mui-slider');
    gallery.slider({
      interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    //初始化以后没有效果


    // mui 类比jq 中的$ 
    mui('.mui-numbox').numbox();
  }
})

//给尺码添加点击事件从而高亮

$('size ')

//分析：点击加入购物车后获取页面中尺码 商品ID 商品数量，并且进行页面跳转，跳转到购物车页，并传送数据 验证登录信息，没有登录跳转到登录页面

//1获取数据 给购物车按钮添加自定义属性
$('.add a').click(function(){
    $('.size span')
})