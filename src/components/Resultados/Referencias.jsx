import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext.jsx';
import { REFERENCIAS_CIENTIFICAS } from '../../data/nutrientes';

// Contenedor principal para las referencias
const ReferenciasContainer = styled.div`
  background-color: ${props => props.temaOscuro ? props.theme.colors.dark : '#f8f8f8'};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 15px;
  margin-bottom: 30px;
`;

// Título de la sección
const ReferenciasTitle = styled.h3`
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  margin-bottom: 15px;
  color: ${props => props.theme.colors.text};
`;

// Lista de referencias
const ReferenciasList = styled.ul`
  margin: 0;
  padding: 0 0 0 5px;
  list-style: none;
`;

// Ítem de referencia
const ReferenciaItem = styled.li`
  margin-bottom: 15px;
  font-size: ${props => props.theme.fonts.baseSize * 0.9}px;
  border-left: 3px solid ${props => props.theme.colors.primary}50;
  padding-left: 15px;
`;

// Título de la referencia
const ReferenciaTitulo = styled.div`
  font-weight: ${props => props.theme.fonts.weights.semibold};
  margin-bottom: 4px;
`;

// Autores y revista
const ReferenciaAutores = styled.div`
  color: ${props => props.theme.colors.text}DD;
  margin-bottom: 2px;
`;

// Contenedor para DOI y enlace
const ReferenciaFooter = styled.div`
  font-size: ${props => props.theme.fonts.baseSize * 0.85}px;
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colors.text}99;
`;

// Enlace a la referencia
const ReferenciaLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

/**
 * Componente para mostrar las referencias científicas
 * @returns {JSX.Element} - Elemento de React
 */
const Referencias = () => {
  const { config } = useApp();
  const { temaOscuro, colorPrimario } = config;
  
  return (
    <ReferenciasContainer temaOscuro={temaOscuro}>
      <ReferenciasTitle>Referencias científicas</ReferenciasTitle>
      
      <ReferenciasList>
        {REFERENCIAS_CIENTIFICAS.map((ref) => (
          <ReferenciaItem key={ref.id}>
            <ReferenciaTitulo>{ref.titulo}</ReferenciaTitulo>
            
            <ReferenciaAutores>
              {ref.autores}. <i>{ref.revista}</i>, {ref.año}.
            </ReferenciaAutores>
            
            <ReferenciaFooter>
              <div>DOI: {ref.doi}</div>
              
              <ReferenciaLink 
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver artículo
              </ReferenciaLink>
            </ReferenciaFooter>
          </ReferenciaItem>
        ))}
      </ReferenciasList>
    </ReferenciasContainer>
  );
};

export default Referencias;