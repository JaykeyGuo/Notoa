// reference from: https://zhuanlan.zhihu.com/p/160315811

class DeepClone {
  constructor() {
    this.cacheList = [];
  }
  clone(source) {
    if (source instanceof Object) {
      const cache = this.findCache(source);
      if (cache) {
        return cache;
      } else {
        let target;
        if (source instanceof Array) {
          target = new Array();
        } else if (source instanceof Function) {
          target = function() {
            return source.apply(this, arguments);
          };
        } else if (source instanceof Date) {
          target = new Date(source);
        } else if (source instanceof RegExp) {
          target = new RegExp(source.source, source.flags);
        }

        // 把源对象和新对象放进缓存列表
        this.cacheList.push([source, target]);

        for (let key in source) {
          if (source.hasOwnProperty(key)) { // 不拷贝原型上的属性，太浪费内存
            target[key] = this.clone(source[key]); // 递归
          }
        }
        return target;
      }
    }
    return source;
  }

  findCache(source) {
    for (let i = 0; i < this.cacheList.length; ++i) {
      if (this.cacheList[i][0] === source) {
        return this.cacheList[i][1]; // 处理循环引用
      }
    }
    return undefined;
  }
}
