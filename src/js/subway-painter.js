//ex 换乘标志
//rc 圆润拐弯
//st 有效站点
//iu 有效点?????
// (function() {
//     var script = document.createElement('script');
//     script.src = "http://cdn.bootcss.com/eruda/1.4.2/eruda.min.js";
//     document.body.appendChild(script);
//     script.onload = function() { eruda.init() }
// })();
function subwayPainter(l) {
    //地铁线路
    for (var i = 0; i < l.length; i++) {
        var { l_xmlattr, p } = l[i]
        var { lb, loop, uid } = l_xmlattr
        if (!uid) { //暂未开通
            break;
        }
        var dStr = ""; //地铁线路点
        var isLb = false; //是否圆润拐点
        for (var j = 0; j < p.length; j++) {
            var { x, y, lb, st, ex, rc } = p[j].p_xmlattr
            if (isLb) {
                isLb = false
                dStr += x + " " + y + " "
            } else {
                if (rc) {
                    isLb = true
                    dStr += "Q" + x + " " + y + " "
                } else {
                    if (j == 0) {
                        dStr += "M" + x + " " + y + " "
                    } else {
                        dStr += "L" + x + " " + y + " "
                    }
                    if (j == p.length - 1) {
                        if (loop) {
                            dStr += "Z"
                        }
                    }
                }
            }
        }
        var { lb, lc, lbx, lby } = l_xmlattr
        var path = $.svg('path').appendTo('#g-box')
        path.attr({
            d: $.trim(dStr),
            lb: lb
        }).css("stroke", "#" + lc.split("x")[1]);
        var text = $.svg('text').appendTo('#g-box').html(lb).addSvgClass("subway-name")
        text.attr({
            x: lbx - 10,
            y: lby + 15,
        }).css("fill", "#" + lc.split("x")[1]);
    }

    var repeatStr = "" //uid字符串判断重复点
    for (var i = 0; i < l.length; i++) {
        var { l_xmlattr, p } = l[i]
        if (!l_xmlattr.uid) { //暂未开通
            break;
        }
        for (var j = 0; j < p.length; j++) {
            var { x, y, rx, ry, lb, ex, rc, st, uid } = p[j].p_xmlattr
            if (st) {
                if (ex) {
                    if (!repeatStr.includes(uid)) {
                        var image = $.svg('image').appendTo('#g-box')
                        image.attr({
                            width: "20",
                            height: "20",
                            x: x - 10,
                            y: y - 10
                        });
                        image[0].href.baseVal = imgSrc;
                    }
                } else {
                    var ellipse = $.svg('ellipse').appendTo('#g-box')
                    ellipse.attr({
                        cx: x,
                        cy: y,
                        rx: "6.5",
                        ry: "6.5"
                    }).css("stroke", "#" + l_xmlattr.lc.split("x")[1]);
                }
                if (!repeatStr.includes(uid)) {
                    var text = $.svg('text').appendTo('#g-box').html(lb).addSvgClass("station-name")
                    text.attr({
                        x: x + rx + 2,
                        y: y + ry + 12,
                    });
                    repeatStr += uid
                }
            }
        }
    }
    window.panZoom = svgPanZoom('#mobile-svg', {
        zoomEnabled: true,
        controlIconsEnabled: false,
        fit: 1,
        center: 1,
        customEventsHandler: eventsHandler
    });
}

/**
 * 遇见问题及解决
 * 1.stroke color -->加“#”
 * 2.svg image标签路径赋值 -->image[0].href.baseVal = ;
 * 3.pc微信内置浏览器不显示-->es6兼容
 * 4.中转站存在text内容及image相同重叠问题 -->repeatStr.includs(uid)
 * 
 */