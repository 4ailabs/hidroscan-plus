# HidroScanPlus 🧪

Evaluación personalizada de riesgo de deficiencias en vitaminas hidrosolubles basada en factores individuales, hábitos y síntomas.

![HidroScanPlus Logo](/public/logo.svg)

## 🌟 Características

- **Evaluación completa**: Análisis personalizado de riesgo de deficiencia para todas las vitaminas hidrosolubles.
- **Base científica**: Algoritmos basados en investigaciones nutricionales recientes.
- **Interfaz intuitiva**: Experiencia de usuario fluida y atractiva.
- **Recomendaciones detalladas**: Sugerencias específicas según resultados obtenidos.
- **Respaldo científico**: Referencias y fuentes incluidas.
- **Tema claro/oscuro**: Interfaces adaptables a las preferencias del usuario.
- **Diseño responsivo**: Funciona perfectamente en dispositivos móviles y de escritorio.

## 📋 Requisitos previos

- Node.js 18.x o superior
- npm 9.x o superior

## 🚀 Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/4ailabs/hidroscan-plus.git
   cd hidroscan-plus
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 🏗️ Estructura del proyecto

```
hidroscan-plus/
├── public/
│   ├── favicon.ico
│   ├── logo.svg               # Logo de HidroScanPlus
│   └── index.html
├── src/
│   ├── components/            # Componentes React modulares
│   │   ├── App.jsx            # Componente principal
│   │   ├── PantallaInicio.jsx # Pantalla de inicio
│   │   ├── Cuestionario/      # Componentes del cuestionario
│   │   └── Resultados/        # Componentes de resultados
│   ├── data/                  # Datos estáticos de la aplicación
│   │   ├── nutrientes.js      # Información sobre nutrientes
│   │   ├── cuestionario.js    # Estructura del cuestionario
│   │   └── referencias.js     # Referencias científicas
│   ├── hooks/                 # Hooks personalizados
│   │   ├── useEvaluacion.js   # Lógica de evaluación de vitaminas
│   │   └── useCuestionario.js # Manejo de estado del cuestionario
│   ├── utils/                 # Funciones de utilidad
│   │   ├── evaluadorNutrientes.js # Lógica de evaluación
│   │   └── helpers.js         # Funciones auxiliares
│   ├── context/               # Contextos de React
│   │   └── AppContext.jsx     # Estado global de la aplicación
│   ├── styles/                # Estilos CSS o styled-components
│   │   ├── theme.js           # Tema de la aplicación
│   │   └── globalStyles.js    # Estilos globales
│   ├── index.jsx              # Punto de entrada de la aplicación
│   └── index.css              # Estilos globales
```

## 🔧 Tecnologías utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **Styled Components**: CSS-in-JS para estilizar componentes
- **Vite**: Herramienta de desarrollo rápida para aplicaciones web
- **React Router**: Navegación entre distintas vistas
- **Material UI**: Componentes de UI para React
- **Recharts**: Biblioteca para visualización de datos

## 📱 Despliegue en Vercel

### Paso 1: Crear cuenta en Vercel

1. Visita [Vercel](https://vercel.com/) y crea una cuenta o inicia sesión.
2. Conecta tu cuenta de GitHub.

### Paso 2: Importar el repositorio

1. En el dashboard de Vercel, haz clic en "Add New" → "Project".
2. Selecciona el repositorio hidroscan-plus.
3. Vercel detectará automáticamente que es un proyecto Vite/React.

### Paso 3: Configurar el despliegue

En la pantalla de configuración, puedes dejarlo todo con los valores predeterminados:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Paso 4: Desplegar

1. Haz clic en "Deploy".
2. Vercel compilará y desplegará la aplicación. Esto puede tomar unos minutos.
3. Una vez completado, se te proporcionará una URL donde podrás acceder a la aplicación desplegada.

### Configurar dominio personalizado (Opcional)

1. En el dashboard del proyecto, ve a "Settings" → "Domains".
2. Agrega tu dominio personalizado y sigue las instrucciones para configurar los registros DNS.

## 🔌 Integración con Framer

HidroScanPlus puede integrarse fácilmente en proyectos de Framer:

### Opción 1: Usar un componente de iframe

```jsx
// En Framer, crea un componente personalizado
function HidroScanPlusEmbed(props) {
  return (
    <iframe
      src="https://tu-app-hidroscan.vercel.app"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: props.borderRadius || "12px",
        boxShadow: props.showShadow ? "0 2px 10px rgba(0,0,0,0.1)" : "none"
      }}
      title="HidroScanPlus App"
    />
  );
}

// Controles de propiedades
addPropertyControls(HidroScanPlusEmbed, {
  borderRadius: {
    type: ControlType.Number,
    defaultValue: 12,
    min: 0,
    max: 50
  },
  showShadow: {
    type: ControlType.Boolean,
    defaultValue: true
  }
});
```

### Opción 2: Usar el componente HTML en Framer

1. En Framer, arrastra un componente HTML a tu diseño
2. En el panel de propiedades, copia y pega el código del iframe:
```html
<iframe src="https://tu-app-hidroscan.vercel.app" style="width:100%;height:100%;border:none;border-radius:12px;"></iframe>
```

## 📊 Desarrollo y Ampliación

Este proyecto está estructurado de manera modular para facilitar su ampliación:

1. **Componentes**: Cada pantalla se divide en componentes reutilizables.
2. **Datos**: La información sobre nutrientes, preguntas y referencias está separada en archivos de datos.
3. **Lógica**: La lógica de evaluación se mantiene en hooks personalizados.

Para agregar nuevas características:

1. **Nuevas vitaminas**: Agrega la información en `src/data/nutrientes.js`.
2. **Nuevas preguntas**: Amplía las secciones en `src/data/cuestionario.js`.
3. **Nuevas referencias**: Añádelas en `src/data/referencias.js`.
4. **Nuevas interacciones**: Desarrolla la lógica en los hooks correspondientes.

## 🧪 Pruebas

Para ejecutar las pruebas (pendientes de implementación):

```bash
npm run test
```

## 🚨 Aviso importante

Esta aplicación proporciona una evaluación de riesgo nutricional con fines informativos únicamente. No constituye un diagnóstico médico ni sustituye la consulta con un profesional de la salud.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **4iaLabs** - *Trabajo inicial* - [4ailabs](https://github.com/4ailabs)

## 🙏 Agradecimientos

- A todos los colaboradores que han contribuido con su conocimiento y tiempo
- A la comunidad científica por las investigaciones en el campo de la nutrición

## 📌 Notas de actualización

### v2.0.1 (13/05/2025)
- Se corrigió la duplicidad de archivos de entrada (index.js, index.jsx)
- Se estandarizó el uso de importaciones sin extensiones de archivo
- Se corrigió la sintaxis JSX en AppContext para mayor consistencia
- Se actualizó la documentación para reflejar la estructura actual del proyecto

---

© 2025 HidroScanPlus