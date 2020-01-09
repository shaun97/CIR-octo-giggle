(function () {
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