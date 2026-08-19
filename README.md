# TaskFlow 🚀

Aplicación móvil desarrollada con **React Navigation**, **React Native** y **Expo** para gestionar tareas, hábitos y metas personales.

---

## 🛠️ Instalación y Ejecución Local

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd taskflow-app
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npx expo start -c
   ```

4. **Escanear el código QR** desde la app de Expo Go en tu dispositivo móvil (o presionar `a` para emulador Android / `i` para iOS).

---

## 📱 Arquitectura de Navegación (Checkpoint 5)

TaskFlow implementa una **arquitectura de navegación anidada profesional** usando React Navigation (`@react-navigation/bottom-tabs` + `@react-navigation/native-stack`).

```text
NavigationContainer (Root)
└── BottomTabNavigator (Navegador de Pestañas)
    ├── Tab "Tareas" -> TaskStack (Native Stack Navigator)
    │   ├── TaskList   (src/screens/tasks/TasksScreen.tsx)
    │   ├── TaskDetail (src/screens/tasks/TaskDetailScreen.tsx)
    │   └── TaskForm   (src/screens/tasks/TaskFormScreen.tsx)
    └── Tab "Perfil" -> ProfileStack (Native Stack Navigator)
        └── Profile    (src/screens/profile/ProfileScreen.tsx)
```

---

## 📋 Criterios de Aceptación Cumplidos

1. **Arquitectura Anidada (`TabNavigator`)**:
   - `Tab.Navigator` como ruta principal con dos pestañas: **Tareas** (Home) y **Perfil**.
   - Iconos representativos mediante `@expo/vector-icons` (`Ionicons`).

2. **Stack Navigator de Tareas (`TaskStack`)**:
   - **`TaskList`**: Pantalla principal con la lista de tareas (`FlatList`), contadores de progreso y filtros.
   - **`TaskDetail`**: Pantalla de detalle de tarea apilada sobre la lista.
   - **`TaskForm`**: Pantalla dedicada para la creación de nuevas tareas dentro del stack.

3. **Paso de Parámetros (`route.params`)**:
   - Al presionar una tarea en `TaskList`, se ejecuta:
     ```typescript
     navigation.navigate('TaskDetail', { taskId: item.id, task: item })
     ```
   - En `TaskDetailScreen`, los parámetros son leídos a través de `route.params.taskId` y renderizados dinámicamente.

4. **Navegación Programática tras Guardar**:
   - Al completar los campos en `TaskFormScreen` y accionar el botón **"Guardar Tarea"**, se procesa la adición y se realiza la redirección programática automática:
     ```typescript
     navigation.navigate('TaskList')
     ```

5. **Consistencia Visual**:
   - Headers nativos configurados con títulos coherentes en cada pantalla (*"Mis tareas"*, *"Detalles de la tarea"*, *"Nueva Tarea"*, *"Mi perfil"*).

---

## 📂 Estructura del Proyecto

```text
taskflow-app/
├── assets/                  # Recursos gráficos e imágenes
├── src/
│   ├── components/          # Componentes de UI reutilizables (TaskItem, EmptyState, MountBadge, etc.)
│   ├── data/                # Datos semilla (SEED_TASKS)
│   ├── navigation/          # Configuración de React Navigation
│   │   ├── TabNavigator.tsx # Navegador principal por pestañas (Bottom Tabs)
│   │   ├── TaskStack.tsx    # Stack para la sección de tareas (List -> Detail -> Form)
│   │   ├── ProfileStack.tsx # Stack para la sección de perfil
│   │   └── types.ts         # Definiciones de TypeScript para RootStackParamList
│   ├── screens/             # Pantallas organizadas por dominio
│   │   ├── profile/
│   │   │   └── ProfileScreen.tsx
│   │   └── tasks/
│   │       ├── TasksScreen.tsx
│   │       ├── TaskDetailScreen.tsx
│   │       └── TaskFormScreen.tsx
│   ├── theme/               # Paleta de colores, sombras, bordes y layout global
│   └── types/               # Tipos del dominio (Task, Category, DueDate)
├── App.tsx                  # Punto de entrada wrapping SafeAreaProvider
├── package.json
└── README.md
```

---

## 🔮 Próximos Módulos

- **Módulo 6 (Redux Toolkit)**: Centralización del estado de tareas en un *store* global de Redux.
- **Módulo 7 (Firebase)**: Autenticación de usuarios y persistencia de datos en Firestore / Realtime Database.
- **Módulo 8 (Final)**: Transiciones avanzadas, integración de cámara para foto de perfil y preparación para producción.
