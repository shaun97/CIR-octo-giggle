// $(function () {
    var Form={

        dufen_du_long:function (obj,du,tip,tip_obj,len) {
            var obj_val=$(obj).val();
            var obj_len=obj_val.length;

            // var len=$(obj).attr('maxlength');
            $(tip_obj).html("");
            if (/[^0-9.]/.test(obj_val)) {
                $(tip_obj).html('请输入数字！');

            }else {
                 if (obj_len==len||obj_len>len){
                     console.log(obj_val,du);
                     if ((obj_val>0||obj_val==0) && obj_val<du){
                         console.log(obj_val,du);
                     }else {
                         console.log('43646');
                         $(tip_obj).html(tip);
                     }
                 }

            }
        },


    };
    //坐标定位
    $("#locationSet").mouseover(function () {
        var locationSet = layer.tips('坐标定位', '#locationSet', { tips: 4, time: 800, tipsMore: true });
    });
    //切换sw/ns
    $("#location_form  b").unbind('click').bind('click', function () {
        if ($(this).hasClass('ns_sign')) {
            $(this).removeClass('ns_sign').addClass('sn_sign');
        } else if ($(this).hasClass('sn_sign')) {
            $(this).removeClass('sn_sign').addClass('ns_sign');
        } else if ($(this).hasClass('we_sign')) {
            $(this).removeClass('we_sign').addClass('ew_sign');
        } else {
            $(this).removeClass('ew_sign').addClass('we_sign');
        }
    });


// })