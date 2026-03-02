function rawLiteral(e, seen = new WeakSet()) {
    if (typeof e === 'object' && e !== null) {
        if (seen.has(e)) return 'infinite nest';
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

            const prefix = e.constructor?.name !== 'Object'
                ? `${e.constructor.name} `
                : '';

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
