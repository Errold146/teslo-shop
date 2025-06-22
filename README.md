[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Zustand](https://img.shields.io/badge/Zustand-4.x-ffb300?logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![React](https://img.shields.io/badge/React-19.x-61dbfb?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS-663399?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

# Teslo Shop

Este proyecto es una tienda en línea desarrollada con [Next.js](https://nextjs.org), diseñada para ofrecer una experiencia de compra moderna y eficiente.

## 🚀 Características

- Catálogo de productos dinámico
- Carrito de compras con persistencia
- Autenticación y gestión de usuarios
- Panel administrativo para productos y órdenes
- Diseño totalmente responsive

## 🧪 Tecnologías utilizadas

- [Next.js](https://nextjs.org)
- [React](https://es.react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwindcss](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)

## ⚙️ Instalación y ejecución local

1. Clona el repositorio:

    ```bash
    git clone https://github.com/Errold146/teslo-shop.git
    cd teslo-shop
    ```

2. Instala las dependencias:

    ```bash
    npm install
    # o
    yarn install
    ```

3. Levantar la base de datos. Asegurase de tener corriendo Docker Desktop antes de ejecutar el siguiente comando:
    ```
    docker compose up -d
    ```

4. Configura las variables de entorno en un archivo `.env.local` (ver `.env.example` para referencia).

5. Correr las migraciones de prisma 
    ```
    npx prisma migrate dev
    ```

6. Ejecutar seed para insertar datos de relleno en la base datos. ¡Advertencia, si hay datos previos los eliminará!
    ```
    npm run seed
    ```

7. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    # o
    yarn dev
    ```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Scripts útiles

| 🧾 Comandos               | 💡 Descripción                                               |
|----------------------------|--------------------------------------------------------------|
| `docker compose up -d`     | 🔹 Levanta la base de datos con Docker                      |
| `npx prisma migrate dev`   | 🔸 Ejecuta migraciones de Prisma                            |
| `npm run seed`             | ⚠️ Inserta datos de prueba (¡elimina datos existentes!)     |
| `npm run dev`              | 🧪 Inicia el servidor en modo desarrollo                    |
| `npm run build`            | 📦 Genera la versión optimizada para producción             |
| `npm start`                | 🚀 Arranca el servidor en modo producción                   |

## 🧭 Consideraciones
⚠️ Este proyecto está actualmente en desarrollo. Algunas funcionalidades pueden no estar completas.

## ☁️ Despliegue

Puedes desplegar este proyecto fácilmente en [Vercel](https://vercel.com/) o cualquier plataforma compatible con Next.js.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## ✉️ Contacto
[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez) 
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Chat%20conmigo-25D366?logo=whatsapp&logoColor=white)](https://wa.me/50672117802)

---

Gracias por visitar Teslo Shop. ¡Nos vemos en el checkout!