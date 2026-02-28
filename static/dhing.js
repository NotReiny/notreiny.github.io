function leRaw(e) {
    let prim;
    let ob;
    if (typeof e === 'object') {
        if (e instanceof Array) {
            ob = []
            for (let i of e) {
                ob.push(leRaw(i))
            }
            ob = `[${ob.join(", ")}]`
        } else if (e instanceof Object) {
            ob = {}
            for (let i in e) {
                ob[i] = leRaw(e[i])
            }
        }
        return ob;
    };
    prim = typeof e === 'bigint' ? `${e}n` :
        typeof e === 'string' ? `'${e.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'` :
        typeof e === 'symbol' ? `Symbol(${e.description === undefined ? '' : e.description})` :
        typeof e === 'function' ? `${e}`.replace(/^function/, 'ƒ') : null;
    if (prim) return prim; return `${e}`;
}
