# 使用 Nginx 官方镜像
FROM nginx

# 复制构建好的文件到 Nginx 的 html 目录
COPY dist /usr/share/nginx/html

# 复制 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80
