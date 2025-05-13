import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext.jsx';
import useEvaluacion from '../../hooks/useEvaluacion';
import TarjetaVitamina from './TarjetaVitamina';
import GraficoNivel from './GraficoNivel';
import Referencias from './Referencias';

// Contenedor principal de resultados
const ResultadosContainer = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  background-color: ${props => props.temaOscuro ? props.theme.colors.secondary : props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

// Título principal
const Titulo = styled.h2`
  font-size: ${props => props.theme.fonts.baseSize * 1.4}px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
`;

// Alerta para mostrar calidad de la evaluación
const AlertaCalidad = styled.div`
  background-color: ${props => {
    switch (props.calidad) {
      case 'alta': return props.theme.colors.success + '22';
      case 'media': return props.theme.colors.warning + '22';
      default: return props.theme.colors.error + '22';
    }
  }};
  border-left: 4px solid ${props => {
    switch (props.calidad) {
      case 'alta': return props.theme.colors.success;
      case 'media': return props.theme.colors.warning;
      default: return props.theme.colors.error;
    }
  }};
  padding: 12px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: ${props => props.theme.fonts.baseSize * 0.9}px;
`;

// Título de la alerta
const AlertaTitulo = styled.strong`
  display: block;
  margin-bottom: 5px;
`;

// Párrafo de la alerta
const AlertaParrafo = styled.p`
  margin: 5px 0 0;
`;

// Sección para el resumen de resultados
const SeccionResumen = styled.div`
  margin-bottom: 25px;
`;

// Título de sección
const TituloSeccion = styled.h3`
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  margin-bottom: 15px;
`;

// Contenedor de tarjetas resumen
const ResumenCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

// Sección para resultados detallados
const SeccionDetalle = styled.div`
  margin-bottom: 30px;
`;

// Contenedor de botones de navegación
const BotonesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
`;

// Botón de navegación
const Boton = styled.button`
  background-color: ${props => props.primario 
    ? props.theme.colors.primary 
    : 'transparent'
  };
  color: ${props => props.primario 
    ? 'white' 
    : props.theme.colors.primary
  };
  border: ${props => props.primario 
    ? 'none' 
    : `1px solid ${props.theme.colors.primary}`
  };
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 10px 20px;
  font-size: ${props => props.theme.fonts.baseSize}px;
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primario 
      ? props.theme.colors.secondary 
      : props.theme.colors.primary + '11'
    };
  }
`;

// Aviso legal
const AvisoLegal = styled.div`
  font-size: ${props => props.theme.fonts.baseSize * 0.8}px;
  color: ${props => props.theme.colors.text}99;
  margin-bottom: 20px;
  text-align: center;
  padding: 0 15px;
