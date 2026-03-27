            window.requestAnimationFrame((function e() {
                var t = n
                    , r = Math.min(Math.ceil(performance.now() - wr), 100);
                if (wr = performance.now(),
                    (r < Mr || wr > kr) && (Mr = r,
                        kr = performance.now() + 1e3),
                    null != Qe) {
                    ge = true,
                        Mn(qe.offset.x + Qe.dx, qe.offset.y + Qe.dy, true),
                        0 == Qe.dx && 0 == Qe.dy && Mn(qe.offset.x, qe.offset.y);
                    for (var a = 0; a < r; a++)
                        Qe.dx *= .993,
                            Qe.dy *= .993;
                    Math.abs(Qe.dx) <= .3 && (Qe.dx = 0),
                        Math.abs(Qe.dy) <= .3 && (Qe.dy = 0),
                        0 == Qe.dy && 0 == Qe.dx && (Qe = null)
                }
                if (tt.smoothcursors.checked) {
                    Ce.rawx = xr(Ce.rawx, Ce.x, r),
                        Ce.rawy = xr(Ce.rawy, Ce.y, r);
                    var o = bt(20);
                    for (const e of Pe.values())
                        null == e.rawx || null == e.rawy || xt(e.l, o) || (e.rawx = xr(e.rawx, e.l[0], r),
                            e.rawy = xr(e.rawy, e.l[1], r))
                }
                if (0 != Ne.length) {
                    for (var c = 0; c < Ne.length; c++)
                        if (Ne[c][2] < .01)
                            Ne.splice(c, 1);
                        else
                            for (a = 0; a < r; a++)
                                Ne[c][2] *= .995;
                    ge = true
                }
                if (ge && (function () {
                    var e = t;
                    E.setTransform(1, 0, 0, 1, 0, 0),
                        E.fillStyle = A,
                        E.fillRect(0, 0, k.width, k.height),
                        E.translate(Math.ceil(qe.offset.x), Math.(qe.offset.y));
                    const r = 10 * v
                        , a = 20 * v
                        , o = Math.round(5 * v);
                    var i, c, l, u, s = bt(20), f = bt(d);
                    for (const t of we.keys())
                        xt(h = wt(t), s) ? xt(h, f) && delete we.get(t).img : pt(t, h);
                    if (tt.showothercurs.checked && (!nt.hideCursors.checked || m)) {
                        gt(E);
                        for (const t of Pe.values()) {
                            var h = t.l;
                            if (!xt(h, s)) {
                                var y = Math.round(10 * t.rawx * v)
                                    , g = Math.round(20 * t.rawy * v);
                                t.highlighted && (E.fillStyle = "rgba(239, 255, 71, 0.5)",
                                    E.fillRect(y - 2 * v, g - 2 * v, Math.ceil(r) + 4 * v, Math.round(a) + 4 * v));
                                var p = t.c;
                                var anonIdShow = document.getElementById('anonIdShow').checked;
                                tt.disablecolour.checked && (p = 0),
                                    0 == p && xe && (p = se.length),
                                    E.fillStyle = me[p],
                                    kt(y, g, r, a),
                                    !tt.shownametags.checked || (i = h,
                                        c = void 0,
                                        l = void 0,
                                        u = void 0,
                                        c = n,
                                        l = 20 * Math.floor(i[0] / 20) + "," + 10 * Math.floor(i[1] / 10),
                                        (u = we.get(l)) && u.protected && 0 == j) || Mt(t.n != "" || !anonIdShow ? t.n : `(0)`, y, g, o)
                            }
                        }
                    }
                    for (var b = 0; b < Ne.length; b++) {
                        0 == (p = Ne[b][3]) && xe && (p = se.length),
                            E.fillStyle = me[p].replace("0.2", Ne[b][2]);
                        var x = 10 * Ne[b][0] * v
                            , w = 20 * Ne[b][1] * v;
                        if (tt.showothercurs.checked && m) {
                            var M = Pe.get(Ne[b][4]);
                            null != M && M.highlighted && (E.lineWidth = 3 * v,
                                E.strokeStyle = p == se.length ? "#FFFFFF" : se[p],
                                E.beginPath(),
                                E.moveTo(Math.round(10 * M.rawx * v + r / 2), Math.round(20 * M.rawy * v + a)),
                                E.lineTo(Math.round(x + r / 2), Math.round(w + a)),
                                E.stroke())
                        }
                        E.fillRect(x, w, r, a)
                    }
                    var anonIdShow = document.getElementById('anonIdShow').checked;
                    if (E.fillStyle = be,
                        kt(y = Math.round(10 * Ce.rawx * v), g = Math.round(20 * Ce.rawy * v), r, a),
                        tt.shownametags.checked && (gt(E),
                            Mt((tt.anonymous.checked || je == "") && anonIdShow ? `(48773355)` : (tt.anonymous.checked ? "" : je), y, g, o)),
                        Je && $e.start && $e.end) {
                        E.fillStyle = "rgba(0,120,212,0.5)",
                            y = Math.round(10 * Math.min($e.start.x, $e.end.x) * v),
                            g = Math.round(20 * Math.min($e.start.y, $e.end.y) * v);
                        var S = Math.round(10 * Math.max($e.start.x, $e.end.x) * v - y + 10 * v)
                            , I = Math.round(20 * Math.max($e.start.y, $e.end.y) * v - g + 20 * v);
                        E.fillRect(y, g, S, I)
                    }
                    if (Ve || Ze) {
                        E.fillStyle = Ve && Ze ? "rgba(195,219,224,0.5)" : e(Ve ? 665 : 516);
                        var C = 20 * Math.floor(Te.x / 20)
                            , T = 10 * Math.floor(Te.y / 10);
                        E.fillRect(10 * C * v, 20 * T * v, 200 * v, 200 * v)
                    }
                }(),
                    ge = false,
                    "\n\n\n\n\n\n\n\n\n" != i.value && (i.value = "\n\n\n\n\n\n\n\n\n"),
                    i.selectionEnd = 4),
                    0 != Ee.size) {
                    for (var l = wr + (Mr - 2); ;) {
                        var u = ke.shift()
                            , s = Ee.get(u);
                        if (Ee.delete(u),
                            Xt(u, s),
                            0 == Ee.size || performance.now() >= l)
                            break
                    }
                    ge = true
                }
                window.requestAnimationFrame(e)
            }
            ))