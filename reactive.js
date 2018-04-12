// 视图更新函数
function cb(val) {
    console.log("view update, the new val is:", val)
}
// 核心功能，响应式
function defineReactive(obj, key, val) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            dep.addSub(Dep.target)
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return

            dep.notify()
            // cb(newVal)
        }
    })
}
// 数据初始化
function observe(obj) {
    if (!obj || (typeof obj !== 'object')) return

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
// 订阅者
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach((sub) => {
            sub.update()
        })
    }
}

// 观察者
class Watcher {
    constructor() {
        Dep.target = this
        // console.log("this", this)
    }
    update() {
        console.log("视图更新了")
    }
}
Dep.target = null

// vue的类
class Vue {
    constructor(options) {
        this._data = options.data;
        observe(this._data)
        new Watcher()
        // 模仿视图
        console.log('render', this._data.test)
        console.log('render', this._data.test)
    }
}
// 创建实例
let o = new Vue({
    data: {
        test: "I am test"
    }
})

o._data.test = "I am new vulue"


