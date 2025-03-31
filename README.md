# EcoFridge - Front (Angular)

This project allows to register your food in an account. You can save your food perishable and unperishable. Some informations are given to know which food is expired.... 
This project is to reduce food waste and optimize the management of your "fridge".

# 👩‍💻 Technologies

| Front - Angular | version (works) | 
| --- | --- |
| npm | 10.5.0 |

# ⚡️ Standard Execution

Before starting front app, start Backend Ecofridge in https://github.com/GeoffreyHPro/ecoFridge_back

```bash
cd front/angular
npm start
```

URL of website: http://localhost:4200/home

# ☁️ Docker Execution

To create image Docker, execute this command

```bash
docker build -t front_angular_ecofridge .
```

To execute application, execute this command. 4200:4200 is port and default port, so change it if you execute application in another port.

```bash
docker run -p 4200:4200 front_angular_ecofridge
```    