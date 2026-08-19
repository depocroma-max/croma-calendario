// =====================================================
//  CROMA SESIÓN — módulo de sesión compartido
//
//  Único punto de verdad para leer/validar el JWT que emite el hub
//  (croma-app.com.ar) y para saber contra qué backend hablar
//  (croma-backend, api.croma-app.com.ar). Nace para sacar a AVISOS de
//  su dependencia de las variables sueltas BACKEND_URL/_getToken que
//  hoy define app.js — el objetivo es que este archivo se pueda copiar
//  tal cual a un repo nuevo (ej. croma-calendario) sin arrastrar nada
//  de horarios.
//
//  No reemplaza la sesión propia de horarios (sesionActual en app.js,
//  con su lógica de "empleado desde Croma App" vía croma_horarios_session)
//  — ese flujo sigue igual. Esto es la mitad genérica: JWT del hub +
//  backend URL, que cualquier app de Croma necesita.
// =====================================================

(function () {
  'use strict';

  var BACKEND_URL = 'https://api.croma-app.com.ar';
  var HUB_URL = 'https://croma-app.com.ar/';

  // Token vía #token=... o ?token=... (no queda en logs del servidor,
  // mismo patrón que usa horarios/panel al llegar desde el hub).
  //
  // Al limpiar la URL se saca SOLO la clave 'token' del hash, nunca el
  // hash completo — bug real encontrado en croma-horarios-main
  // (2026-08-19): pisar todo el hash con location.pathname + search le
  // borraba a app.js su propio parámetro (hsession) antes de que
  // llegara a leerlo, porque este script se carga primero a propósito.
  // Acá Calendario no tiene un parámetro propio en el hash hoy, pero se
  // deja igual de cuidadoso — es el mismo archivo, portado tal cual.
  function _leerTokenDeUrl() {
    var hashParams = new URLSearchParams(location.hash.slice(1));
    var searchParams = new URLSearchParams(location.search);
    var token = hashParams.get('token') || searchParams.get('token');
    if (token) {
      sessionStorage.setItem('croma_token', token);
      if (hashParams.has('token')) {
        hashParams.delete('token');
        var nuevoHash = hashParams.toString();
        var nuevaUrl = location.pathname + location.search + (nuevoHash ? '#' + nuevoHash : '');
        history.replaceState(null, '', nuevaUrl);
      }
    }
  }
  _leerTokenDeUrl();

  function obtenerToken() {
    return sessionStorage.getItem('croma_token') || localStorage.getItem('croma_token');
  }

  function _decodificar(token) {
    try {
      var payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.exp * 1000 < Date.now()) return null;
      return payload;
    } catch (e) {
      return null;
    }
  }

  // Devuelve { usuario, nombre, rol, sucursal } o null si no hay sesión
  // válida. No decide qué hacer si es null — eso lo decide quien llama
  // (requerirSesion() abajo, o cada app según su propio criterio).
  function usuarioActual() {
    var token = obtenerToken();
    if (!token) return null;
    var payload = _decodificar(token);
    if (!payload) return null;
    return {
      usuario: payload.usuario || null,
      nombre: payload.usuario ? payload.usuario.charAt(0).toUpperCase() + payload.usuario.slice(1) : '',
      rol: payload.rol || null,
      sucursal: payload.sucursal || ''
    };
  }

  function irAlHub(logout) {
    if (logout) {
      sessionStorage.removeItem('croma_token');
      localStorage.removeItem('croma_token');
    }
    location.href = HUB_URL + (logout ? '?logout=1' : '');
  }

  // Uso típico al iniciar una pantalla: var u = CromaSesion.requerirSesion(['admin','jefe']);
  // if (!u) return; // ya redirigió al hub
  function requerirSesion(rolesPermitidos) {
    var u = usuarioActual();
    if (!u) {
      irAlHub();
      return null;
    }
    if (rolesPermitidos && rolesPermitidos.indexOf(u.rol) === -1) {
      irAlHub();
      return null;
    }
    return u;
  }

  window.CromaSesion = {
    BACKEND_URL: BACKEND_URL,
    obtenerToken: obtenerToken,
    usuarioActual: usuarioActual,
    requerirSesion: requerirSesion,
    cerrarSesion: function () { irAlHub(true); },
    irAlHub: irAlHub
  };
})();
