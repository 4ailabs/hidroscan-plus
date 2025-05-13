import React, { useState } from 'react';
import styled from 'styled-components';
import { useApp } from '../../context/AppContext.jsx';

// Contenedor principal de la tarjeta
const TarjetaContainer = styled.div`
  background-color: ${props => props.temaOscuro ? props.theme.colors.dark : 'white'};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: ${props => props.estiloTarjeta === 'elevado' 
    ? props.theme.shadows.sm
    : 'none'
  };
  border: ${props => props.estiloTarjeta === 'plano' 
    ? `1px solid ${props.nivelColor}30`
    : `1px solid ${props.nivelColor}30`
  };
  transition: ${props => props.animaciones ? 'all 0.3s ease' : 'none'};
  
  &:hover {
    transform: ${props => props.animaciones ? 'translateY(-3px)' : 'none'};
    box-shadow: ${props => props.animaciones && props.estiloTarjeta === 'elevado' 
      ? props.theme.shadows.md
      : props.estiloTarjeta === 'elevado' ? props.theme.shadows.sm : 'none'
    };
  }
`;

// Encabezado de la tarjeta
const TarjetaHeader = styled.div`
  background-color: ${props => props.nivelColor}15;
  padding: 15px;
  border-bottom: 1px solid ${props => props.nivelColor}30;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Contenedor de información principal
const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Icono o emoji de la vitamina
const IconoVitamina = styled.span`
  font-size: 24px;
  margin-right: 12px;
`;

// Información textual
const InfoTexto = styled.div``;

// Nombre de la vitamina
const NombreVitamina = styled.h4`
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  margin: 0;
  margin-bottom: 2px;
  font-weight: ${props => props.theme.fonts.weights.semibold};
`;

// Nombre científico
const NombreCientifico = styled.div`
  font-size: ${props => props.theme.fonts.baseSize * 0.8}px;
  color: ${props => props.theme.colors.text}99;
`;

// Contenedor para el nivel de riesgo
const NivelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Etiqueta del nivel de riesgo
const NivelLabel = styled.div`
  font-size: ${props => props.theme.fonts.baseSize * 0.8}px;
  color: ${props => props.nivelColor};
  text-transform: uppercase;
  font-weight: ${props => props.theme.fonts.weights.semibold};
`;

// Puntuación del riesgo
const Puntuacion = styled.div`
  font-size: ${props => props.theme.fonts.baseSize * 1.3}px;
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.nivelColor};
`;

// Cuerpo de la tarjeta
const TarjetaBody = styled.div`
  padding: 15px;
`;

// Alerta de recomendación
const AlertaRecomendacion = styled.div`
  background-color: ${props => props.nivelColor}10;
  border-left: 4px solid ${props => props.nivelColor};
  padding: 12px 15px;
  border-radius: 4px;
  margin-bottom: 15px;
`;

// Texto para la recomendación principal
const TextoRecomendacion = styled.strong`
  font-size: ${props => props.theme.fonts.baseSize * 0.95}px;
  display: block;
  margin-bottom: 5px;
`;

// Descripción extendida de la recomendación
const DescripcionExtendida = styled.p`
  margin: 5px 0 0;
  font-size: ${props => props.theme.fonts.baseSize * 0.9}px;
`;

// Contenedor para la visualización de la confiabilidad
const ConfiabilidadContainer = styled.div`
  margin-bottom: 15px;
  background-color: ${props => props.temaOscuro ? '#36394A' : '#f8f8f8'};
  padding: 10px 15px;
  border-radius: 4px;
  font-size: ${props => props.theme.fonts.baseSize * 0.9}px;
`;

// Fila de información sobre la confiabilidad
const ConfiabilidadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

// Barra para el intervalo de confianza
const BarraIntervalo = styled.div`
  height: 8px;
  background-color: #ddd;
  border-radius: 4px;
  position: relative;
  margin-bottom: 5px;
`;

// Indicador de puntuación actual
const IndicadorPuntuacion = styled.div`
  position: absolute;
  top: -6px;
  left: ${props => props.posicion}%;
  width: 4px;
  height: 20px;
  background-color: ${props => props.nivelColor};
  border-radius: 2px;
`;

// Intervalo de confianza en la barra
const Intervalo = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.inicio}%;
  height: 100%;
  width: ${props => props.ancho}%;
  background-color: ${props => props.nivelColor}50;
  border-radius: 4px;
`;

// Etiqueta de confiabilidad
const ConfiabilidadLabel = styled.div`
  font-size: ${props => props.theme.fonts.baseSize * 0.8}px;
  color: ${props => props.theme.colors.text}99;
  text-align: center;
`;

// Sección para factores de riesgo
const FactoresSeccion = styled.div`
  margin-bottom: 15px;
`;

// Título para listas de factores
const FactoresTitulo = styled.h5`
  font-size: ${props => props.theme.fonts.baseSize * 0.95}px;
  margin-bottom: 8px;
  font-weight: ${props => props.theme.fonts.weights.semibold};
`;

// Lista de factores
const FactoresList = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  font-size: ${props => props.theme.fonts.baseSize * 0.9}px;
`;

// Ítem de lista de factores
const FactorItem = styled.li`
  margin-bottom: 4px;
`;

// Impacto del factor
const FactorImpacto = styled.span`
  color: ${props => props.theme.colors.text}80;
  font-size: ${props => props.theme.fonts.baseSize * 0.85}px;
`;

// Sección de fuentes alimentarias
const FuentesSeccion = styled.div`
  margin-top: 15px;
  border-top: 1px solid ${props => props.theme.colors.text}20;
  padding-top: 10px;
  font-size: ${props => props.theme.fonts.baseSize * 0.85}px;
