

//1接收发送过来的搜索内容 显示在搜索栏
var url=new URLSearchParams(location.search);
var searContent=url.get('commodity');
// console.log(searContent);
$('.search_content input').val(searContent);

//2发送ajax请求数据渲染页面  连接前台数据接口(页面初始化)

//注意： 一定要通过域名打开！！！！！

$.ajax({
    type:"GET",
    url:"/product/queryProduct",
    data:{
        page:1,
        pageSize:8
    },
    success:function(msg){
        // console.log(msg);
        //渲染页面
        var html1=template('list_tpl1',msg);
        // console.log(html1);
        $('.list_content').html(html1);
    }
})

//注意：如果把开关放在函数中会导致每一次点击都将开关重置为false所以无法来回切换！！！！！！
var togPrice=false;

//点击价格进行升序降序排列
//思路总结：在点击函数外部设置开关控制升降序，每一次点击发送一次ajax请求，重新渲染页面  。
$('.search_nav li:nth-child(2)').click(function(){
    // alert('这都被你选中了');

    //改变箭头类名从而改变箭头方向   想通过类名来进行判断但是失败。。。。。    采用开关来控制
    // if($(this).children('a').children('span').eq(1).attr('class'=='fa fa-angle-down')){
    //     $(this).children('a').children('span').eq(1).removeClass('').addClass('fa fa-angle-up');        
    //     }else{
    //     $(this).children('a').children('span').eq(1).removeClass('').addClass('fa fa-angle-down');        
    //     }
    
    if(togPrice==false){
        //当togClass 值为false时改变类名从而改变样式
        $(this).children('a').children('span').eq(1).removeClass('fa-angle-down').addClass('fa-angle-up'); 
        $.ajax({
            type:"GET",
            url:"/product/queryProduct",
            data:{
                page:1,
                pageSize:8,
                price:2
            },
            success:function(msg){
                // console.log(msg);
                //渲染页面
                var html1=template('list_tpl1',msg);
                // console.log(html1);
                $('.list_content').html(html1);
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        })  
        togPrice=true;
    }else if(togPrice==true){
        $(this).children('a').children('span').eq(1).removeClass('fa-angle-up').addClass('fa-angle-down'); 
        $.ajax({
            type:"GET",
            url:"/product/queryProduct",
            data:{
                page:1,
                pageSize:8,
                price:1
            },
            success:function(msg){
                // console.log(msg);
                //渲染页面
                var html1=template('list_tpl1',msg);
                // console.log(html1);
                $('.list_content').html(html1);
            }
        })      
        togPrice=false;
    }
    
})

//点击购买跳转到商品详情页
$('.list_content').on('click','a',function(){
    // alert('我的妈呀')
    var proId=$(this).data('id');
    // console.log(proId);
    location.href='./detail.html?proId='+proId;
})
