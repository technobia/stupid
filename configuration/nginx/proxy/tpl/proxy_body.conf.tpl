location / {
    proxy_pass http://${FRONTEND_HOST};
}

location /api {
    proxy_pass http://${BACKEND_HOST}/api;
}

location /upload {
    proxy_pass http://${BACKEND_HOST}/public;
}

location ^~ /blog {
    proxy_set_header    Host                    www.ehealthscanner.com;
    proxy_set_header    X-Forwarded-For         $proxy_add_x_forwarded_for;
    proxy_set_header    X-Forwarded-Host        $host:443;
    proxy_set_header    X-Forwarded-Server      $host;
    proxy_set_header    X-Forwarded-Proto       https;
    proxy_set_header    X-Forwarded-Port        443;
    proxy_pass http://54.254.163.59/blog;
}

location /mod_pagespeed_beacon {
    proxy_pass http://54.254.163.59;
}