`;

/**
 * Componente para mostrar información detallada de una vitamina
 * @param {Object} props - Propiedades del componente
 * @param {string} props.vitamina - Clave de la vitamina en el objeto de resultados
 * @param {Object} props.datos - Datos de la vitamina
 * @returns {JSX.Element} - Elemento de React
 */
const TarjetaVitamina = ({ vitamina: vitaminaId, datos }) => {
  const { config } = useApp();
  const { 
    temaOscuro, 
    estiloTarjeta, 
    animaciones, 
    colorError,
    colorWarning,
    colorSuccess,
    incluirRecomendaciones,
    mostrarNivelesIncertidumbre
  } = config;
  
  // Obtener el color según el nivel de riesgo
  const getLevelColor = (level) => {
    if (level === "bajo") return colorSuccess;
    if (level === "medio") return colorWarning;
    return colorError;
  };
  
  // Color basado en el nivel
  const nivelColor = getLevelColor(datos.nivel);
  
  // Valor máximo para las visualizaciones
  const maxScoreForVisualization = 10;
  
  // Calcular posiciones para la barra de intervalo de confianza
  const puntuacionPos = Math.min(100, (parseFloat(datos.puntuacion) / maxScoreForVisualization) * 100);
  const inicioIntervalo = Math.min(100, (parseFloat(datos.intervaloConfianza[0]) / maxScoreForVisualization) * 100);
  const finIntervalo = Math.min(100, (parseFloat(datos.intervaloConfianza[1]) / maxScoreForVisualization) * 100);
  const anchoIntervalo = finIntervalo - inicioIntervalo;
  
  return (
    <TarjetaContainer 
      temaOscuro={temaOscuro}
      estiloTarjeta={estiloTarjeta}
      animaciones={animaciones}
      nivelColor={nivelColor}
      id={`vitamina-${vitaminaId}`}
    >
      <TarjetaHeader nivelColor={nivelColor}>
        <InfoContainer>
          <IconoVitamina>{datos.imagen ?? "?"}</IconoVitamina>
          <InfoTexto>
            <NombreVitamina>{datos.nombre}</NombreVitamina>
            <NombreCientifico>{datos.nombreCientifico}</NombreCientifico>
          </InfoTexto>
        </InfoContainer>
        
        <NivelContainer>
          <NivelLabel nivelColor={nivelColor}>
            Riesgo {datos.nivel}
          </NivelLabel>
          <Puntuacion nivelColor={nivelColor}>
            {datos.puntuacion}
          </Puntuacion>
        </NivelContainer>
      </TarjetaHeader>
      
      <TarjetaBody>
        {datos.recomendacion && (
          <AlertaRecomendacion nivelColor={nivelColor}>
            <TextoRecomendacion>
              {datos.recomendacion}
            </TextoRecomendacion>
            
            {incluirRecomendaciones && datos.descripcionExtendida && (
              <DescripcionExtendida>
                {datos.descripcionExtendida}
              </DescripcionExtendida>
            )}
          </AlertaRecomendacion>
        )}
        
        {mostrarNivelesIncertidumbre && datos.intervaloConfianza && (
          <ConfiabilidadContainer temaOscuro={temaOscuro}>
            <ConfiabilidadRow>
              <span>Intervalo de confianza:</span>
              <span style={{ fontWeight: 'bold' }}>
                {datos.intervaloConfianza[0]} - {datos.intervaloConfianza[1]}
              </span>
            </ConfiabilidadRow>
            
            <BarraIntervalo>
              <IndicadorPuntuacion 
                posicion={puntuacionPos}
                nivelColor={nivelColor}
              />
              <Intervalo 
                inicio={inicioIntervalo}
                ancho={anchoIntervalo}
                nivelColor={nivelColor}
              />
            </BarraIntervalo>
            
            <ConfiabilidadLabel>
              Confiabilidad: {datos.confiabilidad}
            </ConfiabilidadLabel>
          </ConfiabilidadContainer>
        )}
        
        {datos.factoresRiesgoDetallados && datos.factoresRiesgoDetallados.length > 0 && (
          <FactoresSeccion>
            <FactoresTitulo>Principales factores de riesgo:</FactoresTitulo>
            <FactoresList>
              {datos.factoresRiesgoDetallados.slice(0, 3).map((factor) => (
                <FactorItem key={factor.factor}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {factor.factor.replace(/_/g, " ")}
                  </span>
                  <FactorImpacto> (impacto: {factor.impacto})</FactorImpacto>
                </FactorItem>
              ))}
            </FactoresList>
          </FactoresSeccion>
        )}
        
        {datos.factoresProteccionDetallados && datos.factoresProteccionDetallados.length > 0 && (
          <FactoresSeccion>
            <FactoresTitulo>Factores protectores:</FactoresTitulo>
            <FactoresList>
              {datos.factoresProteccionDetallados.slice(0, 3).map((factor) => (
                <FactorItem key={factor.factor}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {factor.factor.replace(/_/g, " ")}
                  </span>
                  <FactorImpacto> (impacto: {factor.impacto})</FactorImpacto>
                </FactorItem>
              ))}
            </FactoresList>
          </FactoresSeccion>
        )}
        
        {datos.fuentes && (
          <FuentesSeccion>
            <strong>Fuentes alimentarias:</strong> {datos.fuentes}
          </FuentesSeccion>
        )}
      </TarjetaBody>
    </TarjetaContainer>
  );
};

export default TarjetaVitamina;