proxy_cache_path /var/lib/nginx_cache levels=1:2 keys_zone=STATIC:10m inactive=24h max_size=1g;

proxy_cache            STATIC;
proxy_cache_valid      200  1d;
proxy_cache_use_stale  error timeout invalid_header updating
                       http_500 http_502 http_503 http_504;