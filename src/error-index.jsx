import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Importación con gestión de errores
const AppWithErrorBoundary = React.lazy(() => import('./components/ErrorBoundary').then(module => ({
  default: () => {
    const ErrorBoundary = module.default;
    const App = React.lazy(() => import('./components/App'));
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Cargando aplicación...</div>}>
          <App />
        </Suspense>
      </ErrorBoundary>
    );
  }
})).catch(error => {
  console.error("Error cargando componentes:", error);
  return {
    default: () => (
      <div style={{ padding: 20, color: 'red' }}>
        Error al cargar la aplicación. Ver consola para detalles.
      </div>
    )
  };
}));

// Punto de entrada principal
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div>Inicializando...</div>}>
      <AppWithErrorBoundary />
    </Suspense>
  </React.StrictMode>
);
