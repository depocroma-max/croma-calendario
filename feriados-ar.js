// =====================================================
//  FERIADOS ARGENTINA — calendario oficial
//
//  Fuente: Jefatura de Gabinete de Ministros (Ley 27.399, feriados
//  trasladables incluidos ya con la fecha real que corresponde) +
//  Resolución 164/2025 para los días no laborables con fines turísticos
//  ("puentes") de 2026. Cargado a mano el 2026-08-19 — no hay API propia,
//  hay que actualizar esta lista cada vez que el Gobierno publique el
//  calendario de un año nuevo (normalmente a mediados del año anterior).
//
//  tipo: 'nacional' (feriado inamovible o trasladable, no laborable real)
//        | 'turistico' (día no laborable "puente", decretado aparte —
//          no es un feriado real, es una recomendación de la ley de
//          feriados puente para armar fin de semana largo).
// =====================================================

(function () {
  'use strict';

  const FERIADOS = {
    // ── 2026 ──────────────────────────────────────────
    '2026-01-01': { nombre: 'Año Nuevo', corto: 'Año Nuevo', tipo: 'nacional' },
    '2026-02-16': { nombre: 'Carnaval', corto: 'Carnaval', tipo: 'nacional' },
    '2026-02-17': { nombre: 'Carnaval', corto: 'Carnaval', tipo: 'nacional' },
    '2026-03-23': { nombre: 'Día no laborable con fines turísticos', corto: 'Puente', tipo: 'turistico' },
    '2026-03-24': { nombre: 'Día Nacional de la Memoria por la Verdad y la Justicia', corto: 'Día de la Memoria', tipo: 'nacional' },
    '2026-04-02': { nombre: 'Día del Veterano y de los Caídos en la Guerra de Malvinas', corto: 'Malvinas', tipo: 'nacional' },
    '2026-04-03': { nombre: 'Viernes Santo', corto: 'Viernes Santo', tipo: 'nacional' },
    '2026-05-01': { nombre: 'Día del Trabajador', corto: 'Día del Trabajador', tipo: 'nacional' },
    '2026-05-25': { nombre: 'Día de la Revolución de Mayo', corto: 'Revolución de Mayo', tipo: 'nacional' },
    '2026-06-15': { nombre: 'Paso a la Inmortalidad del General Martín Miguel de Güemes', corto: 'Güemes', tipo: 'nacional' },
    '2026-06-20': { nombre: 'Paso a la Inmortalidad del General Manuel Belgrano', corto: 'Belgrano', tipo: 'nacional' },
    '2026-07-09': { nombre: 'Día de la Independencia', corto: 'Independencia', tipo: 'nacional' },
    '2026-07-10': { nombre: 'Día no laborable con fines turísticos', corto: 'Puente', tipo: 'turistico' },
    '2026-08-17': { nombre: 'Paso a la Inmortalidad del General José de San Martín', corto: 'San Martín', tipo: 'nacional' },
    '2026-10-12': { nombre: 'Día del Respeto a la Diversidad Cultural', corto: 'Diversidad Cultural', tipo: 'nacional' },
    '2026-11-23': { nombre: 'Día de la Soberanía Nacional', corto: 'Soberanía Nacional', tipo: 'nacional' },
    '2026-12-07': { nombre: 'Día no laborable con fines turísticos', corto: 'Puente', tipo: 'turistico' },
    '2026-12-08': { nombre: 'Día de la Inmaculada Concepción de María', corto: 'Inmaculada Concepción', tipo: 'nacional' },
    '2026-12-25': { nombre: 'Navidad', corto: 'Navidad', tipo: 'nacional' },

    // ── 2027 (feriados nacionales confirmados; los puentes/no laborables
    //    turísticos de 2027 todavía no estaban decretados al cargar esto) ──
    '2027-01-01': { nombre: 'Año Nuevo', corto: 'Año Nuevo', tipo: 'nacional' },
    '2027-02-08': { nombre: 'Carnaval', corto: 'Carnaval', tipo: 'nacional' },
    '2027-02-09': { nombre: 'Carnaval', corto: 'Carnaval', tipo: 'nacional' },
    '2027-03-24': { nombre: 'Día Nacional de la Memoria por la Verdad y la Justicia', corto: 'Día de la Memoria', tipo: 'nacional' },
    '2027-03-26': { nombre: 'Viernes Santo', corto: 'Viernes Santo', tipo: 'nacional' },
    '2027-04-02': { nombre: 'Día del Veterano y de los Caídos en la Guerra de Malvinas', corto: 'Malvinas', tipo: 'nacional' },
    '2027-05-01': { nombre: 'Día del Trabajador', corto: 'Día del Trabajador', tipo: 'nacional' },
    '2027-05-25': { nombre: 'Día de la Revolución de Mayo', corto: 'Revolución de Mayo', tipo: 'nacional' },
    '2027-06-20': { nombre: 'Paso a la Inmortalidad del General Manuel Belgrano', corto: 'Belgrano', tipo: 'nacional' },
    '2027-06-21': { nombre: 'Paso a la Inmortalidad del General Martín Miguel de Güemes', corto: 'Güemes', tipo: 'nacional' },
    '2027-07-09': { nombre: 'Día de la Independencia', corto: 'Independencia', tipo: 'nacional' },
    '2027-08-16': { nombre: 'Paso a la Inmortalidad del General José de San Martín', corto: 'San Martín', tipo: 'nacional' },
    '2027-10-11': { nombre: 'Día del Respeto a la Diversidad Cultural', corto: 'Diversidad Cultural', tipo: 'nacional' },
    '2027-11-20': { nombre: 'Día de la Soberanía Nacional', corto: 'Soberanía Nacional', tipo: 'nacional' },
    '2027-12-08': { nombre: 'Día de la Inmaculada Concepción de María', corto: 'Inmaculada Concepción', tipo: 'nacional' },
    '2027-12-25': { nombre: 'Navidad', corto: 'Navidad', tipo: 'nacional' },
  };

  function obtener(iso) {
    return FERIADOS[iso] || null;
  }

  window.CromaFeriados = { obtener: obtener };
})();
