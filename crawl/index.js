! function t(e, a, i) {
    function n(r, s) {
        if (!a[r]) {
            if (!e[r]) {
                var l = "function" == typeof require && require;
                if (!s && l) return l(r, !0);
                if (o) return o(r, !0);
                var c = new Error("Cannot find module '" + r + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var u = a[r] = {
                exports: {}
            };
            e[r][0].call(u.exports, function (t) {
                var a = e[r][1][t];
                return n(a || t)
            }, u, u.exports, t, e, a, i)
        }
        return a[r].exports
    }
    for (var o = "function" == typeof require && require, r = 0; r < i.length; r++) n(i[r]);
    return n
}({
    1: [function (t, e, a) {
        "use strict";
        a.__esModule = !0, a.Fixed = function (t, e) {
            var a = e.other,
                i = e.top,
                n = void 0 === i ? 0 : i,
                o = void 0,
                r = void 0,
                s = void 0;
            setTimeout(function () {
                var e = $(t).offset();
                void 0 !== e && (r = $(t).height(), s = e.top, $(window).bind("scroll", function (e) {
                    o = $("#footer").offset().top;
                    var i = a && $("#" + a).height() || 0,
                        l = $(this).scrollTop();
                    (!a || a && r < i) && l >= s ? o <= r + l ? $(t).css({
                        position: "absolute",
                        top: o - r - s - n
                    }) : $(t).css({
                        position: "fixed",
                        top: n
                    }) : $(t).css({
                        position: "relative",
                        top: 0
                    })
                }))
            }, 300)
        }
    }, {}],
    2: [function (t, e, a) {
        "use strict";

        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        a.__esModule = !0;
        var n = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i])
            }
            return t
        };
        a.Page = function () {
            function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                i(this, t), this.curPage = 1, this.total = 1;
                var a = {
                    threshold: 5,
                    isLink: !1,
                    linkTxt: "javascript:void(0);",
                    pageBack: !1
                };
                this.opt = n({}, a, e), this.bind()
            }
            return t.prototype.bind = function () {
                var t = this;
                $("#pageBox").delegate('[data-node="goPage"]', "click", function (e) {
                    var a = parseInt($(this).attr("data-data"));
                    t.opt.pageBack && t.opt.pageBack(a)
                }), $("#pageBox").delegate("#jumpPage", "keydown", function (e) {
                    if (13 == e.which) {
                        var a = parseInt($("#jumpPage").val());
                        if (a == t.curPage || a > t.total) return;
                        return t.opt.pageBack && t.opt.pageBack(a), !1
                    }
                })
            }, t.prototype.getPage = function (t, e, a, i, n) {
                var o;
                o = e == i ? "<li><span>" + e + "</span></li>" : '<li><a href="' + (n.isLink ? n.linkTxt + "_" + e + ".htm" : n.linkTxt) + '" data-data="' + e + '" data-node="goPage">' + e + "</a></li>", t.push(o), e < a && this.getPage(t, e + 1, a, i, n)
            }, t.prototype.buildPage = function (t, e) {
                this.curPage = t, this.total = e;
                var a = this.opt,
                    i = void 0,
                    n = void 0,
                    o = void 0,
                    r = [],
                    s = a.threshold;
                if (1 == e) return "";
                if (1 == t) i = "<li><span>1</span></li>";
                else {
                    var l = a.linkTxt,
                        c = a.linkTxt;
                    a.isLink && (l = a.linkTxt + "_" + (t - 1) + ".htm", c = a.linkTxt + ".htm"), i = '<li><a class="prev" data-data="' + (t - 1) + '" data-node="goPage" href="' + l + '">&lt;</a>\n                   </li><li><a data-data="1"  data-node="goPage" href="' + c + '">1</a></li>'
                }
                if (r.push(i), e > 2) {
                    if ((n = t <= s - 2 || t == s && t == e ? 2 : e > s && e - t + 1 < s ? e - s + 1 : t - Math.floor((s - 1) / 2)) > 2 && r.push('<li><a href="javascript:void(0);">...</a></li>'), t <= s - 2) o = Math.min(s, e - 1);
                    else {
                        var u = t + Math.floor(s / 2);
                        o = Math.min(u, e - 1)
                    }
                    this.getPage(r, n, o, t, a), e - o > 1 && r.push('<li><a href="javascript:void(0);">...</a></li>')
                }
                if (e > 1) {
                    if (e <= t) i = "<li><span>" + e + '</span></li>\n                      <li class="jump">跳到<input type="text" name="jumpPage" id="jumpPage" value="" />页</li>';
                    else {
                        var d = a.linkTxt,
                            h = a.linkTxt;
                        a.isLink && (d = a.linkTxt + "_" + (t + 1) + ".htm", h = a.linkTxt + "_" + e + ".htm"), i = '<li><a href="' + h + '" data-data="' + e + '" data-node="goPage">' + e + '</a></li>\n                      <li class="jump">跳到<input type="text" name="jumpPage" id="jumpPage" value="" />页</li>\n                      <li><a class="next" data-data="' + (t + 1) + '" data-node="goPage" href="' + d + '">&gt;</a></li>'
                    }
                    r.push(i)
                }
                return "<ul>" + r.join("") + "</ul>"
            }, t
        }()
    }, {}],
    3: [function (t, e, a) {
        "use strict";
        a.__esModule = !0, a.setCommRank = function (t, e, a) {
            $.ajax({
                url: "http://coral.qq.com/article/" + e + "/datetop?format=json&source=1",
                dataType: "jsonp"
            }).then(function (e) {
                if (e && e.data) {
                    var i = e.data,
                        n = void 0,
                        o = void 0,
                        r = [],
                        s = i.length;
                    if (s > 0) {
                        for (var l = 0; l < s; l++) n = '<li><a target="_blank" href="' + (o = i[l]).url + '" title="' + o.title + '"><span class="' + (l < 3 ? "top" : "") + '">' + (l + 1) + "</span>" + o.title + "</a></li>", r.push(n);
                        $("ul", t).html(r.join("")), $(t).show()
                    }
                    a && a(e.data)
                }
            })
        }
    }, {}],
    4: [function (t, e, a) {
        "use strict";
        ! function (t, e, a) {
            var i = document,
                n = i.getElementsByTagName("head")[0],
                o = i.createElement("script");
            a && o.setAttribute("charset", a), o.setAttribute("src", t), n.appendChild(o), o.onload = function () {
                e && e()
            }
        }("//mat1.gtimg.com/pingjs/ext2020/dc2017/dist/login/login.js", function (t) {
            $("#login .quickArea").eq(0).hover(function () {}, function () {})
        }), $(document).on("qqLogin", function (t, e) {
            window.userInfo = e, "undefined" != typeof registerCoralEvent && registerCoralEvent.publicLogined(e.uin, e.nick, e.Face)
        }), $(document).on("qqLoginOut", function () {
            "undefined" != typeof registerCoralEvent && registerCoralEvent.publicLogout()
        })
    }, {}],
    5: [function (t, e, a) {
        "use strict";
        var i = t("../util/boss");
        t("../common/login/login");
        var n = t("./js/buildList"),
            o = t("./js/calendar"),
            r = t("../common/commRank/main"),
            s = t("../common/Fixed"),
            l = {
                today: new Date,
                curPage: 1,
                total: 1,
                site: "news",
                cata: "all",
                cataNum: 5,
                mode: 1,
                date: "",
                page: 1,
                count: 60,
                isTitQuit: !1,
                footTop: 0
            },
            c = [{
                site: "news",
                url: "//news.qq.com/"
            }, {
                site: "ent",
                url: "//ent.qq.com/"
            }, {
                site: "sports",
                url: "//sports.qq.com/"
            }, {
                site: "finance",
                url: "//finance.qq.com/"
            }, {
                site: "tech",
                url: "//tech.qq.com/"
            }, {
                site: "games",
                url: "//games.qq.com/"
            }, {
                site: "auto",
                url: "//auto.qq.com/"
            }, {
                site: "fashion",
                url: "//fashion.qq.com/"
            }, {
                site: "edu",
                url: "//edu.qq.com/"
            }, {
                site: "house",
                url: "//house.qq.com/"
            }, {
                site: "ru",
                url: "//ru.qq.com/"
            }, {
                site: "foxue",
                url: "//foxue.qq.com/"
            }, {
                site: "dao",
                url: "//dao.qq.com/"
            }],
            u = function () {
                var t = l.site;
                t = "luxury" == t ? "fashion" : t;
                for (var e = 0, a = c.length; e < a; e++) c[e].site == t && ($("#logo").addClass(t).attr("href", c[e].url), "news" == t && $("#logo").after('<img class="sspLogo" src="http://mat1.gtimg.com/news/dc/logo/icon_logo_ssp.png" />'), $("." + t, "#siteNav").addClass("cur"))
            },
            d = function (t, e) {
                var a = new Date("2009/01/01"),
                    r = new o.GCalendar(document.getElementById("calendar"), t, e, function (t, e, a, o) {
                        (0, i.registerZone)({
                            bossId: "1408",
                            bossZone: "gd_time",
                            url: window.location.href
                        }, 1);
                        var r = e + "年" + a + "月" + o + "日";
                        $("#date").text(r), l.date = e + "-" + a + "-" + o, l.curPage = 1, (0, n.buildList)(l)
                    });
                r.limitStartDate = a, r.isStatic = !1, r.build()
            },
            h = function (t) {
                var e = l.site;
                $.ajax({
                    url: "//roll.news.qq.com/interface/cpccata.php",
                    data: {
                        site: e
                    },
                    dataType: "jsonp",
                    jsonpCallback: "cataback",
                    success: function (e) {
                        if (e && "0" === e.response.code && e.data) {
                            for (var a = ['<li><a href="javascript:;" class="cur" bosszone="gd_fenlei" data-data="all" data-node="item">全部</a></li>'], i = [], n = -1, o = e.data, r = Array.isArray(o), s = 0, o = r ? o : o[Symbol.iterator]();;) {
                                var l;
                                if (r) {
                                    if (s >= o.length) break;
                                    l = o[s++]
                                } else {
                                    if ((s = o.next()).done) break;
                                    l = s.value
                                }
                                var c = l,
                                    u = "";
                                ++n < t ? (u += '<li><a href="javascript:;" bosszone="gd_fenlei" data-data="' + c.e + '" data-node="item"' + (n == t - 1 ? ' class="last"' : "") + ">" + c.c + "</a></li>", a.push(u)) : (u = '<a href="javascript:;" bosszone="gd_fenlei" data-node="showMe" data-data="' + c.e + '">' + c.c + "</a>", i.push(u))
                            }
                            a = a.join(""), i.length > 1 && (a += '<li class="more"><a href="javascript:;">更多<em>﹀</em></a><div class="moreBox" data-node="more">' + i.join("") + "</div></li>"), $("#catalog").html(a).show()
                        }
                    }
                })
            },
            p = function () {
                $.ajax({
                    url: "//roll.news.qq.com/interface/cpcdate.php",
                    dataType: "jsonp",
                    jsonpCallback: "dateback"
                }).then(function (t) {
                    if (t && "0" === t.response.code && t.data && t.data.date) {
                        var e = void 0,
                            a = void 0,
                            i = void 0,
                            o = t.data.date.split(/[- :]/);
                        l.date = o[0] + "-" + o[1] + "-" + o[2], l.curPage = 1, (0, n.buildList)(l), e = o[0] + "年" + o[1] + "月" + o[2] + "日", $("#date").text(e), i = a = new Date(o[0], o[1] - 1, o[2]), d(a, i)
                    }
                }, function () {
                    var t = new Date,
                        e = t.getFullYear(),
                        a = t.getMonth() + 1,
                        i = t.getDate();
                    l.date = e + "-" + a + "-" + i, l.curPage = 1, (0, n.buildList)(l);
                    var o = e + "年" + a + "月" + i + "日";
                    $("#date").text(o), d(t, t)
                })
            },
            f = function () {
                var t = $("#checkWay a");
                1 == l.mode ? t.eq(0).addClass("cur") : 2 == l.mode && t.eq(1).addClass("cur")
            },
            g = function () {
                $("#catalog").delegate('[data-node="showMe"]', "click", function (t) {
                    l.cata = $(this).attr("data-data"), $("#catalog a").removeClass("cur");
                    var e = $(".last", "#catalog").replaceWith($(this).addClass("last cur").attr("data-node", "item"));
                    $('[data-node="more"]', "#catalog").prepend(e.attr("data-node", "showMe").removeClass("cur last")), l.curPage = 1, (0, n.buildList)(l)
                }), $("#catalog").delegate('[data-node="item"]', "click", function (t) {
                    $(this).hasClass("cur") || (l.cata = $(this).attr("data-data"), $("#catalog a").removeClass("cur"), $(this).addClass("cur"), l.curPage = 1, (0, n.buildList)(l))
                }), $("#checkWay").delegate("a", "click", function (t) {
                    if (!$(this).hasClass("cur")) {
                        var e = parseInt($(this).attr("data-data"));
                        $("#checkWay a").removeClass("cur"), $(this).addClass("cur"), l.mode = e, l.curPage = 1, (0, n.buildList)(l)
                    }
                }), $("#refresh").click(function (t) {
                    (0, n.buildList)(l)
                })
            };
        ! function () {
            var t = window.location.hostname.split(".")[0];
            l.site = "fashion" == t ? "luxury" : t, t = l.site, u(), p(), h(l.cataNum), f(), "games" == t && (t = "gamezone"), (0, r.setCommRank)("#commRank", t), g(), (0, s.Fixed)("#right", {
                top: 15,
                other: "listInfo"
            }), (0, s.Fixed)("#siteNav", {
                top: 15,
                other: "listInfo"
            })
        }()
    }, {
        "../common/Fixed": 1,
        "../common/commRank/main": 3,
        "../common/login/login": 4,
        "../util/boss": 9,
        "./js/buildList": 6,
        "./js/calendar": 7
    }],
    6: [function (t, e, a) {
        "use strict";
        a.__esModule = !0, a.buildList = void 0;
        var i = t("../../common/Page/main"),
            n = t("./refresh"),
            o = new i.Page({
                pageBack: function (t) {
                    r.curPage = t, u(r)
                }
            }),
            r = void 0,
            s = function (t) {
                t ? ($("#queryStatus").show(), $("#listInfo").hide(), $("#pageBox").hide()) : ($("#queryStatus").hide(), $("#listInfo").show(), $("#pageBox").show())
            },
            l = function (t) {
                for (var e = [], a = void 0, i = void 0, n = t, o = Array.isArray(n), r = 0, n = o ? n : n[Symbol.iterator]();;) {
                    var s;
                    if (o) {
                        if (r >= n.length) break;
                        s = n[r++]
                    } else {
                        if ((r = n.next()).done) break;
                        s = r.value
                    }
                    var l = s;
                    i = '<li class="clearfix' + ((a = l.img || !1) ? "" : " noPic") + '">\n                    ' + (a ? '<a target="_blank" class="pic" href="' + l.url + '"><img src="' + l.img + '" alt="' + l.title + '"></a>' : "") + '\n                        <div class="info">\n                            <h3><a target="_blank" href="' + l.url + '">' + l.title + '</a></h3>\n                            <div class="mark"><span>' + l.column + "</span></div>\n                            <p>" + l.time.substring(5, 7) + "月" + l.time.substring(8, 10) + "日" + l.time.substring(11) + "</p>\n                        </div>\n                    </li>", e.push(i)
                }
                return '<ul class="graphic">' + e.join("") + "</ul>"
            },
            c = function (t) {
                for (var e = [], a = t, i = Array.isArray(a), n = 0, a = i ? a : a[Symbol.iterator]();;) {
                    var o;
                    if (i) {
                        if (n >= a.length) break;
                        o = a[n++]
                    } else {
                        if ((n = a.next()).done) break;
                        o = n.value
                    }
                    var r = o,
                        s = '<li><a href="' + r.url + '" target="_blank">\n                <strong>[' + r.column + ']</strong>\n                <span class="txt">' + r.title + '</span>\n                <span class="time">' + r.time.substring(5, 7) + "月" + r.time.substring(8, 10) + "日" + r.time.substring(11) + "</span>\n            </a></li>";
                    e.push(s)
                }
                return '<ul class="titMode">' + e.join("") + "</ul>"
            },
            u = a.buildList = function t(e) {
                var a = r = e,
                    i = a.curPage,
                    u = a.site,
                    d = a.cata,
                    h = a.mode,
                    p = a.date;
                s(!0), d = "all" != d ? d : "", $.ajax({
                    url: "//roll.news.qq.com/interface/cpcroll.php",
                    data: {
                        site: u,
                        mode: h,
                        cata: d,
                        date: p,
                        page: i
                    },
                    jsonpCallback: "rollback",
                    dataType: "jsonp",
                    success: function (e) {
                        if (e && "0" === e.response.code && e.data) {
                            var a = e.data,
                                i = a.article_info,
                                u = "";
                            u = 2 == h ? l(i) : c(i), $("#listInfo").html(u), s();
                            var d = a.page || 1,
                                p = a.count || 1;
                            $("#pageBox").html(o.buildPage(d, p))
                        } else e && "2" === e.response.code && !e.data && ($("#listInfo").html('<div class="noData">该日期暂无文章，请查看其它频道或分类</div>'), $("#pageBox").html(""), s());
                        (0, n.initAuto)(r.mode, r.count, function () {
                            t(r)
                        })
                    }
                })
            }
    }, {
        "../../common/Page/main": 2,
        "./refresh": 8
    }],
    7: [function (t, e, a) {
        "use strict";
        a.__esModule = !0;
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };
        a.GCalendar = function (t, e, a, n) {
            var o;
            this.container = t, n && (this.callback = n), this.isStatic, this.isStaticTarget = "_self", this.isStaticPath, this.clientDate = e || new Date, this.startDate = a || new Date, this.limitStartDate = new Date(2004, 11, 1);
            var r = this,
                s = function (t) {
                    return document.getElementById(t)
                },
                l = function (t, e) {
                    var a = document.createElement(t.tag || "div"),
                        n = !!a.setAttribute;
                    for (var o in t) "tag" != o && "children" != o && "cn" != o && "html" != o && "style" != o && "function" != typeof t[o] && ("cls" == o ? a.className = t.cls : n ? a.setAttribute(o, t[o]) : a[o] = t[o]);
                    return t.html && (a.innerHTML = t.html),
                        function (t, e) {
                            function a(t, e, a) {
                                if (t && "string" == typeof a) return e = e || "", a = a || "", t.style[e] = a, t
                            }
                            if (e)
                                if ("string" == typeof e)
                                    for (var n, o = /\s?([a-z\-]*)\:\s?([^;]*);?/gi; null != (n = o.exec(e));) a(t, n[1], n[2]);
                                else if ("object" == (void 0 === e ? "undefined" : i(e)))
                                for (var r in e) a(t, r, e[r])
                        }(a, t.style), e && e.appendChild(a), a
                },
                c = function (t) {
                    var t = Math.random,
                        e = parseInt;
                    return Number(new Date).toString().substring(0, 9) + e(10 * t()) + e(10 * t())
                }(),
                u = this.clientDate,
                d = (u.getFullYear(), u.getMonth(), u.getDate(), this.startDate),
                h = d.getFullYear(),
                p = d.getMonth() + 1,
                f = d.getDate(),
                g = (new Date(h, p - 1, 1).getDay(), new Date(h, p, 0).getDate());
            this.cur_year = h, this.cur_month = p, this.cur_date = d.getDate(), this.weekDay = ["日", "一", "二", "三", "四", "五", "六"], this.build = function (t) {
                for (var e = new Date(h, p - 1, 1), a = e.getDay(), i = new Array(a > 0 ? a : 0), n = (new Date(h, p, 0).getDate(), new Array, 1); n <= g; n++) i.push(n);
                var o = this.parseCalendarHeader(),
                    r = this.parseCalendarWeekDay(),
                    s = this.parseCalendarDayList(i, e),
                    u = l({
                        id: "_CalendarHeader_" + c,
                        cls: "CalendarHead"
                    });
                u.appendChild(o);
                var d = l({
                    id: "_CalendarCon_" + c,
                    cls: "CalendarCon"
                });
                d.appendChild(r), d.appendChild(s), this.container.appendChild(u), this.container.appendChild(d), e = a = i = o = r = s = u = d = null
            }, this.updateDate = function (t) {
                if (0 != t) {
                    for (var e = new Date(this.cur_year, this.cur_month - 1 + t, 1), a = new Array(e.getDay() > 0 ? e.getDay() : 0), i = e.getFullYear(), n = e.getMonth() + 1, o = new Date(this.cur_year, this.cur_month + t, 0).getDate(), r = 1; r <= o; r++) a.push(r);
                    this.cur_year = i, this.cur_month = n;
                    var l = this.parseCalendarDayList(a, e);
                    s("_CalendarYear_").innerHTML = "<h3>" + i + "年" + n + "月</h3>", s("_CalendarDayList_" + c).innerHTML = "", s("_CalendarDayList_" + c).appendChild(l), e = o = a = l = null
                }
            }, this.replaceDate2isStaticPath = function (t, e, a) {
                var i = this.isStaticPath;
                return i = i.replace(/\$Y/g, t), i = i.replace(/\$M/g, e), i = i.replace(/\$D/g, a)
            }, this.parseCalendarHeader = function (t, e, a) {
                function i(t, e) {
                    return function () {
                        0 != b[t] && e.updateDate(b[t])
                    }
                }
                var n = l({
                        tag: "table"
                    }),
                    o = l({
                        tag: "tbody"
                    }),
                    s = l({
                        tag: "tr"
                    });
                s.setAttribute("valign", "top");
                for (var c, u, d, f = h + "年" + p + "月", g = ["&lt;&lt;", "&lt;", f, "&gt;", "&gt;&gt;"], m = ["上一年", "上一月", "", "下一月", "下一年"], v = ["btn", "btn", "", "btn", "btn"], b = [-12, -1, 0, 1, 12], y = 0; y < 5; y++)(c = l({
                    tag: "td"
                })).setAttribute("title", m[y]), u = "a", 2 == y && (u = "h3", c.setAttribute("id", "_CalendarYear_")), (d = l({
                    tag: u,
                    href: "javascript:void(0)"
                })).attachEvent ? d.attachEvent("onclick", i(y, r)) : d.addEventListener && d.addEventListener("click", i(y, r), !1), d.innerHTML = g[y], d.className = v[y], c.appendChild(d), s.appendChild(c);
                return o.appendChild(s), n.appendChild(o), o = s = f = c = u = d = null, n
            }, this.parseCalendarWeekDay = function () {
                for (var t, e, a = this.weekDay, i = l({
                        tag: "table",
                        class: "week"
                    }), n = l({
                        tag: "tbody"
                    }), o = l({
                        tag: "tr"
                    }), r = 0; r < a.length; r++) t = "", 0 == r && (t = "sunday"), r == a.length - 1 && (t = "saturday"), e = l({
                    tag: "th",
                    html: a[r],
                    cls: t
                }), o.appendChild(e);
                return n.appendChild(o), i.appendChild(n), a = t = n = o = e = null, i
            }, this.parseCalendarDayList = function (t, e) {
                function a(t, e, a, i) {
                    return function () {
                        var n = this;
                        o.className = "", n.className = "today", o = n, "function" == typeof i.callback && i.callback(n, t, e, a)
                    }
                }
                for (var i, n, s, u, d, g = t, m = e, v = 0, b = m.getFullYear(), y = m.getMonth() + 1, k = (m.getDay(), l({
                        id: "_CalendarDayList_" + c
                    })), x = l({
                        tag: "table"
                    }), $ = l({
                        tag: "tbody"
                    }), C = 0; C < 6; C++) {
                    i = l({
                        tag: "tr"
                    });
                    for (var D = 0; D < 7; D++) {
                        if (u = g[v++], n = l({
                                tag: "td"
                            }), u == f && this.cur_year == h && this.cur_month == p) s = l({
                            tag: "a",
                            html: this.cur_date,
                            href: "javascript:void(0);",
                            cls: "today"
                        }), this.isStatic || (s.attachEvent ? s.attachEvent("onclick", a(b, y < 10 ? "0" + y : y, u < 10 ? "0" + u : u, r)) : s.addEventListener && s.addEventListener("click", a(b, y < 10 ? "0" + y : y, u < 10 ? "0" + u : u, r), !1)), o = s;
                        else if (u)
                            if ((d = new Date(b, y - 1, u)) <= this.clientDate && d >= this.limitStartDate) {
                                var w = "javascript:void(0)";
                                w = this.isStatic ? this.replaceDate2isStaticPath(b, y < 10 ? "0" + y : y, u < 10 ? "0" + u : u) : "javascript:void(0);", s = l({
                                    tag: "a",
                                    html: u,
                                    href: w
                                }), this.isStatic || (s.attachEvent ? s.attachEvent("onclick", a(b, y < 10 ? "0" + y : y, u < 10 ? "0" + u : u, r)) : s.addEventListener && s.addEventListener("click", a(b, y < 10 ? "0" + y : y, u < 10 ? "0" + u : u, r), !1))
                            } else s = l({
                                tag: "span",
                                html: u
                            });
                        else s = l({
                            tag: ""
                        });
                        n.appendChild(s), i.appendChild(n)
                    }
                    $.appendChild(i)
                }
                return x.appendChild($), k.appendChild(x), k
            }, this.onclick = function (t) {
                console.log(t)
            }
        }
    }, {}],
    8: [function (t, e, a) {
        "use strict";
        a.__esModule = !0;
        var i = null,
            n = 60,
            o = 1,
            r = !1,
            s = !1,
            l = function t(e) {
                i && clearTimeout(i), i = setTimeout(function () {
                    --e >= 0 ? $('[data-node="count"]', "#autoRefresh").text(e) : (r && r(), e = n), t(e)
                }, 1e3)
            },
            c = function (t) {
                i && clearTimeout(i), $('[data-node="count"]', "#autoRefresh").text(t)
            };
        $("#autoRefresh").click(function (t) {
            $(this).hasClass("checked") ? (c(n), 1 == o && (s = !0)) : (1 == o && (s = !1), l(n)), $(this).toggleClass("checked")
        });
        a.initAuto = function (t, e, a) {
            n = e, o = t, r = a, c(e), 2 == t ? $("#autoRefresh").removeClass("checked") : s || ($("#autoRefresh").addClass("checked"), l(n))
        }
    }, {}],
    9: [function (t, e, a) {
        "use strict";
        a.__esModule = !0;
        var i = void 0,
            n = function () {
                void 0 !== i && i || (!(i = {}).exposure && (i.exposure = {}), !i.registerZone && (i.registerZone = {})), this.initExposure(), this.initRegister()
            };
        n.prototype = {
            constructor: n,
            initExposure: function () {
                var t = escape(location.href),
                    e = {
                        BossId: 1604,
                        Pwd: 0,
                        sOp: "",
                        iQQ: "",
                        site: location.host,
                        sBiz: "",
                        sUrl: t
                    };
                this.exposureData = $.extend(!0, e, i.exposure)
            },
            initRegister: function () {
                var t = location.href,
                    e = t.substring(7, t.indexOf(".qq.com")),
                    a = {
                        BossId: 1408,
                        Pwd: 0,
                        sOp: "",
                        sBiz: "qq.com",
                        iQQ: "",
                        site: e = e.substr(e.lastIndexOf(".") + 1),
                        sUrl: "",
                        sLocalUrl: escape(t)
                    };
                this.registerData = $.extend(!0, a, i.registerZone)
            },
            operate: function (t) {
                var e = [];
                for (var a in t) {
                    var i = a + "=" + t[a];
                    e.push(i)
                }
                var n = "http://btrace.qq.com/kvcollect?" + e.join("&") + "&ran=" + Math.random();
                new Image(1, 1).src = n
            },
            exposure: function (t, e) {
                var a = document.cookie.match(new RegExp("(^|)o_cookie=([^;]*)(;|$)")),
                    i = null == a ? "" : unescape(a[2]);
                this.exposureData.BossId = t, this.exposureData.sOp = e, this.exposureData.iQQ = i, this.exposureData.sBiz = arguments[2] || "", this.operate(this.exposureData)
            },
            registerZone: function (t, e) {
                var a = 4,
                    i = "",
                    n = "";
                if (void 0 === e) {
                    for (var o = window.event || t, r = o.srcElement || o.target; r && a-- > 0 && "A" != r.tagName && "BODY" != r.tagName;) r = r.parentNode;
                    if (!r) return;
                    if ("A" != r.tagName) return;
                    i = r.href;
                    for (var s = 9, l = r; s >= 0; s--, l = l.parentNode) {
                        if (l && l.attributes.bosszone) {
                            n = l.attributes.bosszone.nodeValue;
                            break
                        }
                        if ("BODY" == l.tagName) return
                    }
                    if (!n) return
                } else t.bossId && (this.registerData.BossId = t.bossId), n = t.bossZone, i = t.url || "";
                var c = document.cookie.match(new RegExp("(^|)o_cookie=([^;]*)(;|$)")),
                    u = null == c ? "" : unescape(c[2]);
                this.registerData.sOp = n, this.registerData.iQQ = u, this.registerData.sUrl = escape(i), this.operate(this.registerData)
            }
        };
        var o = new n;
        window.BOSS2 = o;
        var r = function () {
            o.registerZone()
        };
        document.addEventListener ? document.addEventListener("click", r, !1) : document.attachEvent ? document.attachEvent("onclick", r) : document.onclick = r;
        a.registerZone = function (t, e) {
            o.registerZone.call(o, t, e)
        }, a.exposure = function (t, e, a) {
            o.exposure.call(o, t, e, a)
        }
    }, {}]
}, {}, [5]);

/*------------Modifier: < jianminlu-PC3 > 2017-8-1 14:35:47------------*/

/*  |xGv00|1563e11b3a6a6c8de5caf43d2f66b188 */