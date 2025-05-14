import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import useCuestionario from '../../hooks/useCuestionario';
import { SECCIONES_CUESTIONARIO } from '../../data/cuestionario';
import Seccion from './Seccion';
import BarraProgreso from './BarraProgreso';

// Contenedor principal del cuestionario
const CuestionarioContainer = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// Encabezado del cuestionario
const Encabezado = styled.div`
  margin-bottom: 20px;
`;

// Título del cuestionario
const Titulo = styled.h1`
  font-size: ${props => props.theme.fonts.baseSize * 1.4}px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 10px;
`;

// Subtítulo o descripción del cuestionario
const Subtitulo = styled.p`
  font-size: ${props => props.theme.fonts.baseSize * 0.9}px;
  color: ${props => props.theme.colors.text}cc;
  margin-bottom: 0;
`;

// Contenedor para la sección actual
const SeccionActualContainer = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

// Contenedor para los botones de navegación
const BotonesNavegacion = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

// Estilos para el botón de navegación
const BotonNavegacion = styled.button`
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
  border-radius: ${props => props.theme.borderRadius ? props.theme.borderRadius.md : '8px'};
  padding: 10px 20px;
  font-size: ${props => props.theme.fonts.baseSize * 1}px;
  font-weight: ${props => props.theme.fonts.weights ? props.theme.fonts.weights.medium : 500};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.primario 
      ? props.theme.colors.secondary 
      : props.theme.colors.primary + '11'
    };
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/**
 * Componente principal del cuestionario
 * @returns {JSX.Element} - Elemento de React
 */
const Cuestionario = ({ navegarA }) => {
  const { config, respuestas: respuestasGlobales, actualizarRespuesta } = useApp();
  const [mostrarRequeridos, setMostrarRequeridos] = useState(false);
  
  // Filtrar secciones según la configuración global
  const seccionesFiltradas = SECCIONES_CUESTIONARIO.filter(
    seccion => !seccion.mostrarSiGlobal || seccion.mostrarSiGlobal(config)
  );
  
  // Usar el hook personalizado para manejar la lógica del cuestionario
  const {
    respuestas,
    actualizarRespuesta: actualizar,
    seccionActual,
    cambiarSeccion,
    preguntasAdicionales
  } = useCuestionario(seccionesFiltradas, respuestasGlobales);
  
  // Manejar cambios en las respuestas
  const manejarRespuestaCambio = (preguntaId, valor) => {
    actualizar(preguntaId, valor);
    actualizarRespuesta(preguntaId, valor);
  };
  
  // Verificar si se han respondido las preguntas requeridas
  const estanPreguntasRequeridas = () => {
    // En esta versión simple, no hay preguntas requeridas
    return true;
  };
  
  // Verificar si hay suficientes respuestas para un análisis útil
  const haySuficientesRespuestas = () => {
    // Para demo, 3 respuestas es suficiente
    return Object.keys(respuestas).length >= 3;
  };
  
  // Calcular si puede continuar a la siguiente sección
  const puedeAvanzar = estanPreguntasRequeridas();
  
  // Manejar la navegación entre secciones
  const manejarClickNavegacion = (direccion) => {
    if (direccion === 'anterior') {
      if (seccionActual === 0) {
        // Si estamos en la primera sección, volver a la pantalla de inicio
        navegarA('inicio');
      } else {
        // Navegar a la sección anterior
        cambiarSeccion('anterior');
      }
    } else if (direccion === 'siguiente') {
      // Verificar si se han respondido las preguntas requeridas
      if (!puedeAvanzar) {
        setMostrarRequeridos(true);
        return;
      }
      
      // Verificar si es la última sección
      if (seccionActual >= seccionesFiltradas.length - 1) {
        // Verificar si hay suficientes respuestas para resultados útiles
        if (haySuficientesRespuestas()) {
          // Navegar a la pantalla de resultados
          navegarA('resultados', { respuestas });
        } else {
          // Mostrar un aviso si no hay suficientes respuestas
          alert('Por favor, complete más preguntas para obtener resultados precisos.');
        }
      } else {
        // Navegar a la siguiente sección
        cambiarSeccion('siguiente');
        // Resetear el indicador de campos requeridos
        setMostrarRequeridos(false);
      }
    }
  };
  
  // Ir a una sección específica cuando se hace clic en la barra de progreso
  const irASeccion = (indice) => {
    if (indice <= seccionActual) {
      // Solo permitir navegar a secciones anteriores o la actual
      setMostrarRequeridos(false);
      // Implementar la lógica para cambiar directamente a una sección
      setSeccionActual(indice);
    }
  };
  
  // Mostrar un mensaje si no hay secciones
  if (seccionesFiltradas.length === 0) {
    return (
      <CuestionarioContainer>
        <Encabezado>
          <Titulo>Cuestionario</Titulo>
          <Subtitulo>No hay secciones disponibles para mostrar.</Subtitulo>
        </Encabezado>
        <BotonesNavegacion>
          <BotonNavegacion onClick={() => navegarA('inicio')}>
            Volver al inicio
          </BotonNavegacion>
        </BotonesNavegacion>
      </CuestionarioContainer>
    );
  }
  
  // Obtener la sección actual
  const seccionActualData = seccionesFiltradas[seccionActual];
  
  return (
    <CuestionarioContainer>
      <Encabezado>
        <Titulo>Cuestionario de Evaluación</Titulo>
        <Subtitulo>Complete las siguientes preguntas para evaluar su riesgo de deficiencias nutricionales.</Subtitulo>
      </Encabezado>
      
      {config.mostrarBarraProgreso && (
        <BarraProgreso 
          secciones={seccionesFiltradas}
          seccionActual={seccionActual}
          onClickSeccion={irASeccion}
        />
      )}
      
      <SeccionActualContainer>
        {seccionActualData && (
          <Seccion 
            seccion={seccionActualData}
            respuestas={respuestas}
            onRespuestaChange={manejarRespuestaCambio}
            mostrarRequeridos={mostrarRequeridos}
          />
        )}
      </SeccionActualContainer>
      
      <BotonesNavegacion>
        <BotonNavegacion 
          onClick={() => manejarClickNavegacion('anterior')}
        >
          {seccionActual === 0 ? "Volver al inicio" : "Anterior"}
        </BotonNavegacion>
        
        <BotonNavegacion 
          primario
          onClick={() => manejarClickNavegacion('siguiente')}
        >
          {seccionActual === seccionesFiltradas.length - 1 
            ? "Ver resultados" 
            : "Siguiente pregunta"
          }
        </BotonNavegacion>
      </BotonesNavegacion>
    </CuestionarioContainer>
  );
};

export default Cuestionario;