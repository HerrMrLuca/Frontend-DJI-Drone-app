# Frontend-DJI-Drone-App

This is the frontend part of the Cloud API.

## Needed

### Node.js and NPM
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Confic

AppID: 124442

AppKey: ff629d8e9901bd0096f1c8ab109cc97

AppLicense: hxv4Wi1BtG0/0ZUIgi7gTYPO+yJzy+RC6NXYEyKemq3pOSAWEbs4UzcQ8edMNIRmQ/C8YIOOW0PdP00M2cMn2F0kElayYNS1jZebPBjXur75WUnjbTE+KePwpWLTOL56CfgkOSA++NgV8brFV+krL7i4tiTJ8hN7JA178UoUtj4=

agoraAPPID: 81151cf17c8641c18bf00e453ccaede4

agoraToken: 007eJxTYNhnLnNnytcV/Grmb5an3T1kKr2Nz7+clSdo/SXB/mS3o3YKDBaGhqaGyWmG5skWZiaGyYYWSWkGBqkmpsbJyYmpKakmwbPLkxsCGRksl3UzMzJAIIjPxZCUmJuUmVKUn5fKwAAAmWogTA==

agoraChannel: bambidrone



# Start

### Vite
npm run server

IP in confic.ts eintragen

IP in application.yml eintragen

### EMQX
./bin/emqx start

### Redis
wsl -u root

sudo service redis-server start

### MYSQL
Workbench Startup/Shutdown
Start Server

# Exit
### Vite
strg + C

### EMQX
./bin/emqx stop

### Redis
exit

### MYSQL
Workbench Startup/Shutdown

Stop Server
