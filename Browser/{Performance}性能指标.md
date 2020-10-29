# {Performance}性能指标

### FP、FCP、FMP和LCP

> FP：First Paint 首次绘制，是时间线上的第一个“时间点”，它代表浏览器第一次向屏幕传输像素的时间，也就是页面的屏幕上上次发生视觉变化的时间。



> FCP：First Contentful Paint 首次内容绘制，表示浏览器第一次向屏幕绘制“内容”



FP & FCP 的区别：FP的关键词是“视觉变化”，只要发生了视觉变化，那页面就会触发FP；FCP的关键词是“DOM内容”，例如文本、图片、SVG、Canvas等元素的绘制。



> FMP：First Meaningful Paint 首次有效绘制，表示页面的“主要内容”开始出现在屏幕的时间点。

FMP的算法有可能会不准确，对于实际的页面内容的展示，例如字体的绘制会有误差。

> LCP：Largest Contentful Paint 最大内容绘制，表示可视区域“内容”最大的可见元素出现在屏幕的时间点。



> TTI：Time to Interactive 可交互时间，表示页面第一次**完全达到可交互状态**的时间点。

核心是JS的长任务和阻塞页面的交互状态，就是会妨碍用户交互的过程，解决方法是将长任务做切片，在主线程的任务均不超过50ms的情况下，有较好的效果。



> TTFB：Time to First Byte：表示浏览器接受第一字节的时间。



> FCI：First CPU Idle 表示CPU第一次空闲时间点，这个时间点是补充TTI的，在主线程空闲下来的时候，也就表示页面的渲染基本完成，代表可以接受用户的响应。

*TTI与FCI的区别：FCI代表浏览器真正的第一次可以响应用户的输入，而TTI代表浏览器已经可以持续性的响应用户的输入。*

> FID：First Input Delay 首次输入延迟，表示页面何时能给到用户第一次交互的反馈时间，通过这个值可以很好的体现出页面交互响应的性能，在TTI之前触发的交互，FID会比较长，因为这个时候可能页面还没有准备好，在TTI之后触发的交互FID比较短，因为这时候页面加载完成，在等待交互的时候。



> DCL：DOMContentLoaded事件触发的时间
>
> L：onLoad 事件触发的时间

DCL和 L 的区别是，浏览器解析HTML这个操作完成之后便触发了DCL，而只有页面所有资源都加载完毕后，才会触发onLoad事件。



> Speed Index：表示显示页面可见部分的平均时间（仅指可见区域）



> FPS：Frames Per Second 表示显示器的每秒刷新频率

---

Link：

[Web性能领域常见的专业术语](https://github.com/berwin/Blog/issues/46)

