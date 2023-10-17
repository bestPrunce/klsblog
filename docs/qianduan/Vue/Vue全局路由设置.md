# Vue全局路由设置
## 代码的逻辑是：
- 如果用户已经登录，直接放行；
- 如果用户未登录，且访问的路由需要登录，则将访问的路由保存在 redirect 参数中，重定向到登录页面；
- 如果用户未登录，且访问的路由不需要登录，则直接放行。
```javaScript
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("token");
  const isLoginPage = to.name === "Login";
  const isDashboardPage = to.name === "Dashboard";
  // 不需要token即可访问的路由
  const notk =  ['login']

  if (!isLoggedIn && !isLoginPage) {
    next("/login");
  } else if (isLoggedIn && isLoginPage) {
    next("/dashboard");
  } else {
    //未登录，对某些路由做限制访问
    let tp = to.path;
    if (!notk.includes(tp)) {
      // 把未登录的时候没有去成的信息，存储于地址栏中（路由）
      next('login?redirect=' + tp);
    } else {
      next();
    }
  }
});
```