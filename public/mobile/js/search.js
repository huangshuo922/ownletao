
//获取历史记录
function getHistory() {
    var history = window.localStorage.getItem('History');
    // console.log(history);
    if (!history) {
        window.localStorage.setItem('History', "[]");
    }
    history = window.localStorage.getItem('History');
    var historyArr = JSON.parse(history);
    return historyArr;
}
var newHistory = getHistory();
// console.log(newHistory);
if (newHistory.length == 0) {
    $('.content_list').html("<li>没有搜索记录</li>");
} else {


    var json = { "json": newHistory }
    // console.dir(json)

    var html1 = template('search_tpl', json);
    // console.log(html);


    //页面渲染 

    $('.content_list').html(html1);
}


//给button添加点击事件

$('.search_content .btn').click(function () {

    var searchContent = $('.search_content input').val();
    // alert(searContent);
    if (searchContent.trim()) {
        //获取历史记录
        var newHistory = getHistory();
        //遍历数组 去重
        // console.log(newHistory);
        newHistory.forEach(function (item, index) {
            if (item == searchContent) {
                newHistory.splice(index, 1);
            }
        });
        // console.log(newHistory);
        newHistory.push(searchContent);

        window.localStorage.setItem('History', JSON.stringify(newHistory));

        // console.log(newHistory);
        var json1 = { "json1": newHistory };
        var html2 = template('search_tpl1', json1);
        //重新渲染页面

        $('.content_list').html(html2);
    } else {
        mui.alert('请输入内容');
    }

    //获取搜索内容同时跳转到搜索详情页
    var searchCon=$('.search_content input').val();
    // console.log(searchCon);

    location.href="./list.html?commodity="+searchCon;
    
})


//删除  给a标签添加点击事件

$('.content_list').on('click', 'a', function () {
    // alert('选中了');
    var del_obj = $(this).data();
    // console.log(del_obj);
    var delContent = del_obj.name;
    var newHistory = getHistory();
    //遍历数组 去重
    // console.log(newHistory);
    newHistory.forEach(function (item, index) {
        if (item == delContent) {
            newHistory.splice(index, 1);
        }
    }); 
    window.localStorage.setItem('History', JSON.stringify(newHistory));

    // console.log(newHistory);
    var json2 = { "json2": newHistory };
    var html3 = template('search_tpl2', json2);
    //重新渲染页面

    $('.content_list').html(html3);
    
    //判断当删除最后一条记录时 添加内容为没有搜索记录
    var secHistory=getHistory();
    console.log(secHistory.length);
    if(secHistory.length==0){
        $('.content_list').html("<li>没有搜索记录</li>");
    }
});

//清空历史记录 给右侧span标签添加点击事件
$('.delAll').click(function(){
    // alert('选中了')
    window.localStorage.removeItem('History');
    //重新渲染页面
    $('.content_list').html("<li>没有搜索记录</li>");


})
