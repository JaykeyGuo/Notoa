# CDN-内容分发网络

> 专门为解决“长距离”上网络访问速度慢而诞生的一种网络应用服务。

### 就近访问

客户端在网络中访问就近的节点，减少获取资源的时间。

主要是通过就近的服务器缓存对应的静态资源实现的。

只有静态资源可以缓存，可以给动态资源添加短暂的缓存时间，转变成静态资源，这样也能被CDN加速。



### CDN的负载均衡

通过全局负载均衡（GSLB，Global Sever Load Balance）来实现。

在用户访问到DNS的时候，会指向到GSLB：

1. 看用户的 IP 地址，查表得知地理位置，找相对最近的边缘节点；
2. 看用户所在的运营商网络，找相同网络的边缘节点；
3. 检查边缘节点的负载情况，找负载较轻的节点；
4. 其他，比如节点的“健康状况”、服务能力、带宽、响应时间等。

通过这个方式来找到最近节点的IP。



### CDN的缓存代理

当用户访问到CDN后，如果对应的资源已经存在，则直接返回对应的资源，这个就是**“命中”**。

如果没有找到对应的资源，则需要回到源服务器获取最新的资源，这是**“回源”**。



### 小结

> 1. 由于客观地理距离的存在，直连网站访问速度会很慢，所以就出现了 CDN；
> 2. CDN 构建了全国、全球级别的专网，让用户就近访问专网里的边缘节点，降低了传输延迟，实现了网站加速；
> 3. GSLB 是 CDN 的“大脑”，使用 DNS 负载均衡技术，智能调度边缘节点提供服务；
> 4. 缓存系统是 CDN 的“心脏”，使用 HTTP 缓存代理技术，缓存命中就返回给用户，否则就要回源。