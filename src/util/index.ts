export async function saveToStorage(storageKey: string, data: object): Promise<void> {
  try {
    await setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }, 200)
  } catch (error) {
    console.error('ERROR saving item to localStorage', error);
  }
}

export  function retrieveFromStorage(storageKey: string): Promise<object | null> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = localStorage.getItem(storageKey);
      if (item) {
        resolve(JSON.parse(item));
      }
      reject('Couldn\'t find grid')
    }, 100);
  })
}

