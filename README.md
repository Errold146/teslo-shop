[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Zustand](https://img.shields.io/badge/Zustand-4.x-ffb300?logo=zustand&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![React](https://img.shields.io/badge/React-19.x-61dbfb?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS-663399?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Sonner](https://img.shields.io/badge/Sonner-2.x-ff6b6b?logo=react&logoColor=white)](https://github.com/emilkowalski/sonner)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-0055FF?logo=framer&logoColor=white)](https://motion.dev/)
[![Zod](https://img.shields.io/badge/Zod-4.x-3178c6?logo=typescript&logoColor=white)](https://zod.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-2.x-3448c5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![React Icons](https://img.shields.io/badge/React_Icons-5.x-61DAFB?logo=react&logoColor=white)](https://github.com/react-icons/react-icons)
[![Swiper](https://img.shields.io/badge/Swiper-11.x-6332f6?logo=swiper&logoColor=white)](https://swiperjs.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.x-ec5990?logo=react&logoColor=white)](https://react-hook-form.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Auth.js](https://img.shields.io/badge/Auth.js-1.x-0f172a?logo=auth0&logoColor=white)](https://authjs.dev/)
[![PayPal](https://img.shields.io/badge/PayPal-@react--paypal--js-003087?logo=paypal&logoColor=white)](https://www.npmjs.com/package/@paypal/react-paypal-js)

## 🛍️ Teslo Shop – E-commerce moderno con enfoque profesional

**Teslo Shop** es una aplicación de comercio electrónico construida con tecnologías de vanguardia, diseñada para ofrecer una experiencia de usuario fluida, accesible y visualmente atractiva. El proyecto simula un entorno de compra realista, integrando funcionalidades clave como autenticación, gestión de productos, procesamiento de pagos y administración de pedidos.

### ✨ Características destacadas

- **Frontend moderno:** Interfaz desarrollada con Next.js 14, React 19 y Tailwind CSS, optimizada para rendimiento y responsividad.
- **Gestión de estado eficiente:** Uso de Zustand para un manejo de estado global sencillo, predecible y escalable.
- **Validaciones robustas:** Formularios validados con Zod y React Hook Form, garantizando precisión y accesibilidad.
- **Animaciones elegantes:** Transiciones y feedback visual implementados con Framer Motion y Sonner para mejorar la experiencia del usuario.
- **Procesamiento de pagos:** Integración con PayPal Sandbox para simular flujos de pago reales.
- **Base de datos sólida:** PostgreSQL gestionado mediante Prisma ORM para consultas eficientes y tipadas.
- **Carga y gestión de imágenes:** Soporte para Cloudinary, permitiendo almacenamiento y transformación de imágenes en la nube.
- **Componentes reutilizables:** Arquitectura modular con componentes como `PreviousAddressesSelector` y `OrderStatus`, diseñados para escalabilidad.
- **Contenedor listo para producción:** Configuración con Docker para facilitar despliegue y consistencia entre entornos.

## 🧪 Tecnologías utilizadas

- [Next.js](https://nextjs.org)
- [React](https://es.react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwindcss](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
- [Sonner](https://github.com/emilkowalski/sonner)
- [Framer Motion](https://motion.dev/)
- [Zod](https://zod.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [React Icons](https://github.com/react-icons/react-icons)
- [Swiper](https://swiperjs.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Prisma](https://www.prisma.io/)
- [Node.js](https://nodejs.org/)
- [Auth.js](https://authjs.dev/)
- [PayPal](https://www.npmjs.com/package/@paypal/react-paypal-js)

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

6. Ejecutar seed para insertar datos de relleno en la base datos, no se insertan ordenes ni direcciones.
> ℹ️ ¡Advertencia, si hay datos previos los eliminará!

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

## 🧪 Usuarios de prueba generados por `npm run seed`

Después de ejecutar el script de seed (`npm run seed`), se insertarán automáticamente **tres usuarios** en la base de datos. Puedes utilizarlos para probar flujos de autenticación y gestión de roles.

| Rol           | Email                     | Contraseña |
|---------------|---------------------------|------------|
| Admin         | correo@correo.com         | password   |
| User          | margarita@margarita.com   | password   |
| User          | luis@luis.com             | password   |

> ℹ️ Todos los usuarios tienen contraseñas que se encryptan antes de subirlas en la base de datos. Recuerda cambiarlas o eliminarlas antes de subir a producción.

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