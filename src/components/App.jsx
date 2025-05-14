import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/globalStyles';
import { theme, darkTheme } from '../styles/theme';
import PantallaInicio from './PantallaInicio';
import Cuestionario from './Cuestionario/index';
import ResultadosVitaminas from './ResultadosVitaminas';
import { NUTRIENTES_INFO } from '../data/nutrientesInfo';

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
  logoUrl: "logo.svg",
  nombreApp: "HidroScanPlus",
  fontSizeBase: 16,
  bordeRedondeado: 12,
  estiloTarjeta: "elevado",
  animaciones: true
};

const App = () => {
  // Estados principales
  const [pantallaActual, setPantallaActual] = useState('inicio');
  const [respuestas, setRespuestas] = useState({});
  const [resultados, setResultados] = useState(null);
  const [config, setConfig] = useState(defaultConfig);
  
  // Función para navegar entre pantallas
  const navegarA = (pantalla, data) => {
    console.log("Navegando a:", pantalla, data);
    
    if (pantalla === 'resultados' && data?.respuestas) {
      // Calculamos los resultados antes de cambiar de pantalla
      const resultadosCalculados = calcularResultados(data.respuestas);
      setRespuestas(data.respuestas);
      setResultados(resultadosCalculados);
    }
    
    setPantallaActual(pantalla);
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
  
  // Función principal para calcular los resultados
  const calcularResultados = (respuestasUsuario) => {
    const resultados = {};
    
    // Para cada nutriente, calculamos su puntaje
    Object.keys(NUTRIENTES_INFO).forEach(nutrienteKey => {
      const infoNutriente = NUTRIENTES_INFO[nutrienteKey];
      let puntajeBase = 0;
      
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
          break;
          
        case 'B9':
          // Mayor riesgo en embarazadas
          if (respuestasUsuario.embarazo === "Embarazada" || 
              respuestasUsuario.embarazo === "Embarazada y lactancia") {
            puntajeBase += 3;
          }
          break;
          
        case 'C':
          // Mayor riesgo en fumadores
          if (respuestasUsuario.tabaco === "Fumador") {
            puntajeBase += 2;
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