# Croma Calendario

Módulo de Avisos y calendario interno, separado de `croma-horarios-main`.

Reutiliza `croma-ds.css` (diseño), `croma-icons.js` y el módulo de sesión
`croma-session.js` (JWT emitido por el hub, `croma-app.com.ar`). Habla
directo contra `croma-backend` (`/api/avisos/*`) — no depende de Apps
Script del lado del cliente.

Ver `docs/AVISOS_API.md` en `croma-horarios-main` para el contrato de la
API mientras no se duplique acá.

## Pendiente antes de producción

- Dar de alta el subdominio `calendario.croma-app.com.ar` (DNS + Pages) —
  el `CNAME` de este repo ya asume ese nombre.
- Sumar el origen `https://calendario.croma-app.com.ar` al CORS de
  `croma-backend` (probado en local: sin eso, los fetch a `/api/avisos/*`
  quedan bloqueados por el navegador).
- Agregar la card de "Calendario" en el hub (`Croma-app-main/index.html`).
