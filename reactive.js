function cb(val) {
    console.log("view update, the new val is:", val)
}

function defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return;
            cb(newVal)
        }
    })
}

function observe(obj) {
    if (!obj || (typeof obj !== 'object')) return

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}

class Vue {
    constructor(options) {
        this._data = options.data;
        observe(this._data)
    }
}

let o = new Vue({
    data: {
        test: "I am test"
    }
})
console.log(o._data.test)
o._data.test = "I am new vulue"

