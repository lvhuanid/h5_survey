FROM nginx

# 复制构建好的 Vue 项目到 Nginx 的 html 目录
COPY dist/ /usr/share/nginx/html

# 如果有自定义的 Nginx 配置文件，可以替换默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80
