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
        if (this.ar[this.ar.length - 1] == ')' || this.ar[this.ar.length - 1] == '(' || this.ar[this.ar.length - 1] == '*' || this.ar[this.ar.length - 1] == '+' || this.ar[this.ar.length - 1] == '-' || this.ar[this.ar.length - 1] == '/') return false
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
        let b = 0
        let j = 0
        while (this.ar.find(item => item === '(' || item === ')')) {

            for (let i = 0; i < this.ar.length; i++) {
                if (this.ar[i] == '(' && this.ar[i - 1] && this.ar[i + 1]) {
                    a = i
                    console.log('a', a)

                }
                if (this.ar[i] == ')' && this.ar[i - 1] && this.ar[i + 1]) {
                    b = i
                    if (a != 0 && b != 0 && b > a) {
                        console.log('b', b)
                        let arr = this.ar.slice(a + 1, b);
                        console.log(arr.length)
                        this.ar.splice(a, b - a + 1)
                        const cl = new Caculator(this.a, arr)
                        cl.check().caculate_Mul_Div().caculate_Plus_Sub()
                        console.log(this.ar)
                        if (cl.ar[0]) {
                            this.ar.splice(a, 0, cl.ar[0].toString())
                        }
                        console.log(this.ar)
                    }
                    i = 0
                }
            }
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
                if (this.ar[i] == '-' && this.ar[i - 1] && this.ar[i + 1]) {


                    if (this.ar[i - 2] && this.ar[i - 2] == '-') {
                        let kq = (+this.ar[i - 1] + +this.ar[i + 1])
                        this.ar.splice(i - 1, 3)
                        this.ar.splice(i - 1, 0, kq);
                        console.log(this.ar)
                    }
                    else {
                        let kq = (+this.ar[i - 1] - +this.ar[i + 1])
                        this.ar.splice(i - 1, 3)
                        this.ar.splice(i - 1, 0, kq);
                        console.log(this.ar)
                    }
                }
                if (this.ar[i] == '+' && this.ar[i - 1] && this.ar[i + 1]) {
                    if (this.ar[i - 2] && this.ar[i - 2] == '-') {
                        let kq = (+this.ar[i - 1] - +this.ar[i + 1])
                        this.ar.splice(i - 1, 3)
                        this.ar.splice(i - 1, 0, kq);
                        console.log(this.ar)
                    }
                    else {
                        let kq = (+this.ar[i - 1] + +this.ar[i + 1])
                        this.ar.splice(i - 1, 3)
                        this.ar.splice(i - 1, 0, kq);
                        console.log(this.ar)
                    }
                }

            }
        }
        return this
    }
}
let a = '254*65+4234/5488+445-(145+(5478-547+875*875))+89788'
let ar = []
let b = new Caculator(a, ar)
console.log(b.arrString().check().caculate_Parentheses().caculate_Mul_Div().caculate_Plus_Sub())