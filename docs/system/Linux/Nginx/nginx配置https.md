# nginx配置https

首先肯定是要申请域名备案的，这点就不过多阐述了，其次就是要申请https的SSL证书，具体怎么操作自行百度
## 方案一（略微有点low）

先把443端口配置好，在443端口下开个子路径

```bash
    server {
        listen       9000;
        server_name  www.test.cn;
        location / {
             add_header Cache-Control no-cache;
             root /home/web/cxhweb;
             try_files $uri $uri/ /index.html last;
             index  index.html index.htm;
        }
    }
     server {
        listen       9001;
        server_name  www.test.cn;
        location / {
             add_header Cache-Control no-cache;
             root /home/web/blog;
             try_files $uri $uri/ /index.html last;
             index  index.html index.htm;
        }
    }
    server {
        listen       443 ssl http2;
        listen       [::]:443 ssl http2;
        server_name  www.test.cn;
        root         /usr/share/nginx/html;

        ssl_certificate "/etc/nginx/conf/cert/test.cn.pem";
        ssl_certificate_key "/etc/nginx/conf/cert/test.cn.key";
        ssl_session_cache shared:SSL:1m;
        ssl_session_timeout  10m;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
	    # 后台管理系统api -- backstage management system
        location /bms-api/ {
		    proxy_pass http://xxxx.1x.1xx:5000/;
		    proxy_set_header Host $host;
		    proxy_set_header X-Real-IP $remote_addr;
		    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		    proxy_set_header X-Forwarded-Proto $scheme;
        }
        location /9000/ {
		    proxy_pass http://xxxx.1x.1xx:9000/;
		    proxy_set_header Host $host;
		    proxy_set_header X-Real-IP $remote_addr;
		    proxy_set_header X-Forwarded-Proto $scheme;
		    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	    }
        location /klsbolg/ {
            proxy_pass http://xxxx.1x.1xx:9001/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
```

## 方案二（待更新）