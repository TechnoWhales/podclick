import { useEffect, useRef } from 'react'

import { openDB, IDBPDatabase } from 'idb'

import { ImageDB, ImageType } from '@/features/profile/addPhoto/types/Image'

export const useImageDB = () => {
  const dbRef = useRef<IDBPDatabase<ImageDB> | null>(null)

  useEffect(() => {
    const initImageDB = async () => {
      const db = await openDB<ImageDB>('addPhotoImages', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('images')) {
            db.createObjectStore('images')
          }
        },
      })

      dbRef.current = db
    }

    initImageDB()
  }, [])

  const saveImages = async (key: string, images: ImageType[]) => {
    if (!dbRef.current) {
      return
    }
    await dbRef.current.put('images', images, key)
  }

  const getImages = async (key: string) => {
    if (!dbRef.current) {
      return null
    }

    return await dbRef.current.get('images', key)
  }

  const deleteImages = async (key: string) => {
    if (!dbRef.current) {
      return
    }
    await dbRef.current.delete('images', key)
  }

  const clearAll = async () => {
    if (!dbRef.current) {
      return
    }
    await dbRef.current.clear('images')
  }

  return { saveImages, getImages, deleteImages, clearAll }
}
