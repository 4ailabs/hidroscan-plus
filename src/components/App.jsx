import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/globalStyles';
import { theme, darkTheme } from '../styles/theme';
import PantallaInicio from './PantallaInicio';
import Cuestionario from './Cuestionario/index';
import ResultadosVitaminas from './ResultadosVitaminas';
import { NUTRIENTES_INFO } from '../data/nutrientesInfo';
import { useApp } from '../context/AppContext';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  min-height: 80vh;
  border-radius: ${props => props.borderRadius || 12}px;
  overflow: hidden;
  background-color: ${props => props.temaOscuro ? props.theme.colors.dark : 'white'};
  box-shadow: ${props => props.estiloTarjeta === 'elevado' ? props.theme.shadows.md : 'none'};
  border: ${props => props.estiloTarjeta === 'plano' ? `1px solid ${props.theme.colors.text}20` : 'none'};
  display: flex;
  flex-direction: column;
  
  @media (max-width: 640px) {
    max-width: 100%;
    height: 100vh;
    min-height: 100vh;
    border-radius: 0;
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 5px 0;
  text-align: center;
  font-size: ${props => props.theme.fonts.baseSize * 0.7}px;
  color: ${props => props.theme.colors.text}80;
  background-color: ${props => props.temaOscuro ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.03)'};
  border-top: 1px solid ${props => props.temaOscuro ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'};
`;

// Valores predeterminados
const defaultConfig = {
  temaOscuro: false,
  colorPrimario: "#2563eb",
  colorSecundario: "#1e40af",
  colorFondo: "#F8F9FA",
  colorTexto: "#212529",
  colorError: "#dc2626",
  colorWarning: "#f59e0b",
  colorSuccess: "#16a34a",
  mostrarBarraProgreso: true,
  mostrarBiomarcadores: true, // Aseguramos que se muestre la sección de biomarcadores
  logoUrl: "logo.svg",
  nombreApp: "HidroScanPlus",
  fontSizeBase: 16,
  bordeRedondeado: 12,
  estiloTarjeta: "elevado",
  animaciones: true
};

const App = () => {
  // Obtener el contexto global (si está disponible)
  const appContext = useApp();
  
  // Estados locales (como respaldo si el contexto no está disponible)
  const [pantallaActualLocal, setPantallaActualLocal] = useState('inicio');
  const [respuestasLocal, setRespuestasLocal] = useState({});
  const [resultadosLocal, setResultadosLocal] = useState(null);
  const [configLocal, setConfigLocal] = useState(defaultConfig);
  
  // Usar valores del contexto si están disponibles, de lo contrario usar estados locales
  const pantallaActual = appContext?.pantallaActual || pantallaActualLocal;
  const respuestas = appContext?.respuestas || respuestasLocal;
  const resultados = appContext?.resultados || resultadosLocal;
  const config = appContext?.config || configLocal;
  
  // Función para navegar entre pantallas
  const navegarA = (pantalla, data) => {
    console.log("Navegando a:", pantalla, data);
    
    try {
      if (pantalla === 'resultados' && data?.respuestas) {
        // Calculamos los resultados antes de cambiar de pantalla
        const resultadosCalculados = calcularResultados(data.respuestas);
        
        // Si tenemos contexto, usamos sus funciones, de lo contrario usamos las locales
        if (appContext?.setRespuestas && appContext?.setResultados) {
          appContext.setRespuestas(data.respuestas);
          appContext.setResultados(resultadosCalculados);
        } else {
          setRespuestasLocal(data.respuestas);
          setResultadosLocal(resultadosCalculados);
        }
      }
      
      // Actualizar la pantalla actual
      if (appContext?.navegarA) {
        appContext.navegarA(pantalla);
      } else {
        setPantallaActualLocal(pantalla);
      }
    } catch (error) {
      console.error("Error al navegar:", error);
      // Usar el estado local como fallback
      setPantallaActualLocal(pantalla);
    }
  };
  
  // Función para evaluar la intensidad de síntomas
  const evaluarIntensidadSintoma = (respuesta, escala = ["Nunca", "Raramente", "A veces", "Frecuentemente", "Siempre"]) => {
    if (!respuesta) return 0;
    const indice = escala.indexOf(respuesta);
    if (indice <= 0) return 0;
    return (1 / (1 + Math.exp(-1.5 * (indice - 2)))) * 2 - 0.3;
  };

  // Función para calcular protección nutricional
  const calcularProteccionNutricional = (frecuencia, intensidadEfecto = 1.0) => {
    if (!frecuencia) return 0;
    const frecuenciaValores = {
      "Nunca": 0,
      "1-2 veces/mes": 0.15,
      "1-2 veces/semana": 0.3,
      "3-4 veces/semana": 0.6,
      "Diariamente": 1.0,
    };
    const valorFrecuencia = frecuenciaValores[frecuencia] || 0;
    if (valorFrecuencia <= 0) return 0;
    return Math.pow(valorFrecuencia, 0.7) * intensidadEfecto;
  };
  
  // Función para calcular el IMC
  const calcularIMC = (peso, altura) => {
    if (!peso || !altura || peso <= 0 || altura <= 0) return null;
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    return imc;
  };

  // Función para obtener categoría de IMC
  const obtenerCategoriaIMC = (imc) => {
    if (!imc) return null;
    let categoria = { nombre: "normal", riesgo: "bajo" };
    
    if (imc < 18.5) {
      categoria = { nombre: "bajo peso", riesgo: "moderado" };
    } else if (imc >= 25) {
      categoria = { nombre: "sobrepeso", riesgo: "moderado" };
    }
    if (imc >= 30) {
      categoria = { nombre: "obesidad", riesgo: "alto" };
    }
    
    return categoria;
  };
  
  // Función principal para calcular los resultados
  const calcularResultados = (respuestasUsuario) => {
    const resultados = {};
    
    // Para cada nutriente, calculamos su puntaje
    Object.keys(NUTRIENTES_INFO).forEach(nutrienteKey => {
      const infoNutriente = NUTRIENTES_INFO[nutrienteKey];
      let puntajeBase = 0;
      
      // Evaluar IMC si tenemos datos de peso y altura
      let categoriaIMC = null;
      if (respuestasUsuario.peso && respuestasUsuario.altura) {
        const imc = calcularIMC(respuestasUsuario.peso, respuestasUsuario.altura);
        categoriaIMC = obtenerCategoriaIMC(imc);
        
        // Bajo peso aumenta ligeramente el riesgo basal para todos los nutrientes
        if (categoriaIMC && categoriaIMC.nombre === "bajo peso") {
          puntajeBase += 0.8;
        }
      }
      
      // Factores base según perfil de usuario
      switch (nutrienteKey) {
        case 'B12':
          // Mayor riesgo en veganos/vegetarianos
          if (respuestasUsuario.alimentacion === "Vegana (ningún producto animal)") {
            puntajeBase += 6;
          } else if (respuestasUsuario.alimentacion === "Vegetariana (sin carne ni pescado)") {
            puntajeBase += 3.5;
          }
          // Mayor riesgo en adultos mayores
          if (respuestasUsuario.edad && respuestasUsuario.edad > 65) {
            puntajeBase += 2;
          }
          
          // Añadir consideración de pérdida de peso para B12
          if (respuestasUsuario.perdida_peso && 
              ["Sí, entre 5-10% de mi peso", "Sí, más del 10% de mi peso"].includes(respuestasUsuario.perdida_peso)) {
            puntajeBase += 1.5;
          }
          break;
          
        case 'B9':
          // Mayor riesgo en embarazadas
          if (respuestasUsuario.embarazo === "Embarazada" || 
              respuestasUsuario.embarazo === "Embarazada y lactancia") {
            puntajeBase += 3;
            
            // Añadir consideración de trimestre para B9
            if (respuestasUsuario.trimestre_embarazo === "Primer trimestre") {
              puntajeBase += 1.5; // Mayor riesgo en primer trimestre
            }
          }
          break;
          
        case 'C':
          // Mayor riesgo en fumadores
          if (respuestasUsuario.tabaco === "Fumador") {
            puntajeBase += 2;
          }
          
          // Mayor riesgo con pérdida de peso rápida
          if (respuestasUsuario.perdida_peso === "Sí, más del 10% de mi peso") {
            puntajeBase += 1.2;
          }
          break;
          
        // Para los demás nutrientes, comenzamos con un puntaje base bajo
        default:
          puntajeBase += 1;
      }
      
      // Evaluamos síntomas relacionados con este nutriente
      let puntajeSintomas = 0;
      let contadorSintomas = 0;
      
      // Recorremos las respuestas buscando síntomas relacionados
      Object.keys(respuestasUsuario).forEach(preguntaId => {
        // Evaluamos síntomas de escala
        if (
          respuestasUsuario[preguntaId] && 
          ["A veces", "Frecuentemente", "Siempre"].includes(respuestasUsuario[preguntaId])
        ) {
          // Buscamos la pregunta en las secciones
          const seccionesConPregunta = [
            "sintomas_generales",
            "sintomas_especificos"
          ];
          
          // Simplificado para este ejemplo
          const esRelevante = preguntaId.includes('fatiga') || 
                             preguntaId.includes('debilidad') || 
                             preguntaId.includes('hormigueo') || 
                             preguntaId.includes('mareos');
                             
          if (esRelevante) {
            const intensidad = evaluarIntensidadSintoma(respuestasUsuario[preguntaId]);
            puntajeSintomas += intensidad * 2; // Multiplicador general
            contadorSintomas++;
          }
        }
      });
      
      // Evaluamos factores de protección (consumo de alimentos ricos en este nutriente)
      let proteccionNutricional = 0;
      
      // Alimentos específicos para cada nutriente
      switch (nutrienteKey) {
        case 'B12':
          if (respuestasUsuario.carnes) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.carnes, 1.5);
          }
          if (respuestasUsuario.pescados) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.pescados, 1.3);
          }
          if (respuestasUsuario.lacteos) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.lacteos, 1.0);
          }
          if (respuestasUsuario.huevos) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.huevos, 0.8);
          }
          break;
          
        case 'B9':
          if (respuestasUsuario.verduras) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.verduras, 1.5);
          }
          if (respuestasUsuario.legumbres) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.legumbres, 1.3);
          }
          break;
          
        case 'C':
          if (respuestasUsuario.citricos) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.citricos, 1.8);
          }
          if (respuestasUsuario.verduras) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.verduras, 1.0);
          }
          break;
          
        // Para los demás nutrientes, aplicamos factores genéricos
        default:
          if (respuestasUsuario.verduras) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.verduras, 0.7);
          }
          if (respuestasUsuario.frutas) {
            proteccionNutricional += calcularProteccionNutricional(respuestasUsuario.frutas, 0.5);
          }
      }
      
      // Evaluamos suplementación
      if (respuestasUsuario.multivitaminico && respuestasUsuario.multivitaminico !== "No") {
        proteccionNutricional += 1.5;
      }
      
      // Si toma suplementos específicos de este nutriente
      if (nutrienteKey === 'B12' && respuestasUsuario.suplementos_b && 
          respuestasUsuario.suplementos_b.includes("B12 (cobalamina/metilcobalamina)")) {
        proteccionNutricional += 3;
      }
      
      // Calculamos puntaje final
      let puntajeFinal = puntajeBase + (puntajeSintomas / Math.max(1, contadorSintomas)) - proteccionNutricional;
      
      // Normalizamos entre 0 y 10
      puntajeFinal = Math.max(0, Math.min(10, puntajeFinal));
      
      // Aplicamos ponderación según importancia del nutriente
      puntajeFinal = puntajeFinal * (infoNutriente.ponderacionTotal || 1.0);
      
      // Guardamos el resultado
      resultados[nutrienteKey] = parseFloat(puntajeFinal.toFixed(1));
    });
    
    return resultados;
  };
  
  // Combinar tema base con configuración personalizada
  const temaCompleto = {
    ...(config.temaOscuro ? darkTheme : theme),
    colors: {
      ...(config.temaOscuro ? darkTheme.colors : theme.colors),
      primary: config.colorPrimario,
      secondary: config.colorSecundario,
      background: config.colorFondo,
      text: config.colorTexto,
      error: config.colorError,
      warning: config.colorWarning,
      success: config.colorSuccess,
    },
    fonts: {
      ...(config.temaOscuro ? darkTheme.fonts : theme.fonts),
      baseSize: config.fontSizeBase || theme.fonts.baseSize,
    },
  };
  
  // Renderizar la pantalla actual
  const renderizarPantallaActual = () => {
    try {
      switch (pantallaActual) {
        case 'inicio':
          return <PantallaInicio navegarA={navegarA} />;
        case 'cuestionario':
          return <Cuestionario navegarA={navegarA} />;
        case 'resultados':
          return <ResultadosVitaminas resultados={resultados} navegarA={navegarA} />;
        default:
          return <PantallaInicio navegarA={navegarA} />;
      }
    } catch (error) {
      console.error("Error al renderizar pantalla:", error);
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h2>Error al cargar la pantalla</h2>
          <p>Ha ocurrido un error inesperado. Por favor, intenta recargar la página.</p>
          <button onClick={() => window.location.reload()}>Recargar página</button>
        </div>
      );
    }
  };

  return (
    <ThemeProvider theme={temaCompleto}>
      <GlobalStyles />
      <AppContainer>
        <ContentContainer 
          borderRadius={config.bordeRedondeado} 
          temaOscuro={config.temaOscuro}
          estiloTarjeta={config.estiloTarjeta}
        >
          {renderizarPantallaActual()}
          
          <Footer temaOscuro={config.temaOscuro}>
            {config.nombreApp} v2.0 © {new Date().getFullYear()}
          </Footer>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
