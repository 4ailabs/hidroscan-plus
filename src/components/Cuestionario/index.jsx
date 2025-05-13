import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext';
import BarraProgreso from './BarraProgreso';
import Seccion from './Seccion';
import { SECCIONES_CUESTIONARIO } from '../../data/cuestionario';

// Estilos
const Container = styled.div`
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavegacionBotones = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding-bottom: 20px;
`;

const BotonNavegacion = styled.button`
  background-color: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: ${props => props.primary ? 'none' : `1px solid ${props.theme.colors.primary}`};
  border-radius: ${props => props.theme.borderRadius}px;
  padding: 10px 20px;
  font-size: ${props => props.theme.fonts.baseSize}px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background-color: ${props => props.primary 
        ? props.theme.colors.secondary 
        : `${props.theme.colors.primary}10`};
    box-shadow: ${props => props.primary 
        ? '0 4px 6px rgba(0,0,0,0.1)' 
        : 'none'};
  }
`;

// Componente principal de cuestionario
const Cuestionario = () => {
  const { 
    respuestas, 
    actualizarRespuesta, 
    seccionActual, 
    navegarA, 
    cambiarSeccion, 
    config 
  } = useApp();
  
  // Obtener la sección actual
  const seccionInfo = SECCIONES_CUESTIONARIO[seccionActual];
  
  // Determinar si hay secciones anteriores/siguientes
  const hayAnterior = seccionActual > 0;
  const haySiguiente = seccionActual < SECCIONES_CUESTIONARIO.length - 1;
  
  // Manejar navegación
  const handleAnterior = () => {
    if (hayAnterior) {
      cambiarSeccion('anterior');
    } else {
      navegarA('inicio');
    }
  };
  
  const handleSiguiente = () => {
    if (haySiguiente) {
      cambiarSeccion('siguiente');
    } else {
      navegarA('resultados');
    }
  };
  
  return (
    <Container>
      {config.mostrarBarraProgreso && (
        <BarraProgreso 
          actual={seccionActual + 1} 
          total={SECCIONES_CUESTIONARIO.length} 
        />
      )}
      
      {seccionInfo && (
        <Seccion
          seccion={seccionInfo}
          respuestas={respuestas}
          onRespuestaChange={actualizarRespuesta}
        />
      )}
      
      <NavegacionBotones>
        <BotonNavegacion onClick={handleAnterior}>
          {hayAnterior ? 'Anterior' : 'Cancelar'}
        </BotonNavegacion>
        
        <BotonNavegacion primary onClick={handleSiguiente}>
          {haySiguiente ? 'Siguiente' : 'Ver resultados'}
        </BotonNavegacion>
      </NavegacionBotones>
    </Container>
  );
};

export default Cuestionario;