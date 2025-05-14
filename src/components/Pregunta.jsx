import React from 'react';
import styled from 'styled-components';

const PreguntaContainer = styled.div`
  margin-bottom: 25px;
  border-radius: 10px;
  padding: 15px;
  background-color: ${props => props.theme.colors.background}15;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const PreguntaTexto = styled.h3`
  font-size: ${props => props.theme.fonts.baseSize * 1.1}px;
  margin-bottom: 15px;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme.colors.background}30;
  }
  
  input {
    margin-right: 10px;
  }
  
  label {
    cursor: pointer;
    flex: 1;
  }
`;

const CheckboxOption = styled(RadioOption)``;

const EscalaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EscalaOption = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.isSelected ? `${props.theme.colors.primary}20` : 'transparent'};
  
  &:hover {
    background-color: ${props => props.isSelected 
      ? `${props.theme.colors.primary}30` 
      : props.theme.colors.background + '30'
    };
  }
  
  input {
    margin-right: 10px;
  }
  
  label {
    cursor: pointer;
    flex: 1;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme.colors.text}33;
  border-radius: 8px;
  font-size: ${props => props.theme.fonts.baseSize}px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}30;
  }
`;

const NumberInput = styled(TextInput).attrs({ type: 'number' })`
  width: 100%;
  max-width: 200px;
`;

const ErrorText = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fonts.baseSize * 0.85}px;
  margin-top: 5px;
`;

const Pregunta = ({ pregunta, valor, onChange }) => {
  const { id, texto, tipo, opciones, min, max } = pregunta;
  
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };
  
  const handleNumberChange = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      onChange("");
      return;
    }
    
    if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
      return;
    }
    
    onChange(value);
  };
  
  const handleCheckboxChange = (option) => {
    let newValue = [];
    
    if (valor && Array.isArray(valor)) {
      if (valor.includes(option)) {
        newValue = valor.filter(item => item !== option);
      } else {
        newValue = [...valor, option];
      }
    } else {
      newValue = [option];
    }
    
    onChange(newValue);
  };
  
  const handleEscalaChange = (option) => {
    onChange(option);
  };
  
  const renderInput = () => {
    switch (tipo) {
      case 'radio':
        return (
          <div>
            {opciones.map((opcion) => (
              <RadioOption key={opcion}>
                <input
                  type="radio"
                  id={`${id}-${opcion}`}
                  name={id}
                  value={opcion}
                  checked={valor === opcion}
                  onChange={() => onChange(opcion)}
                />
                <label htmlFor={`${id}-${opcion}`}>{opcion}</label>
              </RadioOption>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <div>
            {opciones.map((opcion) => (
              <CheckboxOption key={opcion}>
                <input
                  type="checkbox"
                  id={`${id}-${opcion}`}
                  name={id}
                  value={opcion}
                  checked={valor && Array.isArray(valor) && valor.includes(opcion)}
                  onChange={() => handleCheckboxChange(opcion)}
                />
                <label htmlFor={`${id}-${opcion}`}>{opcion}</label>
              </CheckboxOption>
            ))}
          </div>
        );
      
      case 'escala':
        return (
          <EscalaContainer>
            {opciones.map((opcion) => (
              <EscalaOption 
                key={opcion} 
                isSelected={valor === opcion}
                onClick={() => handleEscalaChange(opcion)}
              >
                <input
                  type="radio"
                  id={`${id}-${opcion}`}
                  name={id}
                  value={opcion}
                  checked={valor === opcion}
                  onChange={() => handleEscalaChange(opcion)}
                />
                <label htmlFor={`${id}-${opcion}`}>{opcion}</label>
              </EscalaOption>
            ))}
          </EscalaContainer>
        );
      
      case 'texto':
        return (
          <TextInput
            type="text"
            id={id}
            value={valor || ''}
            onChange={handleInputChange}
            placeholder="Escriba su respuesta"
          />
        );
      
      case 'numero':
        return (
          <div>
            <NumberInput
              type="number"
              id={id}
              value={valor || ''}
              onChange={handleNumberChange}
              min={min}
              max={max}
              placeholder={`${min || 0}-${max || ''}`}
            />
            {(min !== undefined || max !== undefined) && (
              <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                {min !== undefined && max !== undefined
                  ? `Rango: ${min}-${max}`
                  : min !== undefined
                  ? `Mínimo: ${min}`
                  : `Máximo: ${max}`
                }
              </small>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <PreguntaContainer>
      <PreguntaTexto>{texto}</PreguntaTexto>
      {renderInput()}
    </PreguntaContainer>
  );
};

export default Pregunta;