<h1 style="text-align: center">Account-payment service fullstack application</h1>

<h3>Content:</h3>

<h3>About:</h3>
App is implementing the process of keeping the statistics of employee salary within company
<h3>Model:</h3>
Yo

<h3>Tech stack:</h3>
<ul>
<li><b>Frontend:</b> <i>React.js v18.2.0 + Antd library v5.1.2</i></li>
<li><b>Backend:</b> <i>Spring v2.7.5</i></li>
<li><b>Data persisting:</b> <i>Hibernate v6.1.0.Final + MySQL</i></li>
<li><b>Data transferring:</b> <i>user <--> service : <b>HTTPS(self-signed)</b>; Frontend <--> Backend : <b>HTTPS(self-signed)</b></i></li>
<li><b>Authorization:</b><i>Json Web Token (jjwt v0.2 library) using HTTPonly Cookies</i></li>
</ul>

<h3>Requirements:</h3>
* <b>NodeJS</b> v18.12.1
* <b>npm</b> v8.19.2
* <b>JDK</b> v17

```bash
~$ sudo apt install nodejs
~$ sudo apt install npm
~$ sudo apt install openjdk-17-jdk-headless
```

<h3>Installing:</h3>

Very soon there will be instruction for automatic setup and packages installation.

<h3>Manual installing:</h3>

1. Clone this repo to your local / remote machine:
```bash
git clone https://github.com/kraslav4ik/Account-Payment-Service.git Account-Payment-Service
```
```bash
cd ./Account-Payment-Service
```

2. 
3. Install frontend packages:
```bash
~/Account-Payment-Service$ cd ./Account-Payment-Service-Frontend
~/Account-Payment-Service-Frontend$ npm install
~/Account-Payment-Service-Frontend$ cd ..
```

4. Install Backend Packages:
```bash
~/Account-Payment-Service$ cd ./Account-Payment-Service-Backend
~/Account-Payment-Service-Backend$ ./gradlew build
~/Account-Payment-Service-Backend$ cd ..
```

<img src="https://github.com/kraslav4ik/Account-Payment-Service/blob/master/img/AppScreen.jpg" alt="pic"/>
