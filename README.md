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


## PRE-ENTREGA 6
Sexta fase del desarrollo ,implementacion de Redux Toolkit para el manejo del estado de las tareas, se eliminaron los estados globales de las pantallas, pasandolos todos a tareasSlice y usando selectores para obtener los datos

# Nuevas dependencias
 @reduxjs/toolkit, react-redux

# Estructura de navegacion
    TabNavigator (Bottom Tabs, sin header propio)
    ├── Home -> TaskStack (Native Stack, header nativo visible)
    │   ├── TaskList   (src/screens/tasks/TasksScreen.tsx)
    │   ├── TaskDetail (src/screens/tasks/TaskDetailScreen.tsx)
    │   └── TaskForm   (src/screens/tasks/TaskFormScreen.tsx)
    └── Profile -> ProfileStack (Native Stack, header nativo visible)
        └── Profile (src/screens/profile/ProfileScreen.tsx)

    TaskStack ya no maneja estado local (useState): cada pantalla se conecta
    directo al store de Redux con useAppSelector / useAppDispatch.
    route.params.TaskDetail solo viaja con { taskId: string } -- el detalle
    busca la tarea fresca en el store con selectTaskById, en vez de recibir
    una "foto" de la tarea como antes.

# Que construimos en esta pre entrega?
 1. src/store/index.ts -> configureStore con el reducer de tasks
 2. src/store/hooks.ts -> useAppDispatch / useAppSelector (hooks tipados)
 3. src/features/tasks/tasksSlice.ts -> createSlice "tasks" con:
      state: { items: Task[], filter: FilterId }
      reducers: addTask, toggleTaskStatus, deleteTask, setFilter
      selectores: selectAllTasks, selectFilter, selectFilteredTasks, selectTaskById
 4. <Provider store={store}> envolviendo toda la app en App.tsx
 5. TaskStack simplificado: sin useState ni render props, cada Stack.Screen
    usa component={...} directo
 6. TasksScreen, TaskDetailScreen y TaskFormScreen conectados al store con
    dispatch(...) en vez de recibir tasks/onToggle/onAdd por props

# Que se logro?
    1. Ya no se usa useState para la lista de tareas principal ni para el filtro
    2. 4 acciones funcionales conectadas a la UI: addTask, toggleTaskStatus, deleteTask, setFilter
    3. Consistencia entre pantallas: togglear/eliminar una tarea en el detalle se refleja
       al instante en la lista principal, sin pasar callbacks a mano entre componentes
    4. El filtro seleccionado (Todas/Hoy/Completadas/categoria) persiste al navegar entre
       TaskList, TaskDetail y las pestañas del Tab, porque vive en el store y no en un
       useState local de la pantalla
    5. Componentes mas "puros": las pantallas ya no reciben ni reenvian datos por props,
       solo leen y despachan contra el store

## MODIFICACIONES PROPIAS:
    1. Le agregue un modal que salta cuando el usuario completa todas las tareas
    2. Tambien agregue la functionality de que el modal no vuelva a aparecer hasta que el usuario complete todas las tareas de nuevo
    3. Agregue Modo Oscuro (se puede cambiar entre modo claro y modo oscuro en la seccion de perfil) para mejorar la UX/UI de usuario aunque predeterminado vendra en modo claro
    