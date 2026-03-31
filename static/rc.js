window.reinyCommands = {};

let r = window.reinyCommands;
r.prefix = '$r';
r.commands = {};
r.running = false;

r.startbot = async function() {
    r.running = true;
    console.log('started');
    w.on('msg', r.execute);
    while (r.running) {
        await delay(60)
    }
    w.off('msg', r.execute);
    r.running = false;
    console.log('stopped')
}

r.execute = function(e) {
    const args = split2(e.msg.slice(r.prefix.length + 1));
    console.log(`${e.nick} ~ ${e.msg}`);
    if (e.msg.startsWith(`${cmd} `)) {
        console.log(`${r.commands[args[0]]}`)
    }
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