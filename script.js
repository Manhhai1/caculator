class Caculator {
    constructor(a, arr) {
        this.a = a
        this.ar = arr
    }
    check() {
        let a = this.ar.filter(item => isNaN(item))
        let open = 0
        let close = 0
        for (let i = 0; i < a.length; i++) {
            if (a[i] != '*' && a[i] != '/' && a[i] != '+' && a[i] != '-' && a[i] != '(' && a[i] != ')') return false
            if (a[i] == '(') open += 1
            if (a[i] == ')') close += 1
        }
        if (open != close) return false
        return this;

    }
    arrString() {
        for (let i = 0; i < this.a.length; i++) {
            if (this.a[i] == '+' || this.a[i] == '-' || this.a[i] == '*' || this.a[i] == '/' || this.a[i] == '(' || this.a[i] == ')') {
                let j = i + 1;
                let t = ''
                let h = i + 1
                this.ar.push(this.a[i])

                while (this.a[j] !== '+' && this.a[j] !== '-' && this.a[j] !== '*' && this.a[j] !== '/' && this.a[j] != ' ' && this.a[j] != '(' && this.a[j] != ')' && j < this.a.length) {
                    t = t + this.a[j];
                    j++
                }
                if (t) this.ar.push(t)
            }

        }
        {
            let i = 0
            let t = ' '
            while (this.a[i] != this.ar[0]) {
                t += this.a[i]
                i++
            }
            t = t.trim()
            if (t) this.ar.unshift(t)
        }
        console.log(this.ar)
        return this
    }
    caculate_Parentheses() {
        let a
        let b
        let j = 0
        while (this.ar.find(item => item === '(' || item === ')')) {

            for (let i = 0; i < this.ar.length; i++) {
                if (this.ar[i] == '(' && this.ar[i - 1] && this.ar[i + 1]) {
                    a = i

                }
                if (this.ar[i] == ')' && this.ar[i - 1] && this.ar[i + 1]) {
                    b = i
                }

            }
            let arr = this.ar.slice(a + 1, b - 1 + j);

            const cl = new Caculator(this.a, arr)
            cl.check().caculate_Mul_Div().caculate_Plus_Sub()

            // console.log(arr)
            this.ar.splice(a, b - a + j)
            // console.log(this.ar)
            if (cl.ar[0]) {
                this.ar.splice(a, 0, cl.ar[0].toString())
            }
            console.log(this.ar)
            j++

        }
        console.log(this.ar)
        return this
    }
    caculate_Mul_Div() {
        while (this.ar.find(item => item == '/' || item == '*')) {
            for (let i = 0; i < this.ar.length; i++) {
                if (this.ar[i] == '*' && this.ar[i - 1] && this.ar[i + 1]) {

                    let kq = (this.ar[i - 1] * this.ar[i + 1])
                    this.ar.splice(i - 1, 3)
                    this.ar.splice(i - 1, 0, kq);
                }
                if (this.ar[i] == '/' && this.ar[i - 1] && this.ar[i + 1]) {

                    let kq = (this.ar[i - 1] / this.ar[i + 1])
                    this.ar.splice(i - 1, 3)
                    this.ar.splice(i - 1, 0, kq);
                }

            }
        }

        console.log(this.ar)
        return this
    }
    caculate_Plus_Sub() {
        if (this.ar[0] == '-') {
            this.ar[1] = this.ar[0] + this.ar[1]
            this.ar.splice(0, 1)
        }
        while (this.ar.find(item => item == '+' || item == '-')) {
            for (let i = 0; i < this.ar.length; i++) {
                if (this.ar[i] == '+' && this.ar[i - 1] && this.ar[i + 1]) {

                    let kq = (+this.ar[i - 1] + +this.ar[i + 1])
                    this.ar.splice(i - 1, 3)
                    this.ar.splice(i - 1, 0, kq);
                    console.log(this.ar)
                }
                if (this.ar[i] == '-' && this.ar[i - 1] && this.ar[i + 1]) {

                    let kq = (this.ar[i - 1] - this.ar[i + 1])
                    this.ar.splice(i - 1, 3)
                    this.ar.splice(i - 1, 0, kq);
                    console.log(this.ar)
                }

            }
        }
        return this
    }
}