`;

/**
 * Componente para mostrar los resultados de la evaluación
 * @returns {JSX.Element} - Elemento de React
 */
const Resultados = () => {
  const { navegarA, respuestas, config } = useApp();
  const [mostrarReferencias, setMostrarReferencias] = useState(false);
  
  // Usar el hook de evaluación para obtener resultados
  const { resultados, calidad, cargando, error } = useEvaluacion(respuestas);
  
  // Obtener configuración de tema
  const { 
    temaOscuro, 
    colorSuccess, 
    colorWarning, 
    colorError, 
    colorTexto,
    fontSizeBase,
    bordeRedondeado,
    estiloTarjeta,
    colorPrimario
  } = config;
  
  // Mostrar mensaje de carga si está procesando la evaluación
  if (cargando) {
    return (
      <ResultadosContainer temaOscuro={temaOscuro}>
        <div style={{
          padding: 20,
          textAlign: 'center',
          color: colorTexto,
        }}>
          Calculando resultados... Por favor, espere.
        </div>
      </ResultadosContainer>
    );
  }
  
  // Mostrar error si ocurrió alguno
  if (error) {
    return (
      <ResultadosContainer temaOscuro={temaOscuro}>
        <div style={{
          padding: 20,
          textAlign: 'center',
          color: colorError,
        }}>
          {error}
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Boton onClick={() => navegarA('cuestionario')}>
            Volver al cuestionario
          </Boton>
        </div>
      </ResultadosContainer>
    );
  }
  
  // Si no hay resultados, mostrar mensaje de error
  if (!resultados || Object.keys(resultados).length === 0) {
    return (
      <ResultadosContainer temaOscuro={temaOscuro}>
        <div style={{
          padding: 20,
          textAlign: 'center',
          color: colorTexto,
        }}>
          No hay resultados para mostrar. Por favor, complete el cuestionario primero.
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Boton onClick={() => navegarA('cuestionario')}>
            Ir al cuestionario
          </Boton>
        </div>
      </ResultadosContainer>
    );
  }
  
  // Ordenar vitaminas por nivel de riesgo
  const vitaminasPorRiesgo = Object.entries(resultados)
    .filter(([, vitamina]) => vitamina && vitamina.nivel)
    .sort((a, b) => {
      const ordenNivel = {
        bajo: 0,
        medio: 1,
        alto: 2,
        critico: 3,
        desconocido: -1,
      };
      return (
        (ordenNivel[b[1].nivel] ?? -1) -
        (ordenNivel[a[1].nivel] ?? -1)
      );
    });
  
  // Función para desplazarse a la tarjeta detallada de una vitamina
  const scrollToVitamina = (vitaminaId) => {
    const elemento = document.getElementById(`vitamina-${vitaminaId}`);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <ResultadosContainer temaOscuro={temaOscuro}>
      <Titulo>Resultados de la evaluación</Titulo>
      
      <AlertaCalidad calidad={calidad.global}>
        <AlertaTitulo>
          Fiabilidad de la evaluación:{' '}
          {calidad.global === 'alta'
            ? 'Alta'
            : calidad.global === 'media'
              ? 'Media'
              : 'Baja'}
        </AlertaTitulo>
        <AlertaParrafo>
          {calidad.global === 'alta'
            ? 'La evaluación tiene un alto nivel de precisión.'
            : calidad.global === 'media'
              ? 'Precisión moderada. Completar más preguntas mejoraría los resultados.'
              : 'Baja precisión por información insuficiente. Completar más secciones.'}
        </AlertaParrafo>
      </AlertaCalidad>
      
      <SeccionResumen>
        <TituloSeccion>Resumen de riesgo por vitamina</TituloSeccion>
        <ResumenCards>
          {vitaminasPorRiesgo.map(([key, vitamina]) => (
            <GraficoNivel
              key={key}
              vitaminaId={key}
              datos={vitamina}
              onClick={() => scrollToVitamina(key)}
            />
          ))}
        </ResumenCards>
      </SeccionResumen>
      
      <SeccionDetalle>
        <TituloSeccion>Resultados detallados</TituloSeccion>
        {vitaminasPorRiesgo.map(([key, vitamina]) => (
          <TarjetaVitamina
            key={key}
            vitamina={key}
            datos={vitamina}
          />
        ))}
      </SeccionDetalle>
      
      <BotonesContainer>
        <Boton 
          onClick={() => setMostrarReferencias(!mostrarReferencias)}
        >
          {mostrarReferencias ? 'Ocultar referencias' : 'Ver referencias'}
        </Boton>
        <Boton 
          primario
          onClick={() => navegarA('inicio')}
        >
          Finalizar evaluación
        </Boton>
      </BotonesContainer>
      
      {mostrarReferencias && <Referencias />}
      
      <AvisoLegal>
        <p>
          Esta evaluación proporciona una estimación del riesgo. No constituye un diagnóstico médico.
        </p>
        <p>
          Consulte con un profesional de la salud antes de tomar decisiones sobre su salud nutricional.
        </p>
      </AvisoLegal>
    </ResultadosContainer>
  );
};

export default Resultados;