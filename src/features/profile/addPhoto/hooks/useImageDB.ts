import { useRef, useCallback } from 'react'

import { openDB, IDBPDatabase } from 'idb'

import { ImageType } from '@/features/profile/addPhoto/types/Image'

export type ImageDB = {
  images: {
    key: string
    value: ImageType[]
  }
}

export const useImageDB = () => {
  const dbRef = useRef<IDBPDatabase<ImageDB> | null>(null)

  const getDb = async (): Promise<IDBPDatabase<ImageDB>> => {
    if (dbRef.current) {
      return dbRef.current
    }

    const db = await openDB<ImageDB>('addPhotoImages', 2, {
      upgrade(upgradeDb) {
        if (!upgradeDb.objectStoreNames.contains('images')) {
          upgradeDb.createObjectStore('images')
        }
      },
    })

    dbRef.current = db

    return db
  }

  const saveImages = useCallback(async (key: string, images: ImageType[]) => {
    try {
      const db = await getDb()

      await db.put('images', images, key)
    } catch (error) {
      console.error('IndexedDB saveImages error:', error)
      throw error
    }
  }, [])

  const getImages = useCallback(async (key: string): Promise<ImageType[] | null | undefined> => {
    try {
      const db = await getDb()

      return await db.get('images', key)
    } catch (error) {
      console.error('IndexedDB getImages error:', error)

      return null
    }
  }, [])

  const deleteImages = useCallback(async (key: string) => {
    try {
      const db = await getDb()

      await db.delete('images', key)
    } catch (error) {
      console.error('IndexedDB deleteImages error:', error)
    }
  }, [])

  const clearAll = useCallback(async () => {
    try {
      const db = await getDb()

      await db.clear('images')
    } catch (error) {
      console.error('IndexedDB clearAll error:', error)
    }
  }, [])

  return { saveImages, getImages, deleteImages, clearAll }
}
