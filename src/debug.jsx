import React from 'react';
import ReactDOM from 'react-dom/client';

// Componente simple para pruebas
const TestApp = () => {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ color: '#2563eb' }}>HidroScanPlus</h1>
      <p>Aplicación de prueba funcionando correctamente.</p>
      <button 
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
        Botón de Prueba
      </button>
    </div>
  );
};

// Verificar si el elemento root existe
const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    // Intentar renderizar la aplicación
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <TestApp />
      </React.StrictMode>
    );
    console.log('La aplicación se ha renderizado correctamente');
  } catch (error) {
    // Capturar cualquier error durante el renderizado
    console.error('Error al renderizar la aplicación:', error);
    
    // Mostrar el error en la página
    rootElement.innerHTML = `
      <div style="color: red; padding: 20px;">
        <h2>Error al cargar la aplicación</h2>
        <pre>${error.message}</pre>
      </div>
    `;
  }
} else {
  console.error('No se encontró el elemento con ID "root"');
  
  // Crear un elemento root si no existe
  const newRoot = document.createElement('div');
  newRoot.id = 'emergency-root';
  document.body.appendChild(newRoot);
  
  // Renderizar un mensaje de error
  ReactDOM.createRoot(newRoot).render(
    <div style={{ color: 'red', padding: '20px' }}>
      <h2>Error: No se encontró el elemento root</h2>
      <p>Verifica que el HTML incluya un elemento con id="root"</p>
    </div>
  );
}
