import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../../config/firebase'
import type { CustomCategory } from '../../types'

export type NewCategoryInput = {
  label: string
  emoji: string
  color?: string
  soft?: string
}

const PRESET_COLORS = [
  { color: '#F59E0B', soft: '#FEF3C7' },
  { color: '#EC4899', soft: '#FCE7F3' },
  { color: '#8B5CF6', soft: '#EDE9FE' },
  { color: '#10B981', soft: '#D1FAE5' },
  { color: '#06B6D4', soft: '#CFFAFE' },
  { color: '#EF4444', soft: '#FEE2E2' }
]

export const addCustomCategory = async (
  userId: string,
  input: NewCategoryInput
): Promise<CustomCategory> => {
  const randomPreset = PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]
  const color = input.color || randomPreset.color
  const soft = input.soft || randomPreset.soft

  const categoryData = {
    label: input.label,
    emoji: input.emoji || '🏷️',
    color,
    soft,
    createdAt: serverTimestamp()
  }

  const userCategoriesRef = collection(db, 'users', userId, 'customCategories')
  const docRef = await addDoc(userCategoriesRef, categoryData)

  return {
    id: docRef.id,
    label: input.label,
    emoji: input.emoji || '🏷️',
    color,
    soft,
    userId
  }
}

export const subscribeToCustomCategories = (
  userId: string,
  callback: (categories: CustomCategory[]) => void
) => {
  const userCategoriesRef = collection(db, 'users', userId, 'customCategories')

  return onSnapshot(userCategoriesRef, (snapshot) => {
    const categories: CustomCategory[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        label: data.label,
        emoji: data.emoji || '🏷️',
        color: data.color || '#F59E0B',
        soft: data.soft || '#FEF3C7',
        userId
      }
    })

    callback(categories)
  })
}

