class inflo {
    static isNum = /^(?<s>[+-])?(?:(?<i>\d+)(?:\.(?<f>\d*))?|\.(?<f2>\d+))(?:[Ee](?<es>[+-])?(?<e>\d+))?$/;
    static prec = 21n;
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
    sqrt() {
        if (this.isz) return new inflo(0);
        if (this.man < 0n) throw new Error("not a number");
        let a = this.__copy__();
        let old_a = new inflo(0);
        a.e = (a.e + inflo.prec) / 2n - inflo.prec;
        while (a.compare(old_a)) {
            old_a = a;
            a = (new inflo(1).divide(2)).times(a.plus(this.divide(a)));
        }
        return a;
    }
    ePow() {
        if (this.isz) return new inflo(1);
        let v = this.__copy__();
        let a = this.__copy__().plus(1);
        let b = new inflo(1);
        let z = this.__copy__();
        let old_a = new inflo(0);
        let j = new inflo(2);
        while (a.compare(old_a)) {
            z = z.times(v); // z^2, z^3, z^4, ...
            b = new inflo(b).times(j); // 2, 6, 24, 120, 720, ...
            old_a = a;
            a = a.plus(z.divide(b));
            j = j.plus(1);
        }
        return a;
    }
    toString() {
        if (this.isz) return "0";
        // 1. Get the absolute mantissa and the sign
        let s = (this.man < 0n ? -this.man : this.man).toString();
        const sign = this.man < 0n ? "-" : "";
        // 2. Calculate the 'true' exponent 
        // Since __fix__ ensures s.length is always prec + 1 (e.g., 25 digits),
        // the value is (mantissa / 10^prec) * 10^e
        // True Exponent = e + (s.length - 1)
        const trueExp = Number(this.e) + s.length - 1;
        // 3. Remove trailing zeros for a cleaner look
        s = s.replace(/0+$/, "");
        // 4. Determine format: Fixed vs Scientific
        // Use Fixed if exponent is reasonably small (e.g., between -6 and 15)
        if (trueExp > -7 && trueExp < 21) {
            if (trueExp >= 0) {
                // Number >= 1 (e.g., 123.45)
                const intPart = s.slice(0, trueExp + 1).padEnd(trueExp + 1, "0");
                const fracPart = s.slice(trueExp + 1);
                return `${sign}${intPart}${fracPart ? "." + fracPart : ""}`;
            } else {
                // Number < 1 (e.g., 0.00123)
                const leadingZeros = "0".repeat(Math.abs(trueExp) - 1);
                return `${sign}0.${leadingZeros}${s}`;
            }
        }
        // 5. Fallback: Scientific Notation (e.g., 1.23e+10)
        const firstDigit = s[0];
        const rest = s.slice(1);
        const expSign = trueExp >= 0 ? "+" : ""; // optional: standard plus sign
        return `${sign}${firstDigit}${rest ? "." + rest : ""}e${expSign}${trueExp}`;
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
        let absoluteMan = this.man < 0n ? -this.man : this.man;
        let s = absoluteMan.toString();
        let targetLen = Number(inflo.prec) + 1;
        let diff = s.length - targetLen;
        if (diff > 0) {
            const divisor = 10n ** BigInt(diff);
            const half = divisor / 2n;
            const remainder = absoluteMan % divisor;
            // Perform the truncation
            absoluteMan /= divisor;
            // If the remainder is >= 0.5 of the divisor, round up
            if (remainder >= half) {
                absoluteMan += 1n;
            }
            // Restore the sign and update exponent
            this.man = this.man < 0n ? -absoluteMan : absoluteMan;
            this.e += BigInt(diff);
            // Re-check: rounding up 999... could increase digit length
            if (absoluteMan.toString().length > targetLen) {
                this.man /= 10n;
                this.e += 1n;
            }
        } else if (diff < 0) {
            this.man *= 10n ** BigInt(-diff);
            this.e -= BigInt(-diff);
        }
    }
}
