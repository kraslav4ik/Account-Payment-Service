<h1 style="text-align: center">Account-payment service fullstack application</h1>

<h3>Content:</h3>
<ol>
<li><a href="#about">About</a></li>
<li><a href="#model">Model</a></li>
<li><a href="#techstack">Tech stack</a></li>
<li><a href="#reqr">Requirements</a></li>
<li><a href="#inst">Installation</a></li>
<li><a href="#maninst">Manual Installation</a></li>
<li><a href="#launch">Launch</a></li>





</ol>

<h3 id="about">About:</h3>
App is implementing the process of keeping the statistics of employee salary within company.

Suppose, in your company, with some number of employees, you want to store the history of each employee monthly salary. You also might want to make one of the workers responsible for maintaining the stats, adding new payments, etc. And, of course, it would be convenient, if each employee also could use ths service, might have a look at his payments stats. 

All of the above, with some additional features(such as accounts management for administrator, ability to keep the logs of users actions), is implemented in this web application.
You should just launch a server with the service and share server's address with co-workers.

<h3 id="model">Model:</h3>

Model section

<h3 id="techstack">Tech stack:</h3>
<ul>
<li><b>Frontend:</b> <i>React.js v18.2.0 + Antd library v5.1.2</i></li>
<li><b>Backend:</b> <i>Spring v2.7.5</i></li>
<li><b>Data persisting:</b> <i>Hibernate v6.1.0.Final + MySQL</i></li>
<li><b>Data transferring:</b> <i>user <--> service : <b>HTTPS(self-signed)</b>; Frontend <--> Backend : <b>HTTPS(self-signed)</b></i></li>
<li><b>Authorization:</b><i>Json Web Token (jjwt v0.2 library) using HTTPonly Cookies</i></li>

Also, HTTP basic authentication is supported for single requests
</ul>

<h3 id="reqr">Requirements:</h3>
  
<ul>
  <li><b>NodeJS</b> v18.12.1</li>
  <li><b>npm</b> v8.19.2</li>
  <li><b>JDK</b> v17</li>
  <li><b>MySQL</b> v8.0.32</li>
</ul>  

```bash
~$ sudo apt install nodejs
~$ sudo apt install npm
~$ sudo apt install openjdk-17-jdk-headless
~$ sudo apt-get install mysql-server
```

<h3 id="inst">Installation:</h3>

Very soon there will be instruction for automatic setup and packages installation.

<h3 id="maninst">Manual Installation:</h3>

1. Clone this repo to your local / remote machine:
```bash
git clone https://github.com/kraslav4ik/Account-Payment-Service.git Account-Payment-Service
```
```bash
cd ./Account-Payment-Service
```

2. Create database for data persisting. 

    a. If you have just installed mysql, you already have default server, so, we're creating our db on it. For authorization, use password, created during installation:

```bash
mysql -u root -p
password: root
mysql> CREATE DATABASE account
mysql>QUIT
```

b. If you already have server, for example, on another host, then:

```bash
mysql -h <host> -u <name> -p
password: <password>
mysql> CREATE DATABASE account
mysql>QUIT
```

3. Setup your server:

   Add all the info about Database, your JWT secret (there could be anything except empty string) and Company email domain(`@company.com`)
```bash
~/Account-Payment-Service$ echo "spring.datasource.username=`<USERNAME FROM 2nd STAGE>`" >> ./Account-Payment-Service-Backend/src/main/resources/application.properties
~/Account-Payment-Service$ echo "spring.datasource.password=`<PASSWORD FROM 2nd STAGE>`" >> ./Account-Payment-Service-Backend/src/main/resources/application.properties
~/Account-Payment-Service$ echo "spring.datasource.url=jdbc:mysql://`<YOUR DATABASE HOST:PORT>`/account" >> ./Account-Payment-Service-Backend/src/main/resources/application.properties
~/Account-Payment-Service$ echo "account.jwtSecret=`<JWT_SECRET_KEY>`" >> ./Account-Payment-Service-Backend/src/main/resources/application.properties
~/Account-Payment-Service$ echo "account.company_email=`<EMAIL_DOMAIN>`" >> ./Account-Payment-Service-Backend/src/main/resources/application.properties
```


4. Install frontend packages:
```bash
~/Account-Payment-Service$ cd ./Account-Payment-Service-Frontend
~/Account-Payment-Service-Frontend$ npm install
~/Account-Payment-Service-Frontend$ cd ..
```

5. Install Backend Packages:
```bash
~/Account-Payment-Service$ cd ./Account-Payment-Service-Backend
~/Account-Payment-Service-Backend$ ./gradlew build
~/Account-Payment-Service-Backend$ cd ..
```

<h3 id="launch">Launch:</h3>

   Launch backend server:
```bash
~/Account-Payment-Service$ tmux new -s backend
IN_TMUX~/Account-Payment-Service$ cd ./Account-Payment-Service-Backend
~/Account-Payment-Service-Frontend$ ./gradlew bootrun
```

   Launch frontend server:
```bash
~/Account-Payment-Service$ tmux new -s frontend
IN_TMUX~/Account-Payment-Service$ cd ./Account-Payment-Service-Frontend
~/Account-Payment-Service-Frontend$ npm start
```

By default, API server(backend) is on port 28892 and Client server(frontend) is on port 28893. You can change the port in the corresponding files:

   `./Account-Payment-Service-Backend/src/main/resources/application.properties`

   `./Account-Payment-Service-Frontend/package.JSON`

That's it. After launching, you can reach the Service using https://`<host>`:`<port>`

   
<img src="https://github.com/kraslav4ik/Account-Payment-Service/blob/master/img/AppScreen.jpg" alt="pic"/>
