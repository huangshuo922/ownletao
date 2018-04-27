$.ajax({
    url:"/category/queryTopCategory",
    data:null,
    type:"get",
    success:function(msg){
        // console.log(msg);
        var html1=template('cate_top1',msg);
        console.log(html1);
        $('.content_aside_ul').html(html1);
    }
})


//初次渲染页面发送ajax请求

$.ajax ({
    url:"/category/querySecondCategory",
    type:"get",
    data:{
        id:1
    },
    success:function(msg){
        // console.log(msg);
        //渲染页面
        var html=template('cate_top2',msg);
        // console.log(html);
        $('.content_right ul').html(html);
        $('.content_aside_ul li:first-child').addClass('content_aside_active');
    }
})



//获取当前选中栏ID 并发送ajax请求

$('.content_aside_ul').on('click','li',function(){
    // alert('我的吗呀');
    var id=$(this).data().id;
    // console.log(id);

    //改变类样式实现高亮
    $(this).parent().children().removeClass('content_aside_active');
    $(this).addClass('content_aside_active');

    $.ajax ({
        url:"/category/querySecondCategory",
        type:"get",
        data:{
            id:id
        },
        success:function(msg){
            // console.log(msg);
            //渲染页面
            var html=template('cate_top2',msg);
            // console.log(html);
            $('.content_right ul').html(html);
    
    
        }
    })
})

//左侧选中区域高亮
$('.content_aside_ul').on('click','li',function(){
    
    $(this).parent().children().removeClass('content_aside_active');
    $(this).addClass('content_aside_active');
})

//右侧下拉滚动的实现


mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

options = {
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
   }


$('#header .mui-icon-search').click(function(){
    // alert('我的天呐')
    location.href="./search.html";
})