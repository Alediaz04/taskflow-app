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





## PRE-ENTREGA 7
Séptima fase del desarrollo: TaskFlow pasó de ser una app local a una app conectada. Se integró Firebase Auth para la sesión de usuario y Firestore para persistir las tareas en la nube, reemplazando el Store de Redux como única fuente de datos por un espejo en tiempo real de la base de datos.

# Nuevas dependencias
    firebase, @react-native-async-storage/async-storage

# Arquitectura de autenticación y datos
    RootNavigator (escucha la sesión con onAuthStateChanged)
    ├── Sin sesión  -> AuthStack (Native Stack)
    │   ├── Login    (src/screens/auth/LoginScreen.tsx)
    │   └── Register (src/screens/auth/RegisterScreen.tsx)
    └── Con sesión  -> TabNavigator (Home / Profile), como en la Pre-entrega 6

    src/config/firebase.ts          -> inicializa Firebase (app, auth con persistencia
                                        en AsyncStorage, db de Firestore)
    src/services/auth/authService.ts   -> createAccount, signIn, logout
    src/services/tasks/tasksService.ts -> createTask, subscribeToTasks (listener en
                                        tiempo real filtrado por userId), updateTaskStatus,
                                        removeTask
    src/features/auth/authSlice.ts     -> estado global: { user, isLoading }

    Las pantallas de tareas ya no escriben en Redux directamente: llaman a
    tasksService (que impacta en Firestore), y es el listener de Firestore
    (onSnapshot) el que despacha setTasks para actualizar el store. Redux
    pasó a ser un espejo en memoria de Firestore, no la fuente de verdad.

# Que construimos en esta pre entrega?
    1. Login y Registro contra Firebase Auth (email/contraseña), con manejo de error visible en la UI
    2. Persistencia de sesión: onAuthStateChanged detecta al usuario logueado al abrir la app
       (gracias a getReactNativePersistence + AsyncStorage), sin pedir login de nuevo
    3. Rutas protegidas: RootNavigator decide AuthStack o TabNavigator según haya o no un usuario activo
    4. Colección "tasks" en Firestore: cada documento incluye un userId con el uid del dueño
    5. CRUD real contra Firestore: crear, togglear completado y eliminar impactan directo en la base
    6. Lista reactiva con onSnapshot: los cambios en Firestore se reflejan en la UI sin recargar nada a mano
    7. tasksSlice actualizado: arranca vacío (ya no con datos de ejemplo) y suma la acción setTasks
       para poblarse desde el listener de Firestore

# Que se logro?
    1. Un usuario "A" no puede ver ni modificar las tareas de un usuario "B" (query filtrada por
       where('userId', '==', uid))
    2. Togglear o eliminar una tarea desde el Detalle se refleja al instante en la Lista, porque
       ambas pantallas leen del mismo store, alimentado por el mismo listener
    3. Cerrar y volver a abrir la app no vuelve a pedir login (persistencia de sesión real)
    4. La app maneja errores de autenticación (contraseña incorrecta, email en uso) sin romperse,
       mostrando el mensaje en la propia pantalla

# Cómo se probaron los flujos de login y guardado de tareas
    1. Registro: se creó una cuenta nueva desde RegisterScreen (email + contraseña) y se verificó
       la redirección automática al Home (Tab de Tareas) sin pasos manuales adicionales
    2. Verificación en Firebase: se confirmó en Firebase Console -> Authentication que el usuario
       quedó dado de alta
    3. Guardado de tareas: se creó una tarea desde el formulario y se verificó que apareciera de
       inmediato en la lista, y también en Firebase Console -> Firestore Database -> colección "tasks",
       con su campo userId correspondiente

## MODIFICACIONES PROPIAS:
    1. Agregue un boton de cerrar sesion en la parte de perfil, para poder cerrar la sesion y entrar con otra cuenta
    2. Le mejore el disenio UX/UI de login y register para poder tener una experiencia de usuario superior


## ENTREGA FINAL: TASKFLOW COMPLETO Y LISTO PARA PRODUCCIÓN
Consolidación final de la aplicación móvil TaskFlow.

