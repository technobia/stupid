server {
    listen  ${PORT};

    include /etc/nginx/conf.d/proxy_body.conf;
}
