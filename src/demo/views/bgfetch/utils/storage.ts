import storage from 'common/service/storage';
const EVENTS_KEY = '@events';

export const persistEvents = async <T>(data: T) => {
  try {
    return storage.save({key: EVENTS_KEY, data: JSON.stringify(data)});
  } catch (e) {
    console.warn('AsyncStorage:setItem', e);
  }
};

export const loadEvents = async <T>(): Promise<T | null> => {
  try {
    const value = await storage.load({key: EVENTS_KEY});
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.warn('AsyncStorage:getItem', e);
  }
  return Promise.resolve(null);
};
