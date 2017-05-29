e-Health-Scanner
===========================

# Prerequisite

1. Ubuntu (>= 14.04)
2. Install [**docker-engine**][1] (>=1.9) and [**docker-compose**][2] (>=1.8)
3. Run a local registry:
```
$ docker run -d --name local -p 5000:5000 --restart always registry:2
# Optionally, you can also add "-v /opt/docker-registry-local:/var/lib/registry" to persist images and thus speed up deployments
```

# Run the app

```
./run.sh
```

# Development Environment

1. Run development services:
   ```
./dev.sh
   ```

2. We are developing two separate components. Follow instructions at their respective paths:
    * [**frontend**](./frontend)
    * [**backend**](./backend)
** Please OPEN 2 NEW TERMINAL WINDOW/TAB, then go to frontend and backend and follow the README there to run the app

[1]: https://docs.docker.com/engine/installation/linux/ubuntulinux/
[2]: https://docs.docker.com/compose/install/

3. Please go to http://localhost:3210
Backend API example: http://localhost:3210/api/ping/me

4. For OSX users only:
- Upgrade your bash to the newest version using brew:
```
$ brew install bash
```  
- Due to known issue of Docker for Mac, please attach an unused IP to the lo0 interface
```
$ sudo ifconfig lo0 alias 10.200.10.1/24
```
- Then, put in your .bash_profile
```
$ export IP_ALIAS=10.200.10.1
```

5. To customize admin email:
```
$ export EHS_ADMIN_EMAIL=your-email
``` 
