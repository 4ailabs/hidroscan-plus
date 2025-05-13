/**
 * Colección de funciones de utilidad para la aplicación
 */

/**
 * Formatea un texto para mostrarlo capitalizado
 * @param {string} texto - Texto a formatear
 * @returns {string} - Texto con la primera letra en mayúscula
 */
export const capitalizar = (texto) => {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

/**
 * Formatea un identificador de tipo snake_case a texto legible
 * @param {string} id - Identificador en formato snake_case
 * @returns {string} - Texto formateado legible
 */
export const formatearIdentificador = (id) => {
  if (!id) return '';
  return id
    .split('_')
    .map(palabra => capitalizar(palabra))
    .join(' ');
};

/**
 * Genera un color basado en un valor numérico dentro de un rango
 * @param {number} valor - Valor a representar
 * @param {number} min - Valor mínimo del rango
 * @param {number} max - Valor máximo del rango
 * @param {boolean} invertido - Si true, valores más altos producen colores "mejores"
 * @returns {string} - Color en formato hexadecimal
 */
export const colorDesdeValor = (valor, min = 0, max = 10, invertido = false) => {
  // Normalizar valor entre 0 y 1
  const normalizado = Math.max(0, Math.min(1, (valor - min) / (max - min)));
  const valorAjustado = invertido ? 1 - normalizado : normalizado;
  
  // Generar colores
  const r = Math.round(valorAjustado < 0.5 ? 255 : 255 * (1 - 2 * (valorAjustado - 0.5)));
  const g = Math.round(valorAjustado > 0.5 ? 255 : 255 * 2 * valorAjustado);
  const b = 50;
  
  // Convertir a hexadecimal
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Trunca un texto a una longitud máxima y añade puntos suspensivos
 * @param {string} texto - Texto a truncar
 * @param {number} longitud - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncarTexto = (texto, longitud = 100) => {
  if (!texto || texto.length <= longitud) return texto;
  return texto.slice(0, longitud) + '...';
};

/**
 * Filtra un objeto eliminando propiedades con valores undefined o null
 * @param {Object} objeto - Objeto a filtrar
 * @returns {Object} - Objeto sin propiedades nulas o indefinidas
 */
export const limpiarObjeto = (objeto) => {
  return Object.fromEntries(
    Object.entries(objeto).filter(([_, v]) => v != null)
  );
};

/**
 * Genera un identificador único basado en la fecha actual y un valor aleatorio
 * @returns {string} - Identificador único
 */
export const generarId = () => {
  return `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Redondea un número a un número específico de decimales
 * @param {number} numero - Número a redondear
 * @param {number} decimales - Número de decimales a mantener
 * @returns {number} - Número redondeado
 */
export const redondear = (numero, decimales = 1) => {
  const factor = Math.pow(10, decimales);
  return Math.round(numero * factor) / factor;
};

/**
 * Analiza un texto para extraer variables entre llaves
 * @param {string} texto - Texto con variables en formato {variable}
 * @param {Object} valores - Objeto con valores para reemplazar variables
 * @returns {string} - Texto con variables reemplazadas
 */
export const procesarPlantilla = (texto, valores) => {
  if (!texto) return '';
  
  return texto.replace(/\{(\w+)\}/g, (match, variable) => {
    return valores[variable] !== undefined ? valores[variable] : match;
  });
};

export default {
  capitalizar,
  formatearIdentificador,
  colorDesdeValor,
  truncarTexto,
  limpiarObjeto,
  generarId,
  redondear,
  procesarPlantilla
};