import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export type UserProfile = {
  photoURL: string | null
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const snapshot = await getDoc(doc(db, 'users', userId))

    if (!snapshot.exists()) return null

    const data = snapshot.data()
    return {
      photoURL: data.photoURL ?? null
    }
  } catch (error) {
    console.error('Error al cargar perfil desde Firestore:', error)
    return null
  }
}

export const updateUserPhoto = async (userId: string, photoURL: string) => {
  await setDoc(doc(db, 'users', userId), { photoURL }, { merge: true })
}


