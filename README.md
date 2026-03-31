# Sistema de autenticación full stack

Aplicación desarrollada con React y Node.js que permite:

- Registro de usuarios
- Inicio de sesión con autenticación segura
- Verificación de identidad mediante PIN
- Cambio de contraseña protegido
- Manejo de sesiones con JWT en cookies

-------------------------------------------------------------------

# Tecnologías usadas

## FrontEnd

- React
- Axios
- Reac Router
- TailwindCss

## BackEnd

- Node.js
- Express
- MySQL (mysql2)
- JWT
- bcrypt
- Zod

## Base de Datos

- MySQL

-------------------------------------------------------------------

# Arquitectura

- FrontEnd ( React )
- BackEnd ( Nodejs )
- Base de Datos ( MySQL )

-------------------------------------------------------------------

# Estructura

/backend
- server-mysql.js
- index.js
- config.js
- routes/
- schemas/
- database/
- controllers/
- middlewares/

/frontend

-------------------------------------------------------------------

# Arranque

/backend
- cd backend
- node --watch server-mysql.js

/frontend
- cd frontend
- npm run dev

-------------------------------------------------------------------

# API Endpoints (todos inician con mayúscula menos "/me")

- .GET/Users ( Obtiene a todos los usuarios)
- .POST/Register ( Registra un nuevo usuario )
- .POST/Login ( Verifica las credenciales y admite el inicio de sesión )
- .GET/me ( Confirma y trae el token para permitir entrar a las rutas protegidas)
- .POST/Logout ( Hace el cierre de sesión actual )
- .GET/User/id ( Obtiene a un usuario por su ID )
- .PATCH/User/id ( Actualiza la contraseña o el pin del usuario por su ID )
- .PATCH/Recover ( Cambia la contraseña del usuario por si la olvida )
- .POST/Pin ( Revisa el pin para poder realizar el cambio de contraseña esté o no iniciado sesion ( si no está iniciado pedirá el correo igualmente ) )
- .DELETE/User/id ( Elimina un usuario por su ID )

-------------------------------------------------------------------

# Autenticación

- Uso de JWT almacenado en cookies httpOnly
- Validación mediante el endpoint ["/me"]
- Protección de rutas en el FrontEnd

## Flujo

- Usuario inicia sesión
- BackEnd genera token
- Token se guarda en cookie
- FrontEnd valida sesión con ["/me"]

-------------------------------------------------------------------
-------------------------------------------------------------------

# Terminado por primera vez el 30 de Marzo de 2026, de aqui en adelante seguirá mostrandose alguna actualización

- Contador de clicks con intervalo de 10 segundos en frontend/src/pages/Dashboard.jsx 30 de Marzo de 2026