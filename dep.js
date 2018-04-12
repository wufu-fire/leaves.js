// 视图更新函数
function cb(val) {
    console.log("view update, the new val is:", val)
}

// 数据初始化
function observer(obj) {
    if (!obj || (typeof obj !== 'object')) return

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
// 订阅者
class Dep {
    constructor() {
        /* 用来存放Watcher对象的数组 */
        this.subs = [];
    }

    /* 在subs中添加一个Watcher对象 */
    addSub(sub) {
        this.subs.push(sub);
    }

    /* 通知所有Watcher对象更新视图 */
    notify() {
        this.subs.forEach((sub) => {
            console.log(sub)
            sub.update();
        })
    }
}

class Watcher {
    constructor() {
        /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
        Dep.target = this;
    }

    /* 更新视图的方法 */
    update() {
        console.log("视图更新啦～");
    }
}

Dep.target = null



// 核心功能，响应式
function defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            dep.addSub(Dep.target);
            console.log(Dep.target)
            return val
        },
        set: function reactiveSetter(newVal) {
            if (newVal === val) return

            dep.notify()
            // cb(newVal)
        }
    })
}

// vue的类
class Vue {
    constructor(options) {
        this._data = options.data;
        observer(this._data);
        /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
        new Watcher();
        /* 在这里模拟render的过程，为了触发test属性的get函数 */
        console.log('render~', this._data.test);
    }
}

// 创建实例
let o = new Vue({
    data: {
        test: "I am test"
    }
})

o._data.test = "I am new vulue"


