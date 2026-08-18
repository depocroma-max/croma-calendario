// =====================================================
//  CROMA CONFIRM — diálogo de confirmación + toast, reutilizables
//
//  Puerto mínimo de mostrarConfirm()/cerrarConfirm()/showToast()
//  (croma-horarios-main/app.js) — mismo contrato exacto en los tres
//  casos. avisos.js asume que estas tres funciones existen como
//  globales (igual que en horarios, de donde viene ese archivo) — acá
//  nunca se cargaba app.js, así que faltaban por completo. Se separó a
//  su propio archivo (a diferencia de croma-session.js, que sí quedó
//  embebido conceptualmente en cada app) porque cualquier pantalla de
//  Calendario que necesite estos reemplazos de confirm()/alert() nativos
//  los puede reusar tal cual.
// =====================================================

(function () {
  'use strict';

  let _confirmCallback = null;

  function mostrarConfirm(opts) {
    opts = opts || {};
    const titulo = opts.titulo || '';
    const mensaje = opts.mensaje || '';
    const textoOk = opts.textoOk || 'Confirmar';
    const textoCancel = opts.textoCancel || 'Cancelar';
    const peligro = !!opts.peligro;
    _confirmCallback = opts.onOk;

    const existente = document.getElementById('cromaConfirmOverlay');
    if (existente) existente.remove();

    const div = document.createElement('div');
    div.id = 'cromaConfirmOverlay';
    div.className = 'croma-confirm-overlay';
    div.onclick = function (e) { if (e.target === div) cerrarConfirm(); };
    div.innerHTML =
      '<div class="croma-confirm-panel" onclick="event.stopPropagation()">' +
        '<div class="croma-confirm-titulo">' + titulo + '</div>' +
        '<div class="croma-confirm-mensaje">' + mensaje + '</div>' +
        '<div class="croma-confirm-acciones">' +
          '<button class="btn btn-outline" id="cromaConfirmCancelar">' + textoCancel + '</button>' +
          '<button class="btn ' + (peligro ? 'btn-danger' : 'btn-primary') + '" id="cromaConfirmOk">' + textoOk + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(div);
    document.body.style.overflow = 'hidden';

    document.getElementById('cromaConfirmCancelar').addEventListener('click', cerrarConfirm);
    document.getElementById('cromaConfirmOk').addEventListener('click', _confirmAceptar);
  }

  function cerrarConfirm() {
    const el = document.getElementById('cromaConfirmOverlay');
    if (el) el.remove();
    _confirmCallback = null;
    document.body.style.overflow = '';
  }

  function _confirmAceptar() {
    const cb = _confirmCallback;
    cerrarConfirm();
    if (typeof cb === 'function') cb();
  }

  function showToast(msg, duration) {
    const t = document.getElementById('toast');
    if (!t) return; // defensivo — nunca debería faltar, index.html ya lo trae
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, duration || 2500);
  }

  window.mostrarConfirm = mostrarConfirm;
  window.cerrarConfirm = cerrarConfirm;
  window.showToast = showToast;
})();