# Qué se logró en la Entrega Final:
    1. Flujo de Autenticación Completo: Login, Registro y Logout conectados a Firebase Auth con persistencia de sesión segura vía @react-native-async-storage/async-storage.
    2. Persistencia e Integración Realtime: Sincronización en tiempo real de Firestore con Redux Toolkit (tasksSlice + subscribeToTasks), aislando las tareas por cada userId.
    3. Gestión de Perfil e Identidad Visual: Selección e integración nativa de avatares mediante expo-image-picker. Guardado de foto de perfil en Firestore (users/{uid}) y reflejo en tiempo real en la UI y en Redux (authSlice).
    4. Navegación e Interfaz Consistente: Bottom Tabs + Native Stack con React Navigation. Soporte completo de Modo Claro / Modo Oscuro (Dark Mode).
    5. Estabilidad y Calidad: 0 errores de compilación de TypeScript (npx tsc --noEmit), manejo seguro de permisos de hardware y experiencia fluida sin cierres inesperados.


    ## ENTREGA FINAL
Última fase del proyecto: se consolidó todo lo construido en las pre-entregas anteriores y se sumó la última funcionalidad nativa (foto de perfil con expo-image-picker), dejando TaskFlow listo para producción.

# Nueva dependencia
    expo-image-picker

# Qué se sumó en esta entrega
    1. src/services/profile/profileService.ts -> getUserProfile / updateUserPhoto contra un
       documento users/{uid} en Firestore (separado de la colección tasks)
    2. authSlice: se agregó photoURL a AuthUser y la acción setUserPhoto
    3. RootNavigator: después de detectar la sesión (onAuthStateChanged), hidrata la foto de
       perfil desde Firestore sin demorar la entrada a la app (setUser primero, foto después)
    4. ProfileScreen: el círculo de iniciales ahora es tocable -- pide permiso de galería,
       abre el selector nativo (con recorte cuadrado) y guarda la foto en Firestore + Redux

# Cómo funciona el flujo de la foto de perfil
    1. El usuario toca su avatar en la pestaña Perfil
    2. Se pide permiso de acceso a la galería (ImagePicker.requestMediaLibraryPermissionsAsync);
       si lo rechaza, se muestra una alerta y no pasa nada más
    3. Se abre el selector nativo de imágenes con recorte 1:1
    4. Si el usuario cancela, no se guarda nada (no hay crash ni pantalla en blanco)
    5. Si elige una imagen, su URI se guarda en Firestore (users/{uid}.photoURL) y también
       en Redux (setUserPhoto), así la UI se actualiza al instante sin esperar ningún listener

# Reglas de seguridad de Firestore
    Solo usuarios autenticados acceden a sus propios datos:

    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /tasks/{taskId} {
          allow read, delete: if request.auth.uid == resource.data.userId;
          allow create: if request.auth.uid == request.resource.data.userId;
          allow update: if request.auth.uid == resource.data.userId
                        && request.auth.uid == request.resource.data.userId;
        }
        match /users/{userId} {
          allow read, write: if request.auth.uid == userId;
        }
      }
    }

# Cómo correr el proyecto
    npm install
    npx expo start
    Escaneá el código QR con Expo Go (Android/iOS), o presioná "a" para abrir el emulador de Android.

    La configuración de Firebase vive en src/config/firebase.ts, con las credenciales del
    proyecto propio (taskflow-app-c2272).

# Despliegue
    npx eas update --branch preview --message "Entrega final TaskFlow"
    (requiere cuenta de Expo y "eas init" la primera vez; genera un link que abre la app
    directo en Expo Go, sin necesidad de clonar el repo ni tener la compu prendida)

# Evidencia visual
    En la carpeta "PruebasTaskFlow" de este repositorio hay un video mostrando el
    funcionamiento completo de la app: registro de usuario, login, lista de tareas
    sincronizada con Firestore, creación y detalle de una tarea, y cambio de foto
    de perfil desde la galería.

# Cómo se probó el flujo completo
    1. Login -> App privada: se inició sesión con una cuenta ya registrada y se verificó el
       ingreso directo al Home con las tareas propias cargadas desde Firestore
    2. Cambio de foto de perfil: se tocó el avatar, se seleccionó una imagen de la galería y
       se confirmó que se actualizó al instante en la UI y quedó guardada en Firestore
       (Firestore Database -> colección users -> documento del uid -> campo photoURL)
    3. Cancelar selección de imagen: se abrió el selector y se canceló, confirmando que la
       app no se cierra ni rompe nada
    4. Logout -> Login: se cerró sesión desde Perfil y se confirmó que vuelve a la pantalla
       de Login (rutas protegidas funcionando en ambos sentidos)
    5. Reglas de seguridad: se probó (con la consola de Firebase) que un usuario sin sesión
       no puede leer la colección tasks ni users

#### Link Expo GO ####
https://expo.dev/accounts/alediazdev/projects/taskflow-app/updates/b04139fc-e289-4f6e-9d5b-33671902914e

