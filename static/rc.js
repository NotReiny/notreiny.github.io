window.reinyCommands = {};

let r = window.reinyCommands;
r.prefix = '$r';
r.commands = {};
r.running = false;

r.startBot = async function() {
    r.running = true;
    w.chat.send('started');
    w.on('msg', r.execute);
    while (r.running) {
        await delay(60)
    }
    w.off('msg', r.execute);
    r.running = false;
    w.chat.send('stopped')
}

r.execute = function(e) {
    try {
        if (e.msg.startsWith(`${r.prefix} `)) {
            const args = split2(e.msg.slice(r.prefix.length + 1));
            const args2 = args.slice(1);
            r.commands[args[0]](e.nick, ...args2)
        }
    } catch (e) {
        w.chat.send(`<start #f00>${e}<end>`)
    }
}

r.commands.test = function() {
    w.chat.send('Hello')
}

r.commands.js = function(e, t) {
    try {
        const i = rawLiteral(eval(t));
        w.chat.send(`${i.slice(0, 255)}${i.length >= 255 ? '…' : ''}`)
    } catch (e) {
        w.chat.send(`<start #f00>${e}<end>`)
    }
}

r.commands.gamble = function() {
    w.chat.send(`1/${1/Math.random()}`)
}

function rawLiteral(e, seen = new WeakSet()) {
    if (typeof e === 'object' && e !== null) {
        if (seen.has(e)) return 'self-referencing';
        seen.add(e);

        try {
            if (e instanceof RegExp) return e.toString();
            if (e instanceof Date) return `new Date(${e.getTime()})`;
            if (e instanceof Error) return e.stack || `${e.name}: ${e.message}`;

            if (Array.isArray(e)) {
                return `[${e.map(v => rawLiteral(v, seen)).join(', ')}]`;
            }

            if (e instanceof Map) {
                return `Map {${[...e.entries()]
                    .map(([k, v]) => `${rawLiteral(k, seen)} => ${rawLiteral(v, seen)}`)
                    .join(', ')}}`;
            }

            if (e instanceof Set) {
                return `Set {${[...e]
                    .map(v => rawLiteral(v, seen))
                    .join(', ')}}`;
            }

            const keys = Reflect.ownKeys(e);
            const props = keys.map(key =>
                `${String(key)}: ${rawLiteral(e[key], seen)}`
            );

            const prefix = e.constructor?.name !== 'Object' ?
                `${e.constructor.name} ` :
                '';

            return `${prefix}{${props.join(', ')}}`;

        } finally {
            seen.delete(e);
        }
    }

    if (typeof e === 'bigint') return `${e}n`;

    if (typeof e === 'string') {
        return `'${e
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/\t/g, '\\t')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/[\x00-\x1f\x7f-\x9f\ud800-\udfff]/g, ch => {
                const cp = ch.codePointAt(0);
                return `\\${cp < 256 ? 'x' : 'u'}${cp
                    .toString(16)
                    .padStart(cp < 256 ? 2 : 4, '0')}`;
            })}'`;
    }

    if (typeof e === 'symbol') {
        return `Symbol(${e.description ?? ''})`;
    }

    if (typeof e === 'function') {
        return e.toString().replace(/^function/, 'ƒ');
    }

    return String(e);
}


function split2(str) {
    if (typeof str !== 'string') throw TypeError('Value must be a string');

    const arr = [];
    let cur = '';
    let qte = false;

    for (let c = 0; c < str.length; c++) {
        const ch = str[c];

        if (ch === ' ' && !qte) {
            if (cur.length > 0) {
                arr.push(cur);
                cur = ''
            }
            continue
        }

        if (ch === '"') {
            qte = !qte;
            continue
        }

        if (ch === '\\') {
            if (c + 1 >= str.length) throw Error("Invalid escape at end of string");

            const next = str[++c];

            switch (next) {
                case 'n':
                    cur += '\n';
                    break;
                case 't':
                    cur += '\t';
                    break;
                case 'r':
                    cur += '\r';
                    break;
                case 'b':
                    cur += '\b';
                    break;
                case 'v':
                    cur += '\v';
                    break;
                case 'f':
                    cur += '\f';
                    break;
                case '\\':
                    cur += '\\';
                    break;
                case '"':
                    cur += '"';
                    break;
                default:
                    throw Error('Unknown escape')
            }
            continue
        }
        cur += ch
    }

    if (qte) throw Error('unterminated string');
    if (cur.length > 0) arr.push(cur);
    return arr
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}