// layui.use('tree', function () {
//   var tree = layui.tree;
//   //渲染

//   var inst1 = tree.render({
//       elem: '#ship-list'  //绑定元素
//       , showLine: false
//       , data: [{
//           title: '江西' //一级菜单
//           , children: [{
//               title: 'asd'
//               , id: 'home' //二级菜单
//               , children: [{
//                   title: '高新区' //三级菜单
//                   , title: '高新区' //三级菜单
//                   , title: '高新区' //三级菜单
//                   //…… //以此类推，可无限层级
//               }]
//           }]
//       }, {
//           title: '陕西' //一级菜单
//           , children: [{
//               title: '西安' //二级菜单
//           }]
//       }, {
//           title: '陕西' //一级菜单
//           , children: [{
//               title: '西安' //二级菜单
//           }]
//       }]
//   });
// });

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-icon-down");
  });
}