function rawLiteral(e) {
    let prim;
    let ob;
    if (typeof e === 'object') {
        if (e === null) return 'null';
        if (e instanceof RegExp) return `${e}`;
        let g;
        if (e instanceof Array) {
            g = [];
            for (let i of e) {
                g.push(rawLiteral(i));
            }
            ob = `[${g.join(', ')}]`;
        } else if (e instanceof Map) {
            g = [];
            for (let [i, k] of e) {
                g.push(`${rawLiteral(i)} => ${rawLiteral(k)}`);
            }
            ob = `Map {${g.join(', ')}}`;
        } else if (e instanceof Set) {
            g = [];
            for (let i of e) {
                g.push(`${rawLiteral(i)}`);
            }
            ob = `Set {${g.join(', ')}}`;
        } else {
            g = [];
            for (let i in e) {
                g.push(`${i}: ${rawLiteral(e[i])}`);
            }
            ob = `{${g.join(', ')}}`;
        }
        return ob;
    }
    prim = typeof e === 'bigint' ? `${e}n` :
        typeof e === 'string' ? `'${e
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x1f\x7f-\x9f\ud800-\udfff]/g, (e) => {
        
        return `\\${e.codePointAt(0) < 256 ? 'x' : 'u'}${e.codePointAt(0).toString(16).padStart(e.codePointAt(0) < 256 ? 2 : 4, '0')}`;
    })}'` :
        typeof e === 'symbol' ? `Symbol(${e.description === undefined ? '' : e.description})` :
        typeof e === 'function' ? `${e}`.replace(/^function/, 'ƒ') : null;
    if (prim) return prim;
    return `${e}`;
}