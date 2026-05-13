<<<<<<< HEAD
# 🚀 **Matt Innova Solution - Proyecto Web**

¡Bienvenidos al repositorio oficial de **Matt Innova Solution**!  
Este proyecto representa la evolución tecnológica de nuestra plataforma, migrada de **React a Angular v18** para ofrecer una arquitectura más robusta, escalable y optimizada para soluciones de redes y servicios TI.

---

## 📂 **Estructura del Proyecto**

El repositorio está organizado bajo una arquitectura de separación de intereses:

- **/** (Raíz): Código fuente del Frontend desarrollado en Angular 18  
- **/backend**: Lógica del servidor, APIs y modelos de base de datos  
- **/public**: Recursos estáticos (logos e imágenes)

---

## 🛠️ **Tecnologías Utilizadas**

| **Capa**     | **Tecnologías** |
|-------------|----------------|
| Frontend    | Angular 18+, SCSS (Sass), TypeScript |
| Diseño      | Glassmorphism & Cyber-Tech Aesthetics |
| Iconografía | Bootstrap Icons |
| Backend     | *(Pendiente: Node.js / Laravel / Python)* |

---

## 🚀 **Guía de Inicio Rápido**

### **1. Requisitos Previos**

Es obligatorio contar con:

- Node.js (v18 o superior)  
- Angular CLI:
```bash
npm install -g @angular/cli
```

---

### **2. Instalación**

Clona el repositorio y accede a la carpeta:

```bash
git clone https://github.com/yastinvasquezzz/M.I.S-IA.git
cd mis_ia
```

Instala las dependencias:

```bash
npm install
```

---

### **3. Ejecución**

Inicia el servidor de desarrollo:

```bash
ng serve
```

Accede desde tu navegador:

👉 http://localhost:4200/

---

## 🤝 **Reglas para Colaboradores (Workflow)**

Para mantener un flujo profesional:

### **🔹 Ramas (Branches)**
Prohibido trabajar directamente en `main`.  
Crear ramas descriptivas:
```bash
git checkout -b feature/nombre-de-tu-tarea
```

### **🔹 Commits**
Usar **Conventional Commits**:
- `feat:` nueva funcionalidad  
- `fix:` correcciones  
- `style:` cambios visuales  

Ejemplo:
```bash
feat: add contact form validation
```

### **🔹 Pull Requests**
Todo cambio debe pasar por revisión antes de integrarse a `main`.

---

## 📬 **Contacto & Soporte**

Para consultas sobre infraestructura o arquitectura:

- **Admin:** Vasquez *(Lead Engineer)*  
- **Sitio Web:** mattinnovasolution.com  

---

## ⚠️ **Nota Técnica Importante**

El modo **SSR (Server Side Rendering)** ha sido desactivado intencionalmente para simplificar el desarrollo.

👉 Usar siempre:
```bash
ng serve
```

---

## 📌 **Cómo aplicar este README**

1. Abre tu archivo `README.md` en VS Code  
2. Reemplaza el contenido con este archivo  
3. Ejecuta:

```bash
git add README.md
git commit -m "docs: improve readme structure and styling"
git push origin frontend
```

---

✨ **Matt Innova Solution — Innovando el futuro digital**
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
>>>>>>> 5aa8cbb9338c648bea0b54f10326ec958531e5b5
