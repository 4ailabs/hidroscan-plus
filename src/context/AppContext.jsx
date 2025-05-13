import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AppContext = createContext();

// Configuración por defecto
const configInicial = {
  temaOscuro: false,
  colorPrimario: "#2563eb",
  colorSecundario: "#1e40af",
  colorFondo: "#F8F9FA",
  colorTexto: "#212529",
  colorError: "#dc2626",
  colorWarning: "#f59e0b",
  colorSuccess: "#16a34a",
  mostrarBarraProgreso: true,
  logoUrl: "/logo.svg",
  nombreApp: "HidroScanPlus",
  fontSizeBase: 16,
  bordeRedondeado: 12,
  estiloTarjeta: "elevado",
  animaciones: true,
  mostrarBiomarcadores: false,
  incluirRecomendaciones: true,
  mostrarNivelesIncertidumbre: true,
};

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  // Estados de la aplicación
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState(null);
  const [pantallaActual, setPantallaActual] = useState('inicio');
  const [seccionActual, setSeccionActual] = useState(0);
  const [mostrarReferencias, setMostrarReferencias] = useState(false);
  const [config, setConfig] = useState(configInicial);
  
  // Funciones para actualizar estados
  const actualizarRespuesta = (preguntaId, valor) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: valor }));
  };
  
  const navegarA = (pantalla) => {
    setPantallaActual(pantalla);
    
    // Si navegamos al inicio, reseteamos la sección actual
    if (pantalla === 'inicio') {
      setSeccionActual(0);
    }
    
    // Si navegamos a resultados, calculamos los resultados (implementar lógica después)
    if (pantalla === 'resultados') {
      // Por ahora simulamos resultados
      if (Object.keys(respuestas).length > 0 && !resultados) {
        console.log('Se calcularian resultados aquí basados en las respuestas');
        // setResultados(calcularResultados(respuestas));
      }
    }
  };
  
  const cambiarSeccion = (direccion) => {
    if (direccion === 'siguiente') {
      setSeccionActual(prev => prev + 1);
    } else if (direccion === 'anterior') {
      setSeccionActual(prev => Math.max(0, prev - 1));
    }
  };
  
  const actualizarConfig = (nuevaConfig) => {
    setConfig(prev => ({ ...prev, ...nuevaConfig }));
  };
  
  // Valor del contexto que se proporcionará
  const contexto = {
    respuestas, actualizarRespuesta,
    resultados, setResultados,
    pantallaActual, navegarA,
    seccionActual, cambiarSeccion,
    mostrarReferencias, setMostrarReferencias,
    config, actualizarConfig
  };
  
  // Using React.createElement instead of JSX syntax
  return React.createElement(
    AppContext.Provider,
    { value: contexto },
    children
  );
};

// Hook personalizado para usar el contexto
export const useApp = () => useContext(AppContext);

export default AppContext;