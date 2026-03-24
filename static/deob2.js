            k.addEventListener("pointerdown", (function (e) {
                var t = n;
                e.preventDefault(),
                    e.isTrusted && (ie(!1),
                        null != Dn && 1 != e.pointerId || Nn || (Dn = e["pointerId"],
                            Te = Wn(e),
                            Je ? ($e.start = Te,
                                $e.end = $e.start) : (Ye = !0,
                                    qe.start.x = e.clientX * v,
                                    qe.start.y = e.clientY * v,
                                    Ge = [],
                                    Qe = null,
                                    Rn(e),
                                    k.style.cursor = "move",
                                    function (e) {
                                        var n = t;
                                        if (e.pointerId == Dn) {
                                            nr();
                                            var r = Wn(e);
                                            if (Ce.x == r.x && Ce.y == r.y || (Le = !0),
                                                Ce.x = r.x,
                                                Ce.y = r.y,
                                                Ce.start = Ce.x,
                                                e.altKey) {
                                                var a = rr();
                                                a && (Qn(a[0], Zr(a[1])[1]) ? mr(0) : mr(Zr(a[1])[0]))
                                            }
                                            Hn()
                                        }
                                    }(e)),
                            ge = true))
            }
            )),
                k.addEventListener("contextmenu", (function (e) {
                    e.preventDefault(),
                        ie(true)
                }
                )),
                document.addEventListener("pointermove", (function (e) {
                    var t = n;
                    if (e[t(294)] && (Te = Wn(e),
                        (Ve || Ze) && (ge = !0),
                        e[t(426)] == Dn && !Nn)) {
                        if (e[t(423)](),
                            Je)
                            $e[t(571)] = Te;
                        else if (Ye) {
                            var r = e.clientX * devicePixelRatio - qe.start.x / at
                                , a = e[t(536)] * devicePixelRatio - qe[t(258)].y / at;
                            qe[t(440)].x = Math[t(433)](ze[t(440)].x + r),
                                qe[t(440)].y = Math[t(433)](ze[t(440)].y + a),
                                tt[t(358)][t(427)] && Rn(e)
                        }
                        ge = !0
                    }
                }
                )),
                k.addEventListener("click", nn),
                k.addEventListener("wheel", (function (e) {
                    var t = n;
                    if (e[t(294)] && (ie(!1),
                        !Ye)) {
                        if (e[t(423)](),
                            e[t(225)])
                            it(rt - e[t(700)] / 1e3, !0);
                        else if (e[t(272)])
                            1 == Math.sign(e[t(700)]) ? mr(pe == fe[se[t(500)] - 1] ? fe[0] : fe[ve(pe) + 1]) : mr(pe == fe[0] ? fe[se[t(500)] - 1] : fe[ve(pe) - 1]);
                        else {
                            var r = e.deltaX
                                , a = e[t(700)];
                            e.shiftKey && (r ^= a,
                                r ^= a ^= r),
                                Mn(qe[t(440)].x - r, qe.offset.y - a)
                        }
                        ge = !0
                    }
                }
                ), {
                    passive: !1
                }),
                document.addEventListener("pointerup", (function (e) {
                    var t = n;
                    if (e[t(294)] && (e[t(423)](),
                        e[t(426)] == Dn && !Nn)) {
                        if (Je && $e[t(258)] && $e[t(571)]) {
                            var r = Math.min($e.start.x, $e[t(571)].x)
                                , o = Math[t(678)]($e.start.y, $e[t(571)].y)
                                , i = Math[t(227)]($e.start.x, $e[t(571)].x)
                                , c = Math[t(227)]($e.start.y, $e[t(571)].y);
                            if (Je = !1,
                                $e = {},
                                m && Ze)
                                tn = !0,
                                    a[t(197)](Or({
                                        c: [r, o, i, c]
                                    }));
                            else {
                                var l = Ce.x
                                    , u = Ce.y;
                                Ce.x = r,
                                    Ce.y = o;
                                for (var s = "", d = "", f = !1, v = !1, h = o; h <= c; h++) {
                                    for (var y = r; y <= i; y++) {
                                        var g = rr();
                                        if (g) {
                                            g[0] == Z ? s += " " : s += g[0];
                                            var [p, b] = Zr(g[1]);
                                            tt[t(261)][t(427)] && tt[t(693)][t(427)] ? d += String[t(354)](ue + g[1]) : tt.copycolour[t(427)] ? d += String[t(354)](ue + p) : tt[t(693)].checked && (d += String[t(354)](ue + Vr(0, b))),
                                                Qn(g[0], b) || (0 != b && (v = !0),
                                                    0 != p && (f = !0)),
                                                Ce.x++
                                        }
                                    }
                                    Ce.x = r,
                                        Ce.y++,
                                        s += "\n",
                                        d += "ï¿½"
                                }
                                s = s[t(386)](0, -1),
                                    d = d[t(386)](0, -1),
                                    s[t(482)](t(379)) && (f = v = !1),
                                    tt[t(261)][t(427)] && f || tt[t(693)][t(427)] && v ? ar(s + Z + d) : ar(s),
                                    Ce.x = l,
                                    Ce.y = u,
                                    ir("Copied selection.", 1500);
                                var x = document[t(628)](t(420));
                                x.src = t(207),
                                    setTimeout((function () {
                                        var e = t;
                                        x[e(615)] = e(416)
                                    }
                                    ), 1e3)
                            }
                        } else if (Dn = void 0,
                            Ye = !1,
                            qe[t(258)].x = null,
                            qe[t(258)].y = null,
                            Mn(qe[t(440)].x, qe.offset.y),
                            tt.smoothpanning[t(427)]) {
                            Rn(e);
                            var w = Ge[t(500)] - 1;
                            ((Qe = {
                                dx: Ge[0][0] - Ge[w][0],
                                dy: Ge[0][1] - Ge[w][1],
                                dt: Ge[0][2] - Ge[w][2]
                            }).dt > 90 || Math.abs(Qe.dx) < 5 && Math[t(330)](Qe.dy) < 5) && (Qe = null)
                        }
                        k[t(270)][t(522)] = t(538),
                            ge = !0
                    }
                }
                )),
                document.addEventListener("pointerleave", Un),
                document.addEventListener("pointercancel", Un),
                i.addEventListener("input", (function (e) {
                    var t = n;
                    if (e.preventDefault(),
                        e[t(294)]) {
                        if (t(595) != e[t(448)])
                            return t(543) == e[t(448)] ? (Ce.x -= 1,
                                Vn(" ", 0, !1, !0) || (Ce.x += 1),
                                void nr()) : void (null != e[t(698)] && "" != e[t(698)] && t(321) != e[t(448)] && (nr(),
                                    Array[t(296)](e.data).length > 1 ? tr(e[t(698)]) : Vn(e[t(698)], 1)));
                        cr()
                    }
                }
                )),
                
                i.addEventListener("keydown", (function (e) {
                    var t = n;
                    if (e[t(294)]) {
                        switch (e[t(232)]) {
                            case 38:
                                window.w.moveCursor("up", 1);
                                e.preventDefault();
                                break;
                            case 40:
                                window.w.moveCursor("down", 1);
                                e.preventDefault();
                                break;
                            case 37:
                                window.w.moveCursor("left", 1);
                                e.preventDefault();
                                break;
                            case 39:
                                window.w.moveCursor("right", 1);
                                e.preventDefault();
                                break;
                            case 9:
                                window.w.moveCursor("right", 3);
                                e.preventDefault();
                                break;
                            case 36:
                                Ce.x = Ce[t(258)],
                                    nr(),
                                    ie(!1),
                                    e[t(423)]();
                                break;
                            case 46:
                                Vn(" ", 0, !1, !0),
                                    nr(),
                                    e[t(423)]()
                        }
                        (!e[t(225)] && !e[t(288)] && !e[t(272)] || 37 == e[t(232)] || 38 == e[t(232)] || 39 == e[t(232)] || 40 == e[t(232)]) && Hn()
                    }
                }
                )),
                undoWrite = function () {
                    var e = t;
                    if (0 != Be[e(500)]) {
                        var n = Be[e(564)]();
                        Ce.x = n[0],
                            Ce.y = n[1];
                        var r = pe
                            , a = ce()
                            , o = Zr(n[3]);
                        pe = o[0],
                            window.color = pe,
                            le(o[1]),
                            Vn(n[2], 0, !0) || Be.unshift(n),
                            pe = r,
                            window.color = pe,
                            le(a)
                    }
                },
                document.addEventListener("keydown", (function (e) {
                    var r = n;
                    if (e.isTrusted)
                        switch (e.keyCode) {
                            case 90:
                                e.ctrlKey && (undoWrite(),
                                    e[r(423)]());
                                break;
                            case 89:
                                e[r(225)] && (function () {
                                    var e = r;
                                    if (0 != Fe[e(500)]) {
                                        var t = Fe[e(564)]();
                                        Ce.x = t[0],
                                            Ce.y = t[1];
                                        var n = pe
                                            , a = ce()
                                            , o = Zr(t[3]);
                                        pe = o[0],
                                            window.color = pe,
                                            le(o[1]),
                                            Vn(t[2], 1, !1) || Fe[e(343)](t),
                                            pe = n,
                                            window.color = pe,
                                            le(a)
                                    }
                                }(),
                                    e[r(423)]());
                                break;
                            case 67:
                                e[r(272)] && or(e);
                                break;
                            case 71:
                                e[r(225)] && (e[r(423)](),
                                    dr());
                                break;
                            case 66:
                                e.ctrlKey && (e[r(423)](),
                                    br(r(583)),
                                    ie(!0));
                                break;
                            case 73:
                                e.ctrlKey && (e.preventDefault(),
                                    br("italic"),
                                    ie(!0));
                                break;
                            case 85:
                                e.ctrlKey && (e[r(423)](),
                                    br("underline"),
                                    ie(!0));
                                break;
                            case 83:
                                e[r(225)] && (e[r(423)](),
                                    br(r(468)),
                                    ie(!0));
                                break;
                            case 18:
                                e[r(423)]();
                                break;
                            case 27:
                                Je && (Je = !1,
                                    $e = {},
                                    k.style[r(522)] = "text",
                                    e[r(423)]()),
                                    M[r(676)][r(627)]("open"),
                                    ie(!1),
                                    nr();
                                break;
                            case 107:
                            case 187:
                                e[r(225)] && (e[r(423)](),
                                    it(rt + .1, !0));
                                break;
                            case 109:
                            case 189:
                                e[r(225)] && (e.preventDefault(),
                                    it(rt - .1, !0))
                        }
                }
                )),
                i.addEventListener("paste", (function (e) {
                    var t = n;
                    e[t(294)] && tr((e[t(573)] || window[t(573)]).getData(t(538)))
                }
                )),
                i.addEventListener("copy", (function (e) {
                    var t = n
                        , r = rr();
                    if (r) {
                        ar(r[0]),
                            e[t(423)](),
                            e[t(573)] || ir("Copied character.", 1e3);
                        var a = document[t(628)](t(420));
                        a[t(615)] = t(207),
                            setTimeout((function () {
                                var e = t;
                                a[e(615)] = e(416)
                            }
                            ), 1e3),
                            i[t(456)]()
                    }
                }
                )),
                Ke.addEventListener("click", (function () {
                    ir(We + " online", 3e3)
                }
                )),
                He.addEventListener("click", (function () {
                    var e = n;
                    history[e(308)]({}, null, o),
                        ar(location.protocol + "//" + location[e(653)] + o + "?x=" + Ce.x + e(465) + -Ce.y),
                        ir(e(400), 1e3),
                        i[e(456)]()
                }
                )),
                document.getElementById("closemenu").addEventListener("click", (function () {
                    ur(0)
                }
                )),
                document.getElementById("openmenu").addEventListener("click", (function () {
                    ur(1)
                }
                )),
                document.getElementById("options").addEventListener("click", (function () {
                    ur(2)
                }
                )),
                document.getElementById("home").addEventListener("click", (function () {
                    $n(),
                        Zn(0, 0)
                }
                )),
                document.getElementById("home").addEventListener("contextmenu", (function (e) {
                    var t = n;
                    e[t(423)](),
                        Cn(t(391), t(622)) && Zn(0, 0)
                }
                )),
                document.getElementById("copy").addEventListener("click", or),
                document.getElementById("paste").addEventListener("click", (function () {
                    var e = n;
                    navigator[e(345)][e(340)]()[e(413)]((function (t) {
                        var n = e;
                        tr(t);
                        var r = document.getElementById(n(326));
                        r.src = n(207),
                            setTimeout((function () {
                                r[n(615)] = "/static/paste.svg"
                            }
                            ), 1e3),
                            en()
                    }
                    ))
                }
                )),
                document.getElementById("theme").addEventListener("click", (function () {
                    yr()
                }
                )),
                B.addEventListener("input", gr),
                F.addEventListener("input", gr),
                P.addEventListener("change", (function (e) {
                    gr(e),
                        yr(2)
                }
                )),
                O.addEventListener("input", (function () {
                    vt(G)
                }
                )),
                R.addEventListener("input", (function () {
                    vt(G)
                }
                )),
                document.getElementById("goto").addEventListener("click", dr),
                x.addEventListener("click", (function (e) {
                    var t = n
                        , r = JSON[t(351)](e[t(510)][t(427)]);
                    switch (e.target) {
                        case tt[t(442)]:
                            localStorage[t(460)]("showothercurs", r),
                                ge = !0;
                            break;
                        case tt[t(567)]:
                            localStorage.setItem("shownametags", r),
                                ge = !0;
                            break;
                        case tt[t(613)]:
                            localStorage[t(460)](t(613), r),
                                e[t(510)][t(427)] ? hn[t(676)][t(627)]("hidden") : hn.classList[t(608)](t(692));
                            break;
                        case tt.disablecolour:
                            localStorage.setItem(t(577), r),
                                nt.disableColour[t(427)] || hr(tt[t(577)].checked),
                                ge = !0,
                                Sn();
                            break;
                        case tt[t(358)]:
                            localStorage[t(460)](t(358), r),
                                ge = !0;
                            break;
                        case tt[t(223)]:
                            localStorage[t(460)]("smoothcursors", r);
                            break;
                        case tt[t(261)]:
                            localStorage[t(460)](t(261), r);
                            break;
                        case tt[t(693)]:
                            localStorage[t(460)](t(693), r);
                            break;
                        case tt[t(598)]:
                            localStorage[t(460)](t(598), r);
                            break;
                        case tt.anonymous:
                            localStorage[t(460)]("anonymous", r),
                                Re = !0,
                                ge = !0;
                            break;
                        case tt.anonIdShow:
                            ge = true;
                            break;
                        case lt:
                            document[t(628)](t(680))[t(270)][t(550)] = t(507),
                                document[t(628)](t(459)).style.display = t(467);
                            break;
                        case ut:
                            document[t(628)]("login")[t(270)].display = t(467),
                                document[t(628)](t(459))[t(270)][t(550)] = t(507);
                            break;
                        case st:
                            dt(!0)
                    }
                }
                )),
                document.getElementById("closeteleport").addEventListener("click", (function () {
                    var e = n;
                    M.classList[e(627)](e(452))
                }
                )),
                document.getElementById("tpwordgo").addEventListener("click", (function (e) {
                    var t = n;
                    e[t(423)]();
                    var r = document[t(628)](t(314));
                    vr(r[t(356)]),
                        r.blur()
                }
                )),
                document.getElementById("tpword").addEventListener("input", (function () {
                    var e = n
                        , t = document[e(628)]("tpword").value[e(217)](/^\/|\/$/g, "")
                        , r = 0 == t || t[e(482)]("~") ? {
                            x: 0,
                            y: 0
                        } : Lr(t);
                    document[e(628)](e(342))[e(356)] = r.x,
                        document[e(628)](e(702))[e(356)] = -r.y
                }
                )),
                document.getElementById("tpcoordgo").addEventListener("click", (function (e) {
                    var t = n;
                    e[t(423)]();
                    var r = document[t(628)](t(342))
                        , a = document[t(628)]("tpy")
                        , i = parseInt(r[t(356)], 10)
                        , c = parseInt(a.value, 10);
                    isNaN(i) && isNaN(c) || (0 !== i && (i = i || Ce.x),
                        0 !== c && (c = c || Ce.y),
                        Zn(i = Math[t(227)](Math[t(678)](i, Yt.maxx - 1), Yt[t(319)]), c = Math[t(227)](Math[t(678)](-c, Yt[t(681)] - 1), Yt[t(374)])),
                        history[t(308)]({}, null, o),
                        M[t(676)][t(627)](t(452)),
                        r[t(334)](),
                        a[t(334)]())
                }
                )),
                window.addEventListener("resize", kn),
                window.addEventListener("orientationchange", kn),
                window.addEventListener("popstate", (function () {
                    vr(Pr())
                }
                )),
                window.addEventListener("focus", (function () {
                    y = !0,
                        En(),
                        Kr()
                }
                )),
                window.addEventListener("blur", (function () {
                    y = !1,
                        En()
                }
                )),
                ot.addEventListener("input", ct),
                ot.addEventListener("change", ct),
                Se.addEventListener("message", (function (e) {
                    var t = n;
                    a && a[t(348)] == a.OPEN && a[t(197)](e[t(698)])
                }
                )),
                document.getElementById("chatbutton").addEventListener("click", (function () {
                    var e = n;
                    hn[e(676)][e(551)](e(452)) ? hn[e(676)].remove(e(452)) : (hn[e(676)][e(608)](e(452)),
                        yn[e(676)][e(627)](e(259)),
                        gn())
                }
                )),
                document.getElementById("sendmsg").addEventListener("click", bn),
                document.getElementById("chatmsg").addEventListener("keyup", (function (e) {
                    13 == e[n(232)] && bn(e)
                }
                )),
                document.getElementById("loginbtn").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document[t(628)](t(268))
                            , o = document[t(628)](t(382));
                        mn.test(r[t(356)]) ? 0 != r.value.length ? 0 != o.value[t(500)] ? (vn(!0),
                            a.send(Or({
                                login: [r[t(356)], o[t(356)]]
                            }))) : ir("Please type your password.", 3e3) : ir(t(556), 3e3) : ir(t(287), 3e3)
                    }
                }
                )),
                document.getElementById("registerbtn").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document.getElementById("username")
                            , o = document[t(628)]("password")
                            , i = document[t(628)](t(580));
                        mn[t(674)](r[t(356)]) ? 0 != r.value.length ? 0 != o[t(356)][t(500)] ? o.value == i[t(356)] ? (vn(!0),
                            a[t(197)](Or({
                                register: [r[t(356)], o.value]
                            }))) : ir("Passwords do not match.", 3e3) : ir(t(488), 3e3) : ir(t(336), 3e3) : ir("Username is invalid.", 3e3)
                    }
                }
                )),
                document.getElementById("login").addEventListener("submit", fn),
                document.getElementById("register").addEventListener("submit", fn),
                document.getElementById("accsettinglink").addEventListener("click", (function () {
                    var e = n
                        , t = document[e(628)](e(542));
                    t[e(270)][e(550)] = e(467) == t[e(270)][e(550)] ? e(507) : e(467),
                        document.getElementById(e(605))[e(403)] = t[e(503)] - 60
                }
                )),
                document.getElementById("changenameform").addEventListener("submit", fn),
                document.getElementById("submitnamechange").addEventListener("click", (function (e) {
                    var t = n;
                    if (e[t(294)]) {
                        var r = document[t(628)]("chngusername")
                            , o = document[t(628)]("chngeusrpass");
                        mn[t(674)](r.value) ? 0 != r[t(356)][t(500)] ? je != r.value ? 0 != o[t(356)].length ? (vn(!0),
                            a[t(197)](Or({
                                namechange: [r.value, o.value]
                            }))) : ir("Please type your password.", 3e3) : ir(t(661), 3e3) : ir("Please type a new username.", 3e3) : ir(t(287), 3e3)
                    }
                }
                )),
                document.getElementById("changepassform").addEventListener("submit", fn),
                document.getElementById("submitpasschange").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document[t(628)](t(548))
                            , o = document[t(628)](t(424))
                            , i = document[t(628)](t(533));
                        0 != r[t(356)][t(500)] ? 0 != o[t(356)].length ? 0 != i[t(356)].length ? o.value == i[t(356)] ? (vn(!0),
                            a[t(197)](Or({
                                passchange: [r[t(356)], o[t(356)]]
                            }))) : ir(t(470), 3e3) : ir(t(309), 3e3) : ir(t(705), 3e3) : ir("Please type your password.", 3e3)
                    }
                }
                )),
                document.getElementById("delaccountform").addEventListener("submit", fn),
                document.getElementById("deleteaccount").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document[t(628)](t(637));
                        0 != r.value[t(500)] ? (vn(!0),
                            a.send(Or({
                                deleteaccount: r[t(356)]
                            }))) : ir(t(373), 3e3)
                    }
                }
                )),
                nt[n(708)].addEventListener("click", (function (e) {
                    Ve = e[n(510)].checked,
                        ge = !0
                }
                )),
                nt[n(222)].addEventListener("click", (function (e) {
                    var t = n;
                    Ze = e.target[t(427)],
                        ge = !0
                }
                )),
                nt[n(435)].addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        ro: e[t(510)][t(427)]
                    }))
                }
                )),
                nt.private.addEventListener("click", (function (e) {
                    var t = n;
                    a[t(197)](Or({
                        priv: e[t(510)][t(427)]
                    }))
                }
                )),
                nt[n(476)].addEventListener("click", (function (e) {
                    var t = n;
                    a[t(197)](Or({
                        ch: e.target[t(427)]
                    }))
                }
                )),
                nt.disableChat.addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        dc: e[t(510)][t(427)]
                    }))
                }
                )),
                nt[n(604)].addEventListener("click", (function (e) {
                    var t = n;
                    a[t(197)](Or({
                        dcl: e[t(510)].checked
                    }))
                }
                )),
                nt[n(363)].addEventListener("click", (function (e) {
                    var t = n;
                    a[t(197)](Or({
                        db: e[t(510)][t(427)]
                    }))
                }
                )),
                document.getElementById("addmemberbtn").addEventListener("click", (function (e) {
                    var t = n;
                    e[t(423)](),
                        document[t(628)](t(605));
                    var r = document[t(628)](t(478))
                        , o = document[t(628)](t(446))
                        , i = r.value.toLowerCase();
                    r[t(356)] = "",
                        (i.length = function (e) {
                            for (var n = t, r = document.getElementById("memberlist"), a = 0; a < r[n(625)]; a++)
                                if (r.children[a][n(537)] == e)
                                    return !0;
                            return !1
                        }(i) || i == je) || (mn[t(674)](i) ? o.childElementCount >= 20 ? ir(t(553), 3e3) : a[t(197)](Or({
                            addmem: i
                        })) : ir(t(287), 3e3))
                }
                )),
                J.addEventListener("click", (function (e) {
                    var t = n
                        , r = document[t(628)]("deletewallconfirm");
                    if (null == r) {
                        var o = document[t(581)]("br");
                        return e[t(510)][t(278)].insertBefore(o, e.target[t(364)]),
                            (r = document[t(581)](t(205))).type = t(538),
                            r[t(638)] = t(663),
                            r[t(529)] = 7,
                            r.id = t(253),
                            o.parentNode[t(496)](r, o[t(364)]),
                            void r.focus()
                    }
                    "confirm" == r[t(356)].toLowerCase() ? (r.parentElement[t(436)](r.previousSibling),
                        r.parentNode[t(436)](r),
                        a[t(197)](Or({
                            dw: 0
                        })),
                        Cn(t(391), t(622)),
                        ir("Deleting wall...", 3e3)) : ir(t(492), 3e3)
                }
                )),
                document.getElementById("l").addEventListener("click", (function (e) {
                    var t = n;
                    m && a[t(197)](Or({
                        l: e[t(510)][t(427)]
                    }))
                }
                )),
                document.getElementById("refresh").addEventListener("click", (function () {
                    var e = n;
                    if (m) {
                        document[e(628)](e(290))[e(230)] = "";
                        var t = !1;
                        for (const n of Pe[e(611)]())
                            dn(n),
                                t = !0;
                        if (t) {
                            var r = document.getElementById(e(605));
                            r[e(403)] = r[e(712)]
                        }
                    }
                }
                )),
                document.getElementById("sendalert").addEventListener("click", (function () {
                    var e = n
                        , t = document[e(628)]("alerttext")[e(356)];
                    m && 0 != t[e(500)] && a.send(Or({
                        alert: t
                    }))
                }
                )),
                document.getElementById("reload").addEventListener("click", (function () {
                    m && a[n(197)](Or({
                        reload: !0
                    }))
                }
                )),
                document.getElementById("delete").addEventListener("click", (function () {
                    var e = n;
                    if (m) {
                        var t = document[e(628)](e(188)).value;
                        0 != t[e(500)] && a[e(197)](Or({
                            aaa: t
                        }))
                    }
                }
                )),
                document.getElementById("free").addEventListener("click", (function () {
                    var e = n;
                    if (m) {
                        var t = document[e(628)](e(657))[e(356)];
                        0 != t[e(500)] && a[e(197)](Or({
                            aaaa: t
                        }))
                    }
                }
                )),
                b[n(388)]("id", n(525)),
                i.setAttribute("id", n(345));