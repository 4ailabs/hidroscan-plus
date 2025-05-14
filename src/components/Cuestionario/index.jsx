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

// Mensaje de error para mostrar cuando ocurren problemas
const MensajeError = styled.div`
  padding: 20px;
  background-color: ${props => props.theme.colors.error}20;
  border-left: 4px solid ${props => props.theme.colors.error};
  border-radius: 8px;
  margin-bottom: 20px;
`;

/**
 * Componente principal del cuestionario
 * @returns {JSX.Element} - Elemento de React
 */
const Cuestionario = ({ navegarA }) => {
  try {
    // Acceder al contexto global
    let appContext = null;
    try {
      appContext = useApp();
      console.log("Contexto de App disponible:", !!appContext);
    } catch (error) {
      console.warn("No se pudo acceder al contexto AppContext:", error);
    }
    
    // Si no tenemos AppContext, usamos estados locales como fallback
    const config = appContext?.config || { mostrarBarraProgreso: true };
    const respuestasGlobales = appContext?.respuestas || {};
    const actualizarRespuesta = appContext?.actualizarRespuesta || (() => console.warn("Función actualizarRespuesta no disponible"));
    
    const [mostrarRequeridos, setMostrarRequeridos] = useState(false);
    const [error, setError] = useState(null);
    
    // Filtrar secciones según la configuración global
    let seccionesFiltradas = [];
    try {
      seccionesFiltradas = SECCIONES_CUESTIONARIO.filter(
        seccion => !seccion.mostrarSiGlobal || seccion.mostrarSiGlobal(config)
      );
    } catch (error) {
      console.error("Error al filtrar secciones:", error);
      setError("Ocurrió un error al cargar las secciones del cuestionario. Por favor, intenta nuevamente.");
      seccionesFiltradas = SECCIONES_CUESTIONARIO;
    }
    
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
      try {
        actualizar(preguntaId, valor);
        if (typeof actualizarRespuesta === 'function') {
          actualizarRespuesta(preguntaId, valor);
        }
      } catch (error) {
        console.error("Error al actualizar respuesta:", error);
        setError("No se pudo guardar la respuesta. Intenta nuevamente.");
      }
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
    
    // Calcular si puede avanzar a la siguiente sección
    const puedeAvanzar = estanPreguntasRequeridas();
    
    // Manejar la navegación entre secciones
    const manejarClickNavegacion = (direccion) => {
      try {
        if (direccion === 'anterior') {
          if (seccionActual === 0) {
            // Si estamos en la primera sección, volver a la pantalla de inicio
            if (typeof navegarA === 'function') {
              navegarA('inicio');
            } else {
              console.error("Función navegarA no está disponible");
              setError("No se pudo navegar. Por favor, actualiza la página.");
            }
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
              if (typeof navegarA === 'function') {
                navegarA('resultados', { respuestas });
              } else {
                console.error("Función navegarA no está disponible");
                setError("No se pudo navegar a los resultados. Por favor, actualiza la página.");
              }
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
      } catch (error) {
        console.error("Error en navegación:", error);
        setError("Ocurrió un error al navegar. Por favor, intenta nuevamente.");
      }
    };
    
    // Ir a una sección específica cuando se hace clic en la barra de progreso
    const irASeccion = (indice) => {
      try {
        if (indice <= seccionActual) {
          // Solo permitir navegar a secciones anteriores o la actual
          setMostrarRequeridos(false);
          // Usar la función cambiarSeccion con el índice específico
          cambiarSeccion(indice);
        }
      } catch (error) {
        console.error("Error al navegar a sección:", error);
        setError("No se pudo navegar a la sección seleccionada.");
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
          
          {error && (
            <MensajeError>
              <strong>Error:</strong> {error}
            </MensajeError>
          )}
          
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
        
        {error && (
          <MensajeError>
            <strong>Error:</strong> {error}
          </MensajeError>
        )}
        
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
              preguntasAdicionales={preguntasAdicionales}
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
  } catch (error) {
    console.error("Error crítico en componente Cuestionario:", error);
    
    return (
      <CuestionarioContainer>
        <Encabezado>
          <Titulo>Error al cargar el cuestionario</Titulo>
          <Subtitulo>Ha ocurrido un problema inesperado.</Subtitulo>
        </Encabezado>
        
        <MensajeError>
          <strong>Error:</strong> No se pudo cargar el cuestionario correctamente. Por favor, intenta recargar la página.
        </MensajeError>
        
        <BotonesNavegacion>
          <BotonNavegacion onClick={() => window.location.reload()}>
            Recargar página
          </BotonNavegacion>
          
          {typeof navegarA === 'function' && (
            <BotonNavegacion primario onClick={() => navegarA('inicio')}>
              Volver al inicio
            </BotonNavegacion>
          )}
        </BotonesNavegacion>
      </CuestionarioContainer>
    );
  }
};

export default Cuestionario;