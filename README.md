# TASKFLOW

Aplicacion movil desarrollada con React Native y Expo para gestionar tareas, habitos y metas personales

## instrucciones para abrir el proyecto localmente

    clonar el repositorio de github git clone cd taskflow-app

    instalar dependencias del proyecto npm install

    iniciar el servidor npx expo start -c

    Escanear el codigo QR en la app de expo GO

## ESTRUCTURA INICIAL DEL PROYECTO

taskflow-app 
-- src/ 
   -- assets/ # recursos como imagenes o fuentes 
   -- components/ # componentes reutilizables de la UI 
   -- screens/ # pantallas principales de la aplicacion 
   -- theme/ # paleta de colores y estilos globales 
-- .gitignore # archivos y historial ignorados para git
-- App.js # Entrada de la app 
-- app.json # configuracion global y metadatos de Expo 
-- package.json # dependencias del proyecto
-- README.md #documentacion del proyecto


## PRE- ENTREGA 2
segunda fase de desarrollo retomando el repositorio del modulo 1 con algunas correcciones
# Que construimos en esta pre entrega?
    1. Arquitectura de archivos
    2. Pantallas Base del proyecto (HomeScreen, ProfileScreen)
    3. Componente ProfileCard
    4. Sistema de estilos

# Que se logro?
    1. Arquitectura Modular: creacion de carpetas como /components, /screens, assets, constants
    2. Sistema de disenio: Implementacion de un archivo theme.js para guardar y manejar los colores de la app
    3. Crear componente reutilizable: se creo ProfileCard.js utilizando props (solicitado en la consigna 'name', 'role', 'image') 
    4. Crear pantallas como lo es HomeScreen.js como base y ProfileScreen.js donde renderizamos la ProfileCard.js

## PRE-ENTREGA 3
Tercera fase del desarrollo donde se realizo la creacion de un formulario de creacion de tareas con su Logica de fondo
# Que construimos en esta pre entrega?
 1. Creacion de un formulario Visual y funcional
 2. Inputs controlados para titulo y descripcion
 3. Validaciones (titulo y descripcion)
 4. FeedBack visual para mejor experiencia UX del usuario
 5. Boton "Agregar Tarea"funcional y logico con su manejo de errores
 6. KeyboardAvoidingView y ScrollView para que el teclado no tape el formulario en pantalla
# Que se logro?
    1. un formulario funcional que valida datos antes de aceptarlos
    2. Simulacion de guardados, mostrando un Alert que esto se realizo correctamente
    3. Limpieza automatica del formulario luego de un guardado exitoso
    4. Base logica para conectar en los proximos checkPoints



## PRE-ENTREGA 4
Cuarta fase del desarrollo ,modificamos la pantalla FlatListScreen.tsx para mejorar su experiencia visual y funcionalidad
# Que construimos en esta pre entrega?
 1. Componente reutilizable FlatListScreen.tsx 
 2. inputs controlados para titulo y descripcion
 3. Validaciones (titulo y descripcion)
 4. FeedBack visual para mejor experiencia UX del usuario
 5. Boton "Agregar Tarea"funcional y logico con su manejo de errores
 6. KeyboardAvoidingView y ScrollView para que el teclado no tape el formulario en pantalla
# Que se logro?
    1. un formulario funcional que valida datos antes de aceptarlos
    2. Simulacion de guardados, mostrando un Alert que esto se realizo correctamente
    3. Limpieza automatica del formulario luego de un guardado exitoso
    4. Base logica para conectar en los proximos checkPoints


## PRE-ENTREGA 5
Quinta fase del desarrollo, se integro React Navigation (Bottom Tabs + Native Stack) reemplazando el manejo manual de pantallas por estado en App.tsx
# Estructura de navegacion
    TabNavigator (Bottom Tabs, sin header propio)
    ├── Home -> TaskStack (Native Stack, header nativo visible)
    │   ├── TaskList   (src/screens/tasks/TasksScreen.tsx)
    │   └── TaskDetail (src/screens/tasks/TaskDetailScreen.tsx)
    └── Profile -> ProfileStack (Native Stack, header nativo visible)
        └── Profile (src/screens/profile/ProfileScreen.tsx)

    El estado de las tareas (tasks, addTask, toggleTask, deleteTask) vive en
    TaskStack y se inyecta a TaskList y TaskDetail via render props, para que
    ambas pantallas compartan la misma fuente de datos durante la navegacion.
    El formulario de alta de tareas es un modal dentro de TaskList (no una
    pantalla aparte del stack), tal como permite la consigna.
# Que construimos en esta pre entrega?
   1. TabNavigator con dos pestañas: Home (tareas) y Profile
   2. TaskStack (TaskList -> TaskDetail) y ProfileStack (Profile)
   3. Reorganizacion de las pantallas en src/screens/tasks/ y src/screens/profile/
   4. src/theme/layout.ts con estilos de contenedor compartidos entre pantallas
   5. Header nativo visible con titulo coherente por pantalla (Mis tareas / Detalles de la tarea / Mi perfil)
   6. Iconos de tabs con @expo/vector-icons (compatible con Expo Go sin config nativa)
# Que se logro?
    1. Navegacion real entre pantallas en lugar de renderizado condicional
    2. Paso de parametros: TaskDetail recibe la tarea completa (incluye id y title) via route.params
    3. El estado de las tareas se elevo a TaskStack para compartirlo entre TaskList y TaskDetail
    4. Se conservaron los filtros, la barra de progreso y el MountBadge de la Pre-entrega 4
    5. Base para sumar mas pantallas dentro de cada stack en los proximos checkpoints