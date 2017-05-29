ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_certificate         /etc/nginx/proxy/certs/ehealthscanner_com.crt;
ssl_certificate_key     /etc/nginx/proxy/certs/ehealthprod.key;
ssl_verify_client       off;
ssl_session_timeout     5m;

server {
    listen  443 ssl;

    add_header X-Frame-Options "SAMEORIGIN";

    include /etc/nginx/conf.d/proxy_body.conf;
}

server {
    listen 80;

    add_header X-Frame-Options "SAMEORIGIN";

    return 301 https://$host$request_uri;
}