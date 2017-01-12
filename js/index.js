$(document).ready(function() {

    /*使用单例模式，但没办法体现其优点，或者说我不知道优点在哪，
    又不清楚该使用哪一种模式。是否是因为只有在大一点的项目里，
    才会用到设计模式*/  

    
    /*更多产品  begin*/
    var hoverMore = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            var hm = this;
            hm.$more = $('#more');
            hm.$moreList = $('#more-list');

        },
        bind: function() {
            var hm = this;
            hm.$more.mouseover(function() {
                hm.over();
            });
            hm.$more.mouseleave(function() {
                hm.leave();
            });
        },
        over: function() {
            var hm = this;
            hm.$more.css({ "background": "#fff", "color": "#333" });
            hm.$moreList.css("display", "block");
        },
        leave: function() {
            var hm = this;
            hm.$moreList.css("display", "none");
            hm.$more.css({ "background": "#398bfb", "color": "#fff" });
        }
    }
    hoverMore.init();
    /*更多产品  end*/

    /*换肤  begin*/
    var changeSkin = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            var cs = this;
            cs.$btn = $('#change-skin')
            cs.$skin = $('#skin');
            cs.$selected = $('#selected');
        },
        bind: function() {
            var cs = this;
            cs.$btn.click(function() {
                cs.change();
            });
        },
        change: function() {
            var cs = this
            var $xz = parseInt(localStorage.getItem("selected-x"));
            var $yz = parseInt(localStorage.getItem("selected-y"));
            cs.$skin.animate({ 'height': '310px' });
            cs.$selected.css({ "left": $xz, "top": $yz });
        }
    }
    changeSkin.init();
    /*换肤  end*/

    /*收起 begin*/
    var close = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            var cl = this;
            cl.$btn = $('#close')
            cl.$header = $('.header');
            cl.$navs = $('.nav-left>a,.nav-left>span,.nav-right>a,.nav-right>div,#change-skin');
            cl.$button = $('button');
            cl.$logo = $('#logo');
        },
        bind: function() {
            cl = this;
            cl.$btn.click(function() {
                cl.up();
            });
        },
        up: function() {
            var cl = this;
            $("#skin").animate({ height: '0px' });
            var def = localStorage.getItem("src");
            if (def) {
                cl.$header.css("background", "rgba(0,0,0,0.5)")
                cl.$navs.css("color", "#fff");
                cl.$button.css({ "background": "#ccc", "color": "#333", "border-color": "#ccc" });
                cl.$logo.attr('src', "images/logo_white.png");

            } else {
                cl.$button.css({ "background": "#3385ff", "color": "#fff", "border-color": "#3385ff" });
                cl.$logo.attr('src', "images/bd_logo1.png");
                cl.$navs.css("color", "#333");
            }
        }
    }
    close.init();
    /*收起 end*/

    /*滑动改变透明度 begin*/
    var range = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            this.$box = $('#box');
            this.$bg = $('#bg');
            this.$ads = $('#ads');
            this.$text = $('#text');
            this.$btn = $('#change-skin');
            this.$doc = $(document);
        },
        bind: function() {
            var rg = this;
            rg.$btn.click(function() {
                rg.show();
            });
        },
        show: function() {
            var rg = this;
            var statu = false; //用于判断鼠标是否按下
            var ox = 0;
            var lx = 0;
            var left = 0;
            rg.$ads.mousedown(function(e) {
                lx = rg.$ads.offset().left; //获取x方向偏移值
                ox = e.pageX - left; //获取偏移前的x坐标
                statu = true;
                console.log(e.pageX);
            });
            rg.$doc.mouseup(function() {
                statu = false;
            });
            rg.$box.mousemove(function(e) {
                if (statu) { //当鼠标按下时，鼠标拖动，滑块滑动
                    left = e.pageX - ox; //获取x方向的偏移量
                    if (left < 0) {
                        left = 0;
                    }
                    if (left > 80) {
                        left = 80;
                    }
                    rg.$ads.css('left', left);
                    var opac = parseInt(left * 1.25) / 100;
                    var rgba = 'rgba(255,255,255,' + (1 - opac) + ')';
                    localStorage.setItem("rgba", rgba); //存储透明度
                    localStorage.setItem("left", left); //存储滑块偏移量
                    $('.content').css("background", rgba);
                    rg.$text.html(parseInt(left * 1.25) + '%');

                }
            });
        }
    }
    range.init();
    /*滑动改变透明度 end*/

    /*设置皮肤初始值 begin*/
    var defaultSet = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            var det = this;
            det.$doc=$(document);
            det.$pv=$('#pv');
            det.$ads=$('#ads');
            det.$text=$('#text');
            det.$body=$('body');
            det.$content=$('.content');
            det.$button=$("button");
            det.$logo=$("#logo");
            det.$header=$('.header');
            det.$navs=$('.nav-left>a,.nav-left>span,.nav-right>a,.nav-right>div');
            det.$changeSkin=$('#change-skin');
            det.$footer=$('.footer');
            det.$footerA=$('.footer>a');
        },
        bind: function(){
            var det = this;
           $(document).ready(function() {
                det.change();
            });
        },
        change: function() {
            var det =this;
            var def = localStorage.getItem("src");
            if (def) {
                det.$pv.attr("src", def);
                var srcBig = localStorage.getItem("srcBig");
                var rgba = localStorage.getItem("rgba");
                var left = localStorage.getItem("left");
                det.$ads.css("left", left + 'px');
                det.$text.html(parseInt(left * 1.25) + '%');
                det.$body.css("background-image", srcBig);
                det.$content.css("background", rgba);
                det.$button.css({ "background": "#ccc", "color": "#333", "border-color": "#ccc" });
                det.$logo.attr('src', "images/logo_white.png");
                det.$header.css("background", "rgba(0,0,0,0.1)")
                det.$navs.css("color", "#fff");
                det.$changeSkin.css("color", "#fff");
                det.$footer.css("color", "#fff");
                det.$footerA.css("color", "#fff");
            } else {
                noSkin.init();
            }
        }
    }
    defaultSet.init();
    /*设置皮肤初始值 end*/

    /*不使用皮肤 begin*/
    var noSkin = {
        init: function() {
            this.render();
            this.bind();
        },
        render: function() {
            var ns = this;
            ns.$btn=$("#no-skin");
            ns.$pv=$('#pv');
            ns.$logoP=$('#logo-perview');
            ns.$bgs=$('#bgs');
            ns.$noSkin=$('#no-skin');
            ns.$box=$('#box');
            ns.$selected=$("#selected");
            ns.$body=$("body");
            ns.$header=$('.header');
            ns.$footer=$('.footer');
            ns.$footerA=$('.footer>a');

        },
        bind: function() {
            var ns = this;
            ns.$btn.click(function() {
                ns.only();
            });
        },
        only: function() {
            var ns =this;
            ns.$pv.css("opacity", "0");
            ns.$logoP.attr("src", "images/logo-perview-de.png");
            ns.$bgs.css("display", "none");
            ns.$noSkin.css("display", "none");
            ns.$box.css("display", "none");
            localStorage.setItem("src", "");
            var x = localStorage.getItem("src");
            ns.$selected.css({ "left": "-100px", "top": "-100px" });
            ns.$body.css("background-image", "none");
            ns.$header.css("background", "#fff");
            ns.$footer.css("color", "#333");
            ns.$footerA.css("color", "#333");
        }
    }
    noSkin.init();
    /*不使用皮肤 end*/

    /*主体部分tab选项卡切换  begin*/
    var $titles = $(".content-list>li");
    var $mains = $(".content-main");

    $titles.each(function() {
        $(this).mousedown(function() {

            $titles.each(function() {
                $(this).attr("class", "");
            });
            $(this).attr("class", "content-selected");
            var x = $(this).index();
            var y = '.content>div:nth-of-type(' + (x + 1) + ')';
            $(".content-main").attr("id", "");
            $(y).attr("id", "main-selected");
        });
    });
    /*主体部分tab选项卡切换  end*/

    /*皮肤预览 begin*/
    $(".ski").each(function() {
        $(this).mouseover(function() {
            var imgsrc = $(this).attr("src");
            $('#pv').attr("src", imgsrc);
            $('#pv').css("opacity", "1");
            $('#logo-perview').attr("src", "images/logo-perview.png");
        })
    });
    var def = localStorage.getItem("src");
    $("#ski").mouseleave(function() {
        var def = localStorage.getItem("src");
        if (def) {
            $('#pv').attr("src", def);

        } else {
            noSkin.init();
        }

    });
    $(".ski").each(function() {
        $(this).click(function() {
            $('#bgs').css("display", "inline-block");
            $('#no-skin').css("display", "inline-block");
            $('#box').css("display", "inline-block");
            var imgsrc = $(this).attr("src");
            localStorage.setItem("src", imgsrc);
            var src = localStorage.getItem("src");
            var imgsrcBig = imgsrc.slice(0, -4);
            var bgimg = 'url(' + imgsrcBig + '-1.jpg)';
            localStorage.setItem("srcBig", bgimg);
            $('body').css("background-image", bgimg);
            $('.footer').css("color", "#fff");
            $('.footer>a').css("color", "#fff");
            console.log(imgsrcBig);
        });
    });
    $(".img-all").each(function() {
        $(this).click(function() {
            var $a = $(this).css("left");
            var $b = $(this).css("width");
            var $c = $(this).css("top");
            var $d = $(this).css("height");
            var $x = parseInt($a) + parseInt($b);
            var $y = parseInt($c) + parseInt($d);
            localStorage.setItem("selected-x", $x);
            localStorage.setItem("selected-y", $y);
            $('#selected').css({ "left": $x, "top": $y });
        });
    });
    /*皮肤预览 end*/   

});
