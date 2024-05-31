import { openDB } from 'idb';

const dbPromise = openDB('settings-db', 1, {
  upgrade(db) {
    db.createObjectStore('settings');
  },
});

export const setItem = async (key: string, val: any) => {
  const db = await dbPromise;
  return db.put('settings', val, key);
};

export const getItem = async (key: string) => {
  const db = await dbPromise;
  return db.get('settings', key);
};

