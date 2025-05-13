import React from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
`;

const Logo = styled.div`
  margin-bottom: 20px;
  
  img {
    max-width: 120px;
    height: auto;
  }
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fonts.baseSize * 1.8}px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h2`
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  color: ${props => props.theme.colors.text}cc;
  margin-bottom: 30px;
  font-weight: 500;
`;

const Description = styled.p`
  margin-bottom: 30px;
  max-width: 500px;
  color: ${props => props.theme.colors.text}aa;
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  box-shadow: none;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}11;
  }
`;

const FeatureList = styled.ul`
  text-align: left;
  margin: 20px 0 30px;
  list-style-type: none;
  width: 100%;
  max-width: 400px;
`;

const FeatureItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  &:before {
    content: '✓';
    color: ${props => props.theme.colors.success || '#16a34a'};
    margin-right: 10px;
    font-weight: bold;
  }
`;

const PantallaInicio = () => {
  // Acceso al contexto con try/catch para evitar errores
  let context = null;
  
  try {
    context = useApp();
  } catch (error) {
    console.error("Error al acceder al contexto en PantallaInicio:", error);
  }
  
  const handleStartClick = () => {
    try {
      console.log("Botón 'Comenzar evaluación' pulsado");

      // Si context existe y tiene navegarA, usarlo
      if (context && typeof context.navegarA === 'function') {
        console.log("Intentando navegar a 'cuestionario'");
        context.navegarA('cuestionario');
      } else {
        // Como fallback, mostrar un mensaje de depuración
        console.error("Función navegarA no disponible");
        alert("La navegación no está disponible en este momento. Por favor, intenta de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error al intentar navegar:", error);
      alert("Ocurrió un error al intentar navegar. Consulta la consola para más detalles.");
    }
  };
  
  const handleInfoClick = () => {
    alert('HidroScanPlus es una herramienta diseñada para evaluar tu riesgo de deficiencia en vitaminas hidrosolubles, basada en investigaciones científicas actualizadas.');
  };

  // Extraer config con seguridad
  const config = context?.config || {
    nombreApp: 'HidroScanPlus',
    logoUrl: 'logo.svg'
  };
  
  return (
    <Container>
      <Logo>
        <img src={config.logoUrl || 'logo.svg'} alt={config.nombreApp || 'HidroScanPlus'} />
      </Logo>
      
      <Title>{config.nombreApp || 'HidroScanPlus'}</Title>
      
      <Subtitle>Evaluación personalizada de riesgo de deficiencias en vitaminas hidrosolubles</Subtitle>
      
      <Description>
        Esta herramienta te ayuda a identificar posibles deficiencias nutricionales
        basándose en tus hábitos, síntomas y factores de riesgo personales.
      </Description>
      
      <FeatureList>
        <FeatureItem>Evaluación basada en investigación científica actualizada</FeatureItem>
        <FeatureItem>Análisis personalizado según tus factores individuales</FeatureItem>
        <FeatureItem>Recomendaciones específicas para mejorar tu nutrición</FeatureItem>
        <FeatureItem>Referencias científicas para todas las evaluaciones</FeatureItem>
      </FeatureList>
      
      <Button onClick={handleStartClick} id="start-button">Comenzar evaluación</Button>
      <SecondaryButton onClick={handleInfoClick}>Más información</SecondaryButton>
    </Container>
  );
};

export default PantallaInicio;