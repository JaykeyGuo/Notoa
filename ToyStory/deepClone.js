// V1
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


// V2
const clone = (parent) => {
  // 判断类型
  const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Dat]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        break;
      default:
        flag = false;
    }
    return flag;
  };

  const getRegExp = (reg) => {
    var flags = '';
    if (reg.global) flags += 'g';
    if (reg.ignoreCase) flags += 'g';
    if (reg.multiline) flags += 'g';
    return flags;
  }

  const parents = [];
  const children = [];

  const _clone = (parent) => {
    if (!parent) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      child = [];
    } else if (isType(parent, 'RegExp')) {
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      child = new Date(parent.getTime());
    } else {
      proto = Object.getPrototypeOf(parent);
      child = Object.create(proto);
    }

    const index = parents.indexOf(parent);

    if (index !== -1) {
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parents) {
      child[i] = _clone(parent[i]);
    }
    return child;
  }

  return _clone(parent);
}