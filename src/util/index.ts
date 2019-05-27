export async function saveToStorage(storageKey: string, data: any): Promise<void> {
  try {
    await setTimeout(() => {
      const toSave = [];
      const prev = localStorage.getItem(storageKey);
      if (prev) {
        toSave.push(...JSON.parse(prev));
      }
      data.id = toSave.length;
      localStorage.setItem(storageKey, JSON.stringify([ ...toSave, data ]));
    }, 200)
  } catch (error) {
    console.error('ERROR saving item to localStorage', error);
  }
}

interface WithId {
  id: number,
}

export function updateStorage(storageKey: string, id: number, data: any): Promise<string | void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const storedArray = JSON.parse(stored) as WithId[];
        for (let i = 0; i < storedArray.length; i++) {
          const item = storedArray[i];
          if (item.id === id) {
            Object.assign(item, data);
            localStorage.setItem(storageKey, JSON.stringify(storedArray));
            resolve();
          }
        }
        reject('No item found with id: ' + id);
      }
    }, 100);
  });
}

export function retrieveFromStorage(storageKey: string): Promise<any | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = localStorage.getItem(storageKey);
      if (item) {
        resolve(JSON.parse(item));
      }
      reject('Couldn\'t find grids')
    }, 100);
  })
}

