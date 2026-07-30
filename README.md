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
#Que construimos en esta pre entrega?
    1. Arquitectura de archivos
    2. Pantallas Base del proyecto (HomeScreen, ProfileScreen)
    3. Componente ProfileCard
    4. Sistema de estilos

## Que se logro?
    1. Arquitectura Modular: creacion de carpetas como /components, /screens, assets, constants
    2. Sistema de disenio: Implementacion de un archivo theme.js para guardar y manejar los colores de la app
    3. Crear componente reutilizable: se creo ProfileCard.js utilizando props (solicitado en la consigna 'name', 'role', 'image') 
    4. Crear pantallas como lo es HomeScreen.js como base y ProfileScreen.js donde renderizamos la ProfileCard.js

