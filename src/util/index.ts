export async function saveToStorage(storageKey: string, data: object): Promise<void> {
  try {
    await setTimeout(() => {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }, 200)
  } catch (error) {
    console.error('ERROR saving item to localStorage', error);
  }
}

export async function retrieveFromStorage(storageKey: string): Promise<object | null> {
  try {
    await setTimeout(() => {
      const item = localStorage.getItem(storageKey);
      if (item) {
        return JSON.parse(item);
      }
    }, 100);
  } catch (error) {
    console.error('ERROR retrieving item to localStorage', error);
  } finally {
    return null;
  }
}

