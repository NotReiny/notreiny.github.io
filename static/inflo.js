class inflo {
    static isNum = /^(?<s>[+-])?(?:(?<i>\d+)(?:\.(?<f>\d*))?|\.(?<f2>\d+))(?:[Ee](?<es>[+-])?(?<e>\d+))?$/;

    static disPrec = 16n;
    static backup = 4n;
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

    __fix__() {
        if (this.man === 0n) {
            // number is zero
            this.e = 0n;
            this.isz = true;
        } else {
            // Normalize: keep man within [scale, scale10)
            while (true) {
                const abs = this.man < 0n ? -this.man : this.man;

                if (abs >= inflo.pow10_n) {
                    this.man /= 10n;
                    this.e += 1n;
                } else if (abs < inflo.pow10) {
                    this.man *= 10n;
                    this.e -= 1n;
                } else {
                    break;
                }
            }
        }
    }

    plus(o) {
        let a = this.__copy__();
        let b = new inflo(o);

        if (a.isz) return b;
        if (b.isz) return a;

        a.man *= 10n;
        a.e -= 1n;

        b.man *= 10n;
        b.e -= 1n;

        if (b.e > a.e) {
            b.man += a.man / 10n ** (b.e - a.e);
            b.__fix__();
            return b;
        } else {
            a.man += b.man / 10n ** (a.e - b.e);
            a.__fix__();
            return a;
        }
    }

    minus(o) {
        let a = this.__copy__();
        let b = new inflo(o);

        if (a.isz) return b.times(-1);
        if (b.isz) return a;

        a.man *= 10n;
        a.e -= 1n;

        b.man *= 10n;
        b.e -= 1n;

        if (b.e > a.e) {
            b.man -= a.man / 10n ** (b.e - a.e);
            b.__fix__();
            return b;
        } else {
            a.man -= b.man / 10n ** (a.e - b.e);
            a.__fix__();
            return a;
        }
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

    toString() {
        if (this.isz) return "0";
        const s = this.man.toString();
        const g = (this.man < 0n) ? s.slice(1) : s;

        if (this.e >= -inflo.prec && this.e < 0n - inflo.backup) return `${this.man < 0n ? "-" : ""}${g.slice(0, Number(this.e+inflo.prec) + 1)}.${g.slice(Number(this.e + inflo.prec + 1n), Number(inflo.disPrec)).replace(/^0+/, "")}`;
        return `${this.man < 0n ? "-" : ""}${g[0]}.${g.slice(1, -Number(inflo.backup)).replace(/0+$/,"")}e${this.e+inflo.prec}`;
    }

    __copy__() {
        const x = Object.create(inflo.prototype);
        x.man = this.man;
        x.e = this.e;
        x.isz = this.isz;
        return x;
    }
}