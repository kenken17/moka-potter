import { openDB } from 'idb'

const DB_NAME = 'moka-potter'
const STORE_NAME = 'brews'
const DB_VERSION = 1

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        })
        store.createIndex('date', 'date', { unique: false })
      }
    }
  })
}

export async function addBrew(brew) {
  const db = await getDB()
  const id = await db.add(STORE_NAME, {
    ...brew,
    createdAt: Date.now()
  })
  db.close()
  return id
}

export async function getAllBrews() {
  const db = await getDB()
  const all = await db.getAll(STORE_NAME)
  db.close()
  // newest first
  return all.sort((a, b) => b.createdAt - a.createdAt)
}

export async function deleteBrew(id) {
  const db = await getDB()
  await db.delete(STORE_NAME, id)
  db.close()
}

export async function getBrewById(id) {
  const db = await getDB()
  const brew = await db.get(STORE_NAME, Number(id))
  db.close()
  return brew
}

export async function clearBrews() {
  const db = await getDB()
  await db.clear(STORE_NAME)
  db.close()
}
