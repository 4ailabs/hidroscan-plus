import React from 'react';
import styled from 'styled-components';
import { useApp } from '../context/AppContext.jsx';

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
  font-weight: ${props => props.theme.fonts.weights.medium};
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
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 12px 25px;
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  font-weight: ${props => props.theme.fonts.weights.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 15px;
  box-shadow: ${props => props.theme.shadows.sm};
  
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
    color: ${props => props.theme.colors.success};
    margin-right: 10px;
    font-weight: bold;
  }
`;

const PantallaInicio = () => {
  const { navegarA, config } = useApp();
  
  const handleStartClick = () => {
    navegarA('cuestionario');
  };
  
  const handleInfoClick = () => {
    // Aquí se podría mostrar más información sobre la aplicación
    alert('HidroScanPlus es una herramienta diseñada para evaluar tu riesgo de deficiencia en vitaminas hidrosolubles, basada en investigaciones científicas actualizadas.');
  };
  
  return (
    <Container>
      <Logo>
        {config.logoUrl ? (
          <img src={config.logoUrl} alt={config.nombreApp} />
        ) : (
          <img src="/logo.svg" alt={config.nombreApp} />
        )}
      </Logo>
      
      <Title>{config.nombreApp}</Title>
      
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
      
      <Button onClick={handleStartClick}>Comenzar evaluación</Button>
      <SecondaryButton onClick={handleInfoClick}>Más información</SecondaryButton>
    </Container>
  );
};

export default PantallaInicio;