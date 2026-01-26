class inflo {
    static isNum = /^(?<s>[+-])?(?:(?<i>\d+)(?:\.(?<f>\d*))?|\.(?<f2>\d+))(?:[Ee](?<es>[+-])?(?<e>\d+))?$/;
    static prec = 16n;
    static pow10 = 10n ** inflo.prec;
    static pow10_n = inflo.pow10 * 10n;

    static PI = new inflo("3.141592653589793");
    static TAU = new inflo("6.283185307179586");
    static SQRT2 = new inflo("1.4142135623730951");
    static SQRT3 = new inflo("1.7320508075688772");
    static SQRT5 = new inflo("2.23606797749979");
    static GOLDEN_RATIO = new inflo("1.618033988749895");
    static SILVER_RATIO = new inflo("2.414213562373095");
    static CBRT2 = new inflo("1.2599210498948732");
    static ROOT12_2 = new inflo("1.0594630943592953");
    static SUPERGOLDEN_RATIO = new inflo("1.4655712318767682");
    static E = new inflo("2.718281828459045");
    static LN2 = new inflo("0.6931471805599453");
    static RAMANUJANS_CONSTANT = new inflo("262537412640767700");
    static GELFONDS_CONSTANT = new inflo("23.140692632779263");
    static GELFOND_SCHNEIDER_CONSTANT = new inflo("2.665144142690225");
    static TRIBONACCI_CONSTANT = new inflo("1.8392867552141612");

    static LN10 = new inflo("2.302585092994046");
    static LOG10E = new inflo("0.4342944819032518");
    static LOG2E = new inflo("1.4426950408889634");
    static SQRT1_2 = new inflo("0.7071067811865476");

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
        if (this.isz) return new inflo("0");
        if (this.man < 0n) throw new Error("not a number");
        let a = this.__copy__();
        let prevA = new inflo("-1");
        a.e = (a.e + inflo.prec) / 2n - inflo.prec;
        while (a.compare(prevA)) {
            prevA = a.__copy__();
            a = (new inflo(1).divide(2)).times(a.plus(this.divide(a)));
        }
        return a;
    }
    exp() {
        if (this.isz) return new inflo(1);

        // 1. Handle negative exponents: e^(-x) = 1 / e^x
        if (this.man < 0n) {
            return new inflo(1).divide(this.__negate__().ePow());
        }

        // 2. Argument Reduction (Scaling and Squaring)
        // We want to scale 'x' down until it is small (e.g., < 0.5)
        let k = 0n;
        let x = this.__copy__();
        const threshold = new inflo("0.5");

        while (x.compare(threshold) > 0) {
            x = x.divide(2);
            k++;
        }
        // 3. Taylor Series for the reduced 'x'
        // e^x = 1 + x + x^2/2! + x^3/3! ...
        let term = new inflo("1");
        let sum = new inflo("1");
        let i = 1n;

        while (true) {
            // term = term * x / i
            term = term.times(x).divide(i);
            let prevSum = sum.__copy__();
            sum = sum.plus(term);

            // If the sum stops changing within our precision, we are done
            if (sum.compare(prevSum) === 0) break;
            i++;
        }

        // 4. Squaring back up: (e^(x/2^k))^(2^k)
        for (let j = 0n; j < k; j++) {
            sum = sum.times(sum);
        }

        return sum;
    }

    ln() {
        if (this.isz || this.man <= 0n) throw new Error("ln undefined for non-positive numbers");

        // 1. Argument Reduction
        // We want to transform x into x_reduced * 10^k such that 0.1 < x_reduced < 10
        // Based on your __fix__, this.man is always ~10^prec
        // x = (man / 10^prec) * 10^e
        let x = this.__copy__();
        let k = x.e + inflo.prec;

        // Normalize x to be between [0.5, 1.5] for fast convergence
        x.e = -inflo.prec;

        // 2. Further reduction if x is far from 1
        // Using ln(x) = ln(x/2) + ln(2) or similar can help, 
        // but scaling to 10^k is usually enough for 50-digit precision.

        // 3. Halley's Method or Taylor Series
        // We use the series for ln((1+z)/(1-z)) where z = (x-1)/(x+1)
        let sum = new inflo("0");
        let prevSum = new inflo("-1");
        let z = x.minus("1").divide(x.plus("1"));
        let zs = z.times(z);
        let term = z;
        let i = 1n;

        while (sum.compare(prevSum) !== 0) {
            prevSum = sum.__copy__();
            sum = sum.plus(term.divide(i));
            term = term.times(zs);
            i += 2n;
        }
        sum = sum.times("2");

        // 4. Combine: ln(x) = ln(x_reduced) + k * ln(10)
        // Note: This requires a precomputed LN10 to avoid infinite recursion
        if (k !== 0n) {
            return sum.plus(new inflo(k).times(inflo.LN10));
        }
        return sum;
    }
    log10() {
        let a = this.__copy__();
        return a.ln().divide(new inflo("10").ln());
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
        const trueExp = this.e + BigInt(s.length) - 1n;
        // 3. Remove trailing zeros for a cleaner look
        s = s.replace(/0+$/, "");
        // 4. Determine format: Fixed vs Scientific
        // Use Fixed if exponent is reasonably small (e.g., between -6 and 15)
        if (trueExp > -7n && trueExp < 21n) {
            if (trueExp >= 0n) {
                // Number >= 1 (e.g., 123.45)
                const intPart = s.slice(0, Number(trueExp) + 1).padEnd(Number(trueExp) + 1, "0");
                const fracPart = s.slice(Number(trueExp) + 1);
                return `${sign}${intPart}${fracPart ? "." + fracPart : ""}`;
            } else {
                // Number < 1 (e.g., 0.00123)
                const leadingZeros = "0".repeat(Math.abs(Number(trueExp)) - 1);
                return `${sign}0.${leadingZeros}${s}`;
            }
        }
        // 5. Fallback: Scientific Notation (e.g., 1.23e+10)
        const firstDigit = s[0];
        const rest = s.slice(1);
        const expSign = trueExp >= 0 ? "" : ""; // optional: standard plus sign
        return `${sign}${firstDigit}${rest ? "." + rest : ""}e${expSign}${trueExp}`;
    }
    static recompute() {
        // 1. Basic Roots
        inflo.SQRT2 = new inflo("2").sqrt();
        inflo.SQRT3 = new inflo("3").sqrt();
        inflo.SQRT5 = new inflo("5").sqrt();

        // 2. Logarithms (Crucial for the ln() function)
        // Compute LN10 first for the reduction logic
        // We can use ln(10) = 2 * ln(3) + ln(1.111...) or just the series for ln(10)
        // A stable way: LN10 = 3*ln(2) + ln(1.25)
        const ln_reduced = (val) => new inflo(val).ln(); // Simple helper
        inflo.LN2 = new inflo("2").ln();
        inflo.LN10 = new inflo("10").ln();

        // 3. Derived Constants
        inflo.GOLDEN_RATIO = inflo.SQRT5.plus("1").divide("2");
        inflo.SILVER_RATIO = inflo.SQRT2.plus("1");
        inflo.SQRT1_2 = new inflo("1").divide(inflo.SQRT2);

        // 4. Geometry
        // Implementing a basic Machin-like formula for PI
        const atan = (x_inv) => { // calculates atan(1/x_inv)
            let xInvInflo = new inflo(x_inv);
            let xSq = xInvInflo.times(xInvInflo);
            let sum = new inflo("0");
            let term = new inflo("1").divide(xInvInflo);
            let i = 1n;
            while (true) {
                let prev = sum.__copy__();
                let step = term.divide(i);
                sum = (i % 4n === 1n) ? sum.plus(step) : sum.minus(step);
                if (sum.compare(prev) === 0) break;
                term = term.divide(xSq);
                i += 2n;
            }
            return sum;
        };

        // Pi = 4 * (4*atan(1/5) - atan(1/239))
        inflo.PI = atan("5").times("4").minus(atan("239")).times("4");
        inflo.TAU = inflo.PI.times("2");

        inflo.E = new inflo("1").exp();
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