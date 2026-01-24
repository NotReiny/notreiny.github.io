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

        this.man = BigInt(digits);
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

    plus(b) {
        let a = new inflo(b);

        if (this.isz) return a;
        if (a.isz) return this;

        if (a.e > this.e) {
            a.man += this.man / 10n ** (a.e - this.e);
            a.__fix__();
            return a;
        } else {
            this.man += a.man / 10n ** (this.e - a.e);
            this.__fix__();
            return this;
        }
    }

    minus(b) {
        let a = new inflo(b);

        if (this.isz) return a.times(-1);
        if (a.isz) return this;

        if (a.e > this.e) {
            a.man -= this.man / 10n ** (a.e - this.e);
            a.__fix__();
            return a;
        } else {
            this.man -= a.man / 10n ** (this.e - a.e);
            this.__fix__();
            return this;
        }
    }

    times(b) {
        let a = new inflo(b);

        a.man *= this.man;
        a.e += this.e;
        a.__fix__();
        return a;
    }

    divide(b) {
        let a = new inflo(b);
        if (a.isz) throw new Error("divide by zero");

        this.man *= 10n ** (inflo.prec + 1n);
        this.man /= a.man;

        this.e -= inflo.prec + 1n;
        this.e -= a.e;
        this.__fix__();
        return this;
    }

    toString() {
        if (this.isz) return "0";
        const s = this.man.toString();
        const g = (this.man < 0n) ? s.slice(1) : s
        return `${this.man < 0n ? "-" : ""}${g[0]}.${g.slice(1, -Number(inflo.backup)).replace(/0+$/,"")}e${this.e+inflo.prec}`;
    }
}