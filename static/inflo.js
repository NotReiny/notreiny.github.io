class inflo {
    static isNum = /^(?<s>[+-])?(?:(?<i>\d+)(?:\.(?<f>\d*))?|\.(?<f2>\d+))(?:[Ee](?<es>[+-])?(?<e>\d+))?$/;
    static disPrec = 16n;
    static backup = 8n;
    static prec = inflo.disPrec + inflo.backup;
    static pow10 = 10n ** inflo.prec;
    static pow10_n = inflo.pow10 * 10n;
    constructor(inp) {
        const s = typeof inp === "string" ? inp : inp.toString();
        const ss = s.trim();
        const m = ss.match(inflo.isNum);
        if (!m) {
            throw new Error(`not a number: ${inp}`);
        }
        const g = m.groups;
        const sign = g.s === "-" ? -1n : 1n;
        const expSign = g.es === "-" ? -1n : 1n;
        this.e = 0n;
        // Fractional part as a string
        let fPart = g.f ?? g.f2 ?? "";
        // Combine integer and fraction into a single string without decimal point
        let digits = (g.i ?? "0") + fPart;
        digits = digits.replace(/^0+/, ""); // remove leading zeros
        this.man = BigInt(digits || 0);
        this.e = expSign * BigInt(g.e ?? 0) - BigInt(fPart.length);
        this.man *= sign;
        this.isz = false;
        this.__fix__();
    }
    // Improved Alignment in plus()
    plus(o) {
        let a = this.__copy__();
        let b = o instanceof inflo ? o : new inflo(o);
        if (a.isz) return b;
        if (b.isz) return a;
        // Work with copies to avoid mutating originals
        let arg1 = a;
        let arg2 = b;
        // Always make arg1 the one with the larger exponent
        if (arg2.e > arg1.e) {
            [arg1, arg2] = [arg2, arg1];
        }
        const diff = arg1.e - arg2.e;
        if (diff > inflo.prec + 2n) {
            // arg2 is so small it doesn't affect arg1 within our precision
            return arg1;
        }
        // Align arg2 to arg1's scale
        // Note: To maintain precision, we scale UP arg1 rather than scaling DOWN arg2
        arg1.man *= 10n ** diff;
        arg1.e -= diff;
        arg1.man += arg2.man;
        arg1.__fix__();
        return arg1;
    }
    minus(o) {
        // 1. Efficiently convert 'o' to an inflo instance
        let b = o instanceof inflo ? o : new inflo(o);
        // 2. A - B is the same as A + (-B)
        // This allows us to reuse the 'plus' logic entirely
        return this.plus(b.__negate__());
    }
    times(o) {
        let a = this.__copy__();
        let b = new inflo(o);
        b.man *= a.man;
        b.e += a.e;
        b.__fix__();
        return b;
    }
    divide(o) {
        let a = this.__copy__();
        let b = new inflo(o);
        if (b.isz) throw new Error("division by zero");
        a.man *= 10n ** (inflo.prec + 1n);
        a.man /= b.man;
        a.e -= inflo.prec + 1n;
        a.e -= b.e;
        a.__fix__();
        return a;
    }
    compare(o) {
        let b = o instanceof inflo ? o : new inflo(o);
        if (this.isz && b.isz) return 0;
        if (this.man > 0n && b.man <= 0n) return 1;
        if (this.man < 0n && b.man >= 0n) return -1;
        // Compare based on exponent and mantissa
        // Note: requires both to be normalized via __fix__
        if (this.e > b.e) return this.man > 0n ? 1 : -1;
        if (this.e < b.e) return this.man > 0n ? -1 : 1;
        return this.man > b.man ? 1 : (this.man < b.man ? -1 : 0);
    }
    toString() {
        if (this.isz) return "0";
        const s = this.man.toString();
        const g = (this.man < 0n) ? s.slice(1) : s;
        const r = this.e >= -inflo.prec && this.e < 0n
        const d = this.e < -inflo.prec && this.e >= -inflo.prec - inflo.disPrec
        const i = this.man < 0n ? "-" : ""
        const f = g.slice(Number(this.e + inflo.prec + 1n), Number(inflo.disPrec) + 1).replace(/0+$/, "")
        const v = g.slice(1, -Number(inflo.backup)).replace(/0+$/, "")
        // Random cluttered shit
        if (d) return `${i}0.${"0".repeat(Number(-this.e - inflo.prec) - 1)}${g.slice(0, Number(-inflo.backup) - 1).replace(/0+$/, "")}`
        if (r) return `${i}${g.slice(0, Number(this.e + inflo.prec) + 1)}${f === "" ? "" : "."}${f}`;
        return `${i}${g[0]}${v === "" ? "" : "."}${v}e${this.e + inflo.prec}`;
    }
    __copy__() {
        const x = Object.create(inflo.prototype);
        x.man = this.man;
        x.e = this.e;
        x.isz = this.isz;
        return x;
    }
    // Add this helper to the class to flip signs without re-parsing strings
    __negate__() {
        const x = this.__copy__();
        x.man = -x.man;
        // isz (is zero) doesn't change when negating
        return x;
    }
    __fix__() {
        if (this.man === 0n) {
            this.e = 0n;
            this.isz = true;
            return;
        }
        this.isz = false;
        let s = (this.man < 0n ? -this.man : this.man).toString();
        let targetLen = Number(inflo.prec) + 1;
        let diff = s.length - targetLen;
        if (diff > 0) {
            this.man /= 10n ** BigInt(diff);
            this.e += BigInt(diff);
        } else if (diff < 0) {
            this.man *= 10n ** BigInt(-diff);
            this.e -= BigInt(-diff);
        }
    }
}
