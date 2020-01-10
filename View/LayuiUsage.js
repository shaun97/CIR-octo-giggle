(function () {
  //注意：导航/选项卡 依赖 element 模块，否则无法进行功能性操作
  layui.use('element', function () {
    var element = layui.element;

  });
  //弹框
  layui.use('layer', function () {
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句

    //触发事件
    var active = {

      test5: function () {
        $(".coordinate_parents").css({ display: 'block' });
        layer.open({
          title: '坐标定位',
          type: 1,
          skin: 'layui-layer-rim',
          area: ['320px', '250px'],
          content: $('#coordinate'),
          success: function (layero, index) {
            $(".layui-layer-rim").addClass("coordinate_parents");
            $(".layui-layer-shade").css({ height: 'auto', width: 'auto' });

            // 关闭弹框
            $(".blue_btn1").click(function () {
              layer.close(index);
            })
          }

        });
      }

    };
    $('.demo').on('click', function () {
      var type = $(this).data('type');
      active[type] ? active[type].call(this) : '';
    });
  });
  // Needed for checkbox 
  var element = null;
  var form = null;
  var layer = null;
  layui.use(['element', 'layer', 'form'], function () {
    element = layui.element;
    layer = layui.layer;
    form = layui.form;
    form.render();
  });
}());