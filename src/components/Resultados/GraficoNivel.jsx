import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext.jsx';

// Contenedor del gráfico
const GraficoContainer = styled.div`
  width: 95px;
  height: 110px;
  background-color: ${props => props.temaOscuro ? props.theme.colors.dark : 'white'};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-shadow: ${props => props.estiloTarjeta === 'elevado' 
    ? props.theme.shadows.sm 
    : 'none'
  };
  cursor: pointer;
  border: 2px solid ${props => props.nivelColor}30;
  transition: ${props => props.animaciones ? 'all 0.3s ease' : 'none'};
  
  &:hover {
    transform: ${props => props.animaciones ? 'scale(1.05)' : 'none'};
    box-shadow: ${props => props.animaciones ? props.theme.shadows.md : props.theme.shadows.sm};
  }
`;

// Círculo con el icono de la vitamina
const IconoCirculo = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${props => props.nivelColor}20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 8px;
  border: 2px solid ${props => props.nivelColor};
`;

// Código de la vitamina
const CodigoVitamina = styled.div`
  font-weight: ${props => props.theme.fonts.weights.bold};
  font-size: ${props => props.theme.fonts.baseSize * 1.0}px;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3px;
`;

// Nivel de la vitamina
const NivelVitamina = styled.div`
  font-size: ${props => props.theme.fonts.baseSize * 0.8}px;
  color: ${props => props.nivelColor};
  text-transform: capitalize;
  font-weight: ${props => props.theme.fonts.weights.semibold};
`;

/**
 * Componente para mostrar un gráfico con el nivel de riesgo de una vitamina
 * @param {Object} props - Propiedades del componente
 * @param {string} props.vitaminaId - ID de la vitamina
 * @param {Object} props.datos - Datos de la vitamina
 * @param {Function} props.onClick - Función a llamar cuando se hace clic
 * @returns {JSX.Element} - Elemento de React
 */
const GraficoNivel = ({ vitaminaId, datos, onClick }) => {
  const { config } = useApp();
  const { 
    temaOscuro, 
    estiloTarjeta, 
    animaciones, 
    colorError,
    colorWarning,
    colorSuccess
  } = config;
  
  // Obtener el color según el nivel de riesgo
  const getLevelColor = (level) => {
    if (level === "bajo") return colorSuccess;
    if (level === "medio") return colorWarning;
    return colorError;
  };
  
  // Color basado en el nivel
  const nivelColor = getLevelColor(datos.nivel);
  
  return (
    <GraficoContainer
      temaOscuro={temaOscuro}
      estiloTarjeta={estiloTarjeta}
      animaciones={animaciones}
      nivelColor={nivelColor}
      onClick={onClick}
    >
      <IconoCirculo nivelColor={nivelColor}>
        {datos.imagen ?? "?"}
      </IconoCirculo>
      
      <CodigoVitamina>
        {vitaminaId}
      </CodigoVitamina>
      
      <NivelVitamina nivelColor={nivelColor}>
        {datos.nivel}
      </NivelVitamina>
    </GraficoContainer>
  );
};

export default GraficoNivel;