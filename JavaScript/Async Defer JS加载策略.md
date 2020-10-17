# 在HTML中使用Async和Defer对JS的影响

结论：

1. 如果是不需要依赖DOM的JS脚本，建议在HTML的头部通过async的script标签引入。这样会并行下载资源，解析之后立即执行。
2. 如果是需要对DOM操作的脚步，建议使用defer的script标签在HTML头部引入，同样也是会并行下载，但是会在DOM解析之后再执行。不会影响DOM的解析。
3. 同时可以使用`DOMContentLoaded`来监听DOM的加载情况，来延迟async标签的执行。