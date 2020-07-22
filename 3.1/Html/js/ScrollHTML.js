
// 上滑显示，下滑隐藏
$(function ($) {
    var NowscrollTop = 0, PrescrollTop = 0;
    $(window).scroll(function () {
        NowscrollTop = $(this).scrollTop();

        // 当前NowscrollTop和之前的PrescrollTop对比
        // NowscrollTop变大了，表示向下滚动，否则，表示向上滚动
        if (PrescrollTop < NowscrollTop) {
            //下滚动
            try {
                $("#scrollSearchDiv_footer").slideUp();
                $("#scrollSearchDiv_taber").slideUp();
            } catch (e) {
                $("#scrollSearchDiv_footer").hide();
                $("#scrollSearchDiv_taber").hide();
            }
        } else {
            // 上滚动
            try {
                $("#scrollSearchDiv_footer").slideDown();
                $("#scrollSearchDiv_taber").slideDown();  
            } catch (e) {
                $("#scrollSearchDiv_footer").show();
                $("#scrollSearchDiv_taber").show();
            }

        }
        setTimeout(function () {
            PrescrollTop = NowscrollTop;
        }, 0);
    });

});

// 当滑动到第一个li(头部)才显示
// $(function ($) {             
//     $(window).bind("scroll", function () { 
//         var sTop = $(this).scrollTop(); 
//         var sTop = parseInt(sTop); 
//         if (sTop == 0) { 
//             if (!$("#scrollSearchDiv_footer").is(":visible")) { 
//                 try { 
//                     $("#scrollSearchDiv_footer").slideDown(); 
//                     $("#scrollSearchDiv_taber").slideDown(); 
//                 } catch (e) { 
//                     $("#scrollSearchDiv_footer").show(); 
//                     $("#scrollSearchDiv_taber").show(); 
//                 }                       
//             } 
//         } 
//         else { 
//             if ($("#scrollSearchDiv_footer").is(":visible")) { 
//                 try { 
//                     $("#scrollSearchDiv_footer").slideUp(); 
//                     $("#scrollSearchDiv_taber").slideUp(); 
//                 } catch (e) { 
//                     $("#scrollSearchDiv_footer").hide(); 
//                     $("#scrollSearchDiv_taber").hide(); 
//                 }                        
//             } 
//         }  
//     }); 
// })