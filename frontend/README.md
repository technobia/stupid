e-Health-Scanner: Frontend
==========================

# Prerequisite
- NodeJS (v4.4.7)
- Go to app folder before running following commands

# Configuration nginx
```
$ sudo cp /path/to/frontend/ehealthscanner /etc/nginx/sites-available/
$ sudo ln -s /etc/nginx/sites-available/ehealthscanner /etc/nginx/sites-enabled/
```

# Installation
```
$ npm install
```

# Run dev
```
$ npm run deploy:dev
```

# Troubleshooting
If you've encountered a node-sass error, please do the following:
Give the current user the permission on eheathscanner directory
```
$ sudo chown -R ${USER} /ehealthscanner-root
```
Rebuild node-sass
```
$ npm rebuild node-sass
```
