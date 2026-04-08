            k.addEventListener("pointerdown", (function (e) {
                var t = n;
                e.preventDefault(),
                    e.isTrusted && (ie(false),
                        null != Dn && 1 != e.pointerId || Nn || (Dn = e["pointerId"],
                            Te = Wn(e),
                            Je ? ($e.start = Te,
                                $e.end = $e.start) : (Ye = true,
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
                                            if (Ce.x == r.x && Ce.y == r.y || (Le = true),
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
                    if (e.isTrusted && (Te = Wn(e),
                        (Ve || Ze) && (ge = true),
                        e.pointerId == Dn && !Nn)) {
                        if (e.preventDefault(),
                            Je)
                            $e.end = Te;
                        else if (Ye) {
                            var r = e.clientX * devicePixelRatio - qe.start.x / at
                                , a = e.clientY * devicePixelRatio - qe.start.y / at;
                            qe.offset.x = Math.round(ze.offset.x + r),
                                qe.offset.y = Math.round(ze.offset.y + a),
                                tt.smoothpanning.checked && Rn(e)
                        }
                        ge = true
                    }
                }
                )),
                k.addEventListener("click", nn),
                k.addEventListener("wheel", (function (e) {
                    var t = n;
                    if (e.isTrusted && (ie(false),
                        !Ye)) {
                        if (e.preventDefault(),
                            e.ctrlKey)
                            it(rt - e.deltaY / 1e3, true);
                        else if (e.altKey)
                            1 == Math.sign(e.deltaY) ? mr(pe == fe[se.length - 1] ? fe[0] : fe[ve(pe) + 1]) : mr(pe == fe[0] ? fe[se.length - 1] : fe[ve(pe) - 1]);
                        else {
                            var r = e.deltaX
                                , a = e.deltaY;
                            e.shiftKey && (r ^= a,
                                r ^= a ^= r),
                                Mn(qe.offset.x - r, qe.offset.y - a)
                        }
                        ge = true
                    }
                }
                ), {
                    passive: false
                }),
                document.addEventListener("pointerup", (function (e) {
                    var t = n;
                    if (e.isTrusted && (e.preventDefault(),
                        e.pointerId == Dn && !Nn)) {
                        if (Je && $e.start && $e.end) {
                            var r = Math.min($e.start.x, $e.end.x)
                                , o = Math.min($e.start.y, $e.end.y)
                                , i = Math.max($e.start.x, $e.end.x)
                                , c = Math.max($e.start.y, $e.end.y);
                            if (Je = false,
                                $e = {},
                                m && Ze)
                                tn = true,
                                    a.send(Or({
                                        c: [r, o, i, c]
                                    }));
                            else {
                                var l = Ce.x
                                    , u = Ce.y;
                                Ce.x = r,
                                    Ce.y = o;
                                for (var s = "", d = "", f = false, v = false, h = o; h <= c; h++) {
                                    for (var y = r; y <= i; y++) {
                                        var g = rr();
                                        if (g) {
                                            g[0] == Z ? s += " " : s += g[0];
                                            var [p, b] = Zr(g[1]);
                                            tt.copycolour.checked && tt.copydecorations.checked ? d += String.fromCharCode(ue + g[1]) : tt.copycolour.checked ? d += String.fromCharCode(ue + p) : tt.copydecorations.checked && (d += String.fromCharCode(ue + Vr(0, b))),
                                                Qn(g[0], b) || (0 != b && (v = true),
                                                    0 != p && (f = true)),
                                                Ce.x++
                                        }
                                    }
                                    Ce.x = r,
                                        Ce.y++,
                                        s += "\n",
                                        d += "�"
                                }
                                s = s.slice(0, -1),
                                    d = d.slice(0, -1),
                                    s.startsWith("http") && (f = v = false),
                                    tt.copycolour.checked && f || tt.copydecorations.checked && v ? ar(s + Z + d) : ar(s),
                                    Ce.x = l,
                                    Ce.y = u,
                                    ir("Copied selection.", 1500);
                                var x = document.getElementById("copyico");
                                x.src = "/static/done.svg",
                                    setTimeout((function () {
                                        var e = t;
                                        x.src = "/static/copy.svg"
                                    }
                                    ), 1e3)
                            }
                        } else if (Dn = void 0,
                            Ye = false,
                            qe.start.x = null,
                            qe.start.y = null,
                            Mn(qe.offset.x, qe.offset.y),
                            tt.smoothpanning.checked) {
                            Rn(e);
                            var w = Ge.length - 1;
                            ((Qe = {
                                dx: Ge[0][0] - Ge[w][0],
                                dy: Ge[0][1] - Ge[w][1],
                                dt: Ge[0][2] - Ge[w][2]
                            }).dt > 90 || Math.abs(Qe.dx) < 5 && Math.abs(Qe.dy) < 5) && (Qe = null)
                        }
                        k.style.cursor = "text",
                            ge = true
                    }
                }
                )),
                document.addEventListener("pointerleave", Un),
                document.addEventListener("pointercancel", Un),
                i.addEventListener("input", (function (e) {
                    var t = n;
                    if (e.preventDefault(),
                        e.isTrusted) {
                        if ("insertLineBreak" != e.inputType)
                            return "deleteContentBackward" == e.inputType ? (Ce.x -= 1,
                                Vn(" ", 0, false, true) || (Ce.x += 1),
                                void nr()) : void (null != e.data && "" != e.data && "insertFromPaste" != e.inputType && (nr(),
                                    Array.from(e.data).length > 1 ? tr(e.data) : Vn(e.data, 1)));
                        cr()
                    }
                }
                )),
                
                i.addEventListener("keydown", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        switch (e.keyCode) {
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
                                Ce.x = Ce.start,
                                    nr(),
                                    ie(false),
                                    e.preventDefault();
                                break;
                            case 46:
                                Vn(" ", 0, false, true),
                                    nr(),
                                    e.preventDefault()
                        }
                        (!e.ctrlKey && !e.shiftKey && !e.altKey || 37 == e.keyCode || 38 == e.keyCode || 39 == e.keyCode || 40 == e.keyCode) && Hn()
                    }
                }
                )),
                undoWrite = function () {
                    var e = t;
                    if (0 != Be.length) {
                        var n = Be.shift();
                        Ce.x = n[0],
                            Ce.y = n[1];
                        var r = pe
                            , a = ce()
                            , o = Zr(n[3]);
                        pe = o[0],
                            window.color = pe,
                            le(o[1]),
                            Vn(n[2], 0, true) || Be.unshift(n),
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
                                    e.preventDefault());
                                break;
                            case 89:
                                e.ctrlKey && (function () {
                                    var e = r;
                                    if (0 != Fe.length) {
                                        var t = Fe.shift();
                                        Ce.x = t[0],
                                            Ce.y = t[1];
                                        var n = pe
                                            , a = ce()
                                            , o = Zr(t[3]);
                                        pe = o[0],
                                            window.color = pe,
                                            le(o[1]),
                                            Vn(t[2], 1, false) || Fe.unshift(t),
                                            pe = n,
                                            window.color = pe,
                                            le(a)
                                    }
                                }(),
                                    e.preventDefault());
                                break;
                            case 67:
                                e.altKey && or(e);
                                break;
                            case 71:
                                e.ctrlKey && (e.preventDefault(),
                                    dr());
                                break;
                            case 66:
                                e.ctrlKey && (e.preventDefault(),
                                    br("bold"),
                                    ie(true));
                                break;
                            case 73:
                                e.ctrlKey && (e.preventDefault(),
                                    br("italic"),
                                    ie(true));
                                break;
                            case 85:
                                e.ctrlKey && (e.preventDefault(),
                                    br("underline"),
                                    ie(true));
                                break;
                            case 83:
                                e.ctrlKey && (e.preventDefault(),
                                    br("strikethrough"),
                                    ie(true));
                                break;
                            case 18:
                                e.preventDefault();
                                break;
                            case 27:
                                Je && (Je = false,
                                    $e = {},
                                    k.style.cursor = "text",
                                    e.preventDefault()),
                                    M.classList.remove("open"),
                                    ie(false),
                                    nr();
                                break;
                            case 107:
                            case 187:
                                e.ctrlKey && (e.preventDefault(),
                                    it(rt + .1, true));
                                break;
                            case 109:
                            case 189:
                                e.ctrlKey && (e.preventDefault(),
                                    it(rt - .1, true))
                        }
                }
                )),
                i.addEventListener("paste", (function (e) {
                    var t = n;
                    e.isTrusted && tr((e.clipboardData || window.clipboardData).getData("text"))
                }
                )),
                i.addEventListener("copy", (function (e) {
                    var t = n
                        , r = rr();
                    if (r) {
                        ar(r[0]),
                            e.preventDefault(),
                            e.clipboardData || ir("Copied character.", 1e3);
                        var a = document.getElementById("copyico");
                        a.src = "/static/done.svg",
                            setTimeout((function () {
                                var e = t;
                                a.src = "/static/copy.svg"
                            }
                            ), 1e3),
                            i.focus()
                    }
                }
                )),
                Ke.addEventListener("click", (function () {
                    ir(We + " online", 3e3)
                }
                )),
                He.addEventListener("click", (function () {
                    var e = n;
                    history.pushState({}, null, o),
                        ar(location.protocol + "//" + location.host + o + "?x=" + Ce.x + "&y=" + -Ce.y),
                        ir("Copied link.", 1e3),
                        i.focus()
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
                    navigator.clipboard.readText().then((function (t) {
                        var n = e;
                        tr(t);
                        var r = document.getElementById("pasteico");
                        r.src = "/static/done.svg",
                            setTimeout((function () {
                                r.src = "/static/paste.svg"
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
                        , r = JSON.stringify(e.target.checked);
                    switch (e.target) {
                        case tt.showothercurs:
                            localStorage.setItem("showothercurs", r),
                                ge = true;
                            break;
                        case tt.shownametags:
                            localStorage.setItem("shownametags", r),
                                ge = true;
                            break;
                        case tt["showchat"]:
                            localStorage.setItem("showchat", r),
                                etarget.checked ? hn.classList.remove("hidden") : hn.classList.add("hidden");
                            break;
                        case tt.disablecolour:
                            localStorage.setItem("disablecolour", r),
                                nt.disableColour.checked || hr(tt.disablecolour.checked),
                                ge = true,
                                Sn();
                            break;
                        case tt.smoothpanning:
                            localStoragesetItem("smoothpanning", r),
                                ge = true;
                            break;
                        case tt.smoothcursors:
                            localStorage.setItem("smoothcursors", r);
                            break;
                        case tt.copycolour:
                            localStorage.setItem("copycolour", r);
                            break;
                        case tt.copydecorations:
                            localStorage.setItem("copydecorations", r);
                            break;
                        case tt.rainbow:
                            localStorage.setItem("rainbow", r);
                            break;
                        case tt.anonymous:
                            localStorage.setItem("anonymous", r),
                                Re = true,
                                ge = true;
                            break;
                        case tt.anonIdShow:
                            ge = true;
                            break;
                        case lt:
                            document.getElementById("login").style.display = "none",
                                document.getElementById("register").style.display = "block";
                            break;
                        case ut:
                            document.getElementById("login").style.display = "block",
                                document.getElementById("register").style.display = "none";
                            break;
                        case st:
                            dt(true)
                    }
                }
                )),
                document.getElementById("closeteleport").addEventListener("click", (function () {
                    var e = n;
                    M.classList.remove("open")
                }
                )),
                document.getElementById("tpwordgo").addEventListener("click", (function (e) {
                    var t = n;
                    e.preventDefault();
                    var r = document.getElementById("tpword");
                    vr(r.value),
                        r.blur()
                }
                )),
                document.getElementById("tpword").addEventListener("input", (function () {
                    var e = n
                        , t = document.getElementById("tpword").value.replace(/^\/|\/$/g, "")
                        , r = 0 == t || t.startsWith("~") ? {
                            x: 0,
                            y: 0
                        } : Lr(t);
                    document.getElementById("tpx").value = r.x,
                        document.getElementById("tpy").value = -r.y
                }
                )),
                document.getElementById("tpcoordgo").addEventListener("click", (function (e) {
                    var t = n;
                    e.preventDefault();
                    var r = document.getElementById("tpx")
                        , a = document.getElementById("tpy")
                        , i = parseInt(r.value, 10)
                        , c = parseInt(a.value, 10);
                    isNaN(i) && isNaN(c) || (0 !== i && (i = i || Ce.x),
                        0 !== c && (c = c || Ce.y),
                        Zn(i = Math.max(Math.min(i, Yt.maxx - 1), Yt.minx), c = Math.max(Math.min(-c, Yt.maxy - 1), Yt.miny)),
                        history.pushState({}, null, o),
                        M.classList.remove("open"),
                        r.blur(),
                        a.blur())
                }
                )),
                window.addEventListener("resize", kn),
                window.addEventListener("orientationchange", kn),
                window.addEventListener("popstate", (function () {
                    vr(Pr())
                }
                )),
                window.addEventListener("focus", (function () {
                    y = true,
                        En(),
                        Kr()
                }
                )),
                window.addEventListener("blur", (function () {
                    y = false,
                        En()
                }
                )),
                ot.addEventListener("input", ct),
                ot.addEventListener("change", ct),
                Se.addEventListener("message", (function (e) {
                    var t = n;
                    a && a.readyState == a.OPEN && a.send(e.data)
                }
                )),
                document.getElementById("chatbutton").addEventListener("click", (function () {
                    var e = n;
                    hn.classList.contains("open") ? hn.classList.remove("open") : (hn.classList.add("open"),
                        yn.classList.remove("show"),
                        gn())
                }
                )),
                document.getElementById("sendmsg").addEventListener("click", bn),
                document.getElementById("chatmsg").addEventListener("keyup", (function (e) {
                    13 == e.keyCode && bn(e)
                }
                )),
                document.getElementById("loginbtn").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document.getElementById("loginname")
                            , o = document.getElementById("loginpass");
                        mn.test(r.value) ? 0 != r.value.length ? 0 != o.value.length ? (vn(true),
                            a.send(Or({
                                login: [r.value, o.value]
                            }))) : ir("Please type your password.", 3e3) : ir("Please type your username.", 3e3) : ir("Username is invalid.", 3e3)
                    }
                }
                )),
                document.getElementById("registerbtn").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document.getElementById("username")
                            , o = document.getElementById("password")
                            , i = document.getElementById("password2");
                        mn.test(r.value) ? 0 != r.value.length ? 0 != o.value.length ? o.value == i.value ? (vn(true),
                            a.send(Or({
                                register: [r.value, o.value]
                            }))) : ir("Passwords do not match.", 3e3) : ir("Please type a password.", 3e3) : ir("Please type a username.", 3e3) : ir("Username is invalid.", 3e3)
                    }
                }
                )),
                document.getElementById("login").addEventListener("submit", fn),
                document.getElementById("register").addEventListener("submit", fn),
                document.getElementById("accsettinglink").addEventListener("click", (function () {
                    var e = n
                        , t = document.getElementById("accountsettings");
                    t.style.display = "block" == t.style.display ? "none" : "block",
                        document.getElementById("optionsmenu").scrollTop = t.clientHeight - 60
                }
                )),
                document.getElementById("changenameform").addEventListener("submit", fn),
                document.getElementById("submitnamechange").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document.getElementById("chngusername")
                            , o = document.getElementById("chngeusrpass");
                        mn.test(r.value) ? 0 != r.value.length ? je != r.value ? 0 != o.value.length ? (vn(true),
                            a.send(Or({
                                namechange: [r.value, o.value]
                            }))) : ir("Please type your password.", 3e3) : ir("You have typed in your current username.", 3e3) : ir("Please type a new username.", 3e3) : ir("Username is invalid.", 3e3)
                    }
                }
                )),
                document.getElementById("changepassform").addEventListener("submit", fn),
                document.getElementById("submitpasschange").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document.getElementById("oldpass")
                            , o = document.getElementById("newpass")
                            , i = document.getElementById("newpass2");
                        0 != r.value.length ? 0 != o.value.length ? 0 != i.value.length ? o.value == i.value ? (vn(true),
                            a.send(Or({
                                passchange: [r.value, o.value]
                            }))) : ir("New passwords do not match.", 3e3) : ir("Please type your new password again.", 3e3) : ir("Please type your new password.", 3e3) : ir("Please type your password.", 3e3)
                    }
                }
                )),
                document.getElementById("delaccountform").addEventListener("submit", fn),
                document.getElementById("deleteaccount").addEventListener("click", (function (e) {
                    var t = n;
                    if (e.isTrusted) {
                        var r = document.getElementById("deletepassword");
                        0 != r.value.length ? (vn(true),
                            a.send(Or({
                                deleteaccount: r.value
                            }))) : ir("Please type your password.", 3e3)
                    }
                }
                )),
                nt.protect.addEventListener("click", (function (e) {
                    Ve = e.target.checked,
                        ge = true
                }
                )),
                nt.clear.addEventListener("click", (function (e) {
                    var t = n;
                    Ze = e.target.checked,
                        ge = true
                }
                )),
                nt.readOnly.addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        ro: e.target.checked
                    }))
                }
                )),
                nt.private.addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        priv: e.target.checked
                    }))
                }
                )),
                nt.hideCursors.addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        ch: e.target.checked
                    }))
                }
                )),
                nt.disableChat.addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        dc: e.target.checked
                    }))
                }
                )),
                nt.disableColour.addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        dcl: e.target.checked
                    }))
                }
                )),
                nt.disableBraille.addEventListener("click", (function (e) {
                    var t = n;
                    a.send(Or({
                        db: e.target.checked
                    }))
                }
                )),
                document.getElementById("addmemberbtn").addEventListener("click", (function (e) {
                    var t = n;
                    e.preventDefault(),
                        document.getElementById("optionsmenu");
                    var r = document.getElementById("inputmember")
                        , o = document.getElementById("memberlist")
                        , i = r.value.toLowerCase();
                    r.value = "",
                        (i.length = function (e) {
                            for (var n = t, r = document.getElementById("memberlist"), a = 0; a < r.childElementCount; a++)
                                if (r.children[a].innerText == e)
                                    return true;
                            return false
                        }(i) || i == je) || (mn.test(i) ? o.childElementCount >= 20 ? ir("You cannot add more than 20 members.", 3e3) : a["send"](Or({
                            addmem: i
                        })) : ir("Username is invalid.", 3e3))
                }
                )),
                J.addEventListener("click", (function (e) {
                    var t = n
                        , r = document["getElementById"]("deletewallconfirm");
                    if (null == r) {
                        var o = document.createElement("br");
                        return e.target.parentNode.insertBefore(o, e.target.nextSibling),
                            (r = document.createElement("input")).type = "text",
                            r.placeholder = "type 'confirm' here",
                            r.maxLength = 7,
                            r.id = "deletewallconfirm",
                            o.parentNode.insertBefore(r, o.nextSibling),
                            void r.focus()
                    }
                    "confirm" == r.value.toLowerCase() ? (r.parentElement.removeChild(r.previousSibling),
                        r.parentNode.removeChild(r),
                        a.send(Or({
                            dw: 0
                        })),
                        Cn("textwall", "main"),
                        ir("Deleting wall...", 3e3)) : ir("Please type 'confirm' in the text box if you would like to delete your wall.", 3e3)
                }
                )),
                document.getElementById("l").addEventListener("click", (function (e) {
                    var t = n;
                    m && a.send(Or({
                        l: e.target.checked
                    }))
                }
                )),
                document.getElementById("refresh").addEventListener("click", (function () {
                    var e = n;
                    if (m) {
                        document.getElementById("admintable").innerHTML = "";
                        var t = false;
                        for (const n of Pe.keys())
                            dn(n),
                                t = true;
                        if (t) {
                            var r = document.getElementById("optionsmenu");
                            r.scrollTop = r.scrollHeight
                        }
                    }
                }
                )),
                document.getElementById("sendalert").addEventListener("click", (function () {
                    var e = n
                        , t = document.getElementById("alerttext").value;
                    m && 0 != t.length && a.send(Or({
                        alert: t
                    }))
                }
                )),
                document.getElementById("reload").addEventListener("click", (function () {
                    m && a.send(Or({
                        reload: true
                    }))
                }
                )),
                document.getElementById("delete").addEventListener("click", (function () {
                    var e = n;
                    if (m) {
                        var t = document.getElementById("deletename").value;
                        0 != t.length && a.send(Or({
                            aaa: t
                        }))
                    }
                }
                )),
                document.getElementById("free").addEventListener("click", (function () {
                    var e = n;
                    if (m) {
                        var t = document.getElementById("freename").value;
                        0 != t.length && a.send(Or({
                            aaaa: t
                        }))
                    }
                }
                )),
                b.setAttribute("id", "textarea"),
                i.setAttribute("id", "clipboard");
