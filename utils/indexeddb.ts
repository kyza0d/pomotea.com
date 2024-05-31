import { openDB } from 'idb';

let dbPromise: Promise<any> | null = null;

if (typeof window !== 'undefined') {
  dbPromise = openDB('settings-db', 1, {
    upgrade(db) {
      db.createObjectStore('settings');
    },
  });
}

export const setItem = async (key: string, val: any) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  return db.put('settings', val, key);
};

export const getItem = async (key: string) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  return db.get('settings', key);
};
