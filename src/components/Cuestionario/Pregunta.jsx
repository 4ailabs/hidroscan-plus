import React from 'react';
import styled from 'styled-components';

// Estilos comunes
const PreguntaContainer = styled.div`
  margin-bottom: 20px;
  ${props => props.esAdicional && `
    background-color: ${props.temaOscuro ? '#333642' : '#f0f4ff'};
    border-left: 4px solid ${props.theme.colors.primary};
    padding: 15px;
    border-radius: 4px;
  `}
`;

const PreguntaHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const PreguntaLabel = styled.label`
  font-size: ${props => props.theme.fonts.baseSize * 1.05}px;
  font-weight: 500;
  margin-bottom: 0;
  display: block;
`;

const InfoIcon = styled.div`
  margin-left: 8px;
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
`;

// Componentes específicos para cada tipo de pregunta
const OpcionesRadio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OpcionRadio = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : '#ccc'};
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioInner = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
`;

const RadioLabel = styled.span`
  font-size: ${props => props.theme.fonts.baseSize}px;
  color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.text};
`;

const OpcionesCheckbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OpcionCheckbox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxSquare = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : '#ccc'};
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.selected ? props.theme.colors.primary : 'transparent'};
`;

const CheckboxCheck = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  top: -1px;
`;

const CheckboxLabel = styled.span`
  font-size: ${props => props.theme.fonts.baseSize}px;
  color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.text};
`;

const InputNumber = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: ${props => props.theme.fonts.baseSize}px;
  border: 1px solid ${props => props.value ? props.theme.colors.primary : '#ccc'};
  border-radius: ${props => props.theme.borderRadius}px;
  background-color: ${props => props.theme.colors.temaOscuro ? '#2A2D3A' : 'white'};
  color: ${props => props.theme.colors.text};
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}30;
  }
`;

const InputText = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: ${props => props.theme.fonts.baseSize}px;
  border: 1px solid ${props => props.value ? props.theme.colors.primary : '#ccc'};
  border-radius: ${props => props.theme.borderRadius}px;
  background-color: ${props => props.theme.colors.temaOscuro ? '#2A2D3A' : 'white'};
  color: ${props => props.theme.colors.text};
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}30;
  }
`;

const OpcionesEscala = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OpcionEscala = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const EscalaLabel = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const EscalaText = styled.span`
  font-size: ${props => props.theme.fonts.baseSize}px;
  color: ${props => props.selected ? props.theme.colors.primary : props.theme.colors.text};
`;

const EscalaBar = styled.div`
  flex: 1;
  margin-left: 10px;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`;

const EscalaFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.nivel}%;
  background-color: ${props => {
    if (props.nivel <= 25) return props.theme.colors.success;
    if (props.nivel <= 60) return props.theme.colors.warning;
    return props.theme.colors.error;
  }};
`;

// Componente principal de pregunta
const Pregunta = ({ pregunta, respuesta, onChange, esAdicional = false }) => {
  const { config } = { config: { temaOscuro: false } }; // En un caso real, esto vendría del contexto
  
  // Mostrar descripción científica como tooltip
  const mostrarInfoTooltip = () => {
    if (pregunta.descripcionCientifica) {
      alert(pregunta.descripcionCientifica);
    }
  };
  
  // Renderizar el input según el tipo de pregunta
  const renderizarInput = () => {
    switch (pregunta.tipo) {
      case 'radio':
        return (
          <OpcionesRadio>
            {pregunta.opciones.map(opcion => (
              <OpcionRadio
                key={opcion}
                onClick={() => onChange(opcion)}
              >
                <RadioCircle selected={respuesta === opcion}>
                  {respuesta === opcion && <RadioInner />}
                </RadioCircle>
                <RadioLabel selected={respuesta === opcion}>{opcion}</RadioLabel>
              </OpcionRadio>
            ))}
          </OpcionesRadio>
        );
        
      case 'checkbox':
        const valoresSeleccionados = Array.isArray(respuesta) ? respuesta : [];
        
        return (
          <OpcionesCheckbox>
            {pregunta.opciones.map(opcion => {
              const isSelected = valoresSeleccionados.includes(opcion);
              
              return (
                <OpcionCheckbox
                  key={opcion}
                  onClick={() => {
                    let nuevosValores;
                    if (!valoresSeleccionados.length) {
                      nuevosValores = [opcion];
                    } else if (isSelected) {
                      nuevosValores = valoresSeleccionados.filter(v => v !== opcion);
                    } else {
                      nuevosValores = [...valoresSeleccionados, opcion];
                    }
                    onChange(nuevosValores);
                  }}
                >
                  <CheckboxSquare selected={isSelected}>
                    {isSelected && <CheckboxCheck>✓</CheckboxCheck>}
                  </CheckboxSquare>
                  <CheckboxLabel selected={isSelected}>{opcion}</CheckboxLabel>
                </OpcionCheckbox>
              );
            })}
          </OpcionesCheckbox>
        );
        
      case 'numero':
        return (
          <InputNumber
            type="number"
            value={respuesta ?? ''}
            min={pregunta.min}
            max={pregunta.max}
            onChange={e => {
              const rawValue = e.target.value;
              let procesadoValue;
              
              if (rawValue === '') {
                procesadoValue = undefined;
              } else {
                procesadoValue = parseFloat(rawValue);
                if (pregunta.min !== undefined && procesadoValue < pregunta.min) {
                  procesadoValue = pregunta.min;
                }
                if (pregunta.max !== undefined && procesadoValue > pregunta.max) {
                  procesadoValue = pregunta.max;
                }
                if (isNaN(procesadoValue)) procesadoValue = undefined;
              }
              
              onChange(procesadoValue);
            }}
          />
        );
        
      case 'texto':
        return (
          <InputText
            type="text"
            value={respuesta ?? ''}
            onChange={e => onChange(e.target.value)}
          />
        );
        
      case 'escala':
        return (
          <OpcionesEscala>
            {pregunta.opciones.map((opcion, index) => {
              const isSelected = respuesta === opcion;
              const nivelEscala = (index / (pregunta.opciones.length - 1)) * 100;
              
              return (
                <OpcionEscala
                  key={opcion}
                  onClick={() => onChange(opcion)}
                >
                  <RadioCircle selected={isSelected}>
                    {isSelected && <RadioInner />}
                  </RadioCircle>
                  <EscalaLabel>
                    <EscalaText selected={isSelected}>{opcion}</EscalaText>
                    <EscalaBar>
                      {isSelected && (
                        <EscalaFill nivel={nivelEscala} />
                      )}
                    </EscalaBar>
                  </EscalaLabel>
                </OpcionEscala>
              );
            })}
          </OpcionesEscala>
        );
        
      default:
        return <p>Tipo de pregunta no soportado: {pregunta.tipo}</p>;
    }
  };
  
  return (
    <PreguntaContainer esAdicional={esAdicional} temaOscuro={config.temaOscuro}>
      <PreguntaHeader>
        <PreguntaLabel htmlFor={pregunta.id}>{pregunta.texto}</PreguntaLabel>
        {pregunta.descripcionCientifica && (
          <InfoIcon onClick={mostrarInfoTooltip}>ℹ️</InfoIcon>
        )}
      </PreguntaHeader>
      {renderizarInput()}
    </PreguntaContainer>
  );
};

export default Pregunta;