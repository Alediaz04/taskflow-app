import { getApps, initializeApp } from 'firebase/app'
// @ts-ignore -- getReactNativePersistence existe en runtime pero los tipos
// de firebase/auth todavía no lo declaran para el entrypoint de React Native.
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Tu proyecto de Firebase (taskflow-app-c2272). El apiKey de una app cliente
// es público por diseño: la seguridad real la dan las Firestore Security
// Rules, no mantener esto en secreto.
const firebaseConfig = {
  apiKey: 'AIzaSyAE4e7BsUW3UXBuYri7jdxicYZrNc3-AAk',
  authDomain: 'taskflow-app-c2272.firebaseapp.com',
  projectId: 'taskflow-app-c2272',
  storageBucket: 'taskflow-app-c2272.firebasestorage.app',
  messagingSenderId: '217236187485',
  appId: '1:217236187485:web:6958bf90112b2206c260b4'
}

// Evita re-inicializar la app si este archivo se vuelve a importar
// (pasa seguido con el hot-reload de Expo).
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// getReactNativePersistence hace que la sesión sobreviva a cerrar la app,
// guardando el token en AsyncStorage (celular). Sin esto, cada vez que
// abrieras TaskFlow tendrías que loguearte de nuevo.
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const db = getFirestore(app)

export { auth, db }
export default app
