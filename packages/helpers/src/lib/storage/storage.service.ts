import { ERROR_EMPTY_DATE_PROPERTY, ERROR_NON_EXISTENT_DATA, ERROR_REMOVING, ERROR_SET_DATA } from './models/error-message.cont';
import { KEY_NAME } from './models/key-name.const';
import { StorageType } from './models/storage-type.enum';

export class Storage<T> {

  private keyName!: string;

  constructor(keyName?: string) {
    this.keyName = keyName ? keyName : KEY_NAME;
  }

  set(data: T, storageType = StorageType.SESSION_STORAGE): void {

    try {

      if (!data) {
        throw ERROR_EMPTY_DATE_PROPERTY;
      }

      const dataJson = JSON.stringify(data);

      switch (storageType) {
        case StorageType.SESSION_STORAGE:
          sessionStorage.setItem(this.keyName, dataJson);
          break;
        case StorageType.LOCAL_STORAGE:
          localStorage.setItem(this.keyName, dataJson);
          break;
        default:
          throw ERROR_SET_DATA;
      }

    } catch (error) {
      console.warn(error);
    }
  }

  get(storageType = StorageType.SESSION_STORAGE): JSON | void {

    try {

      const dataJson = storageType === StorageType.SESSION_STORAGE ? sessionStorage.getItem(this.keyName) : localStorage.getItem(this.keyName);

      if (!dataJson) {
        throw storageType;
      }

      return JSON.parse(dataJson);

    } catch (error) {
      console.warn(`${ERROR_NON_EXISTENT_DATA} ${error}`);
    }
  }

  remove(storageType = StorageType.SESSION_STORAGE): void {

    try {
      switch (storageType) {
        case StorageType.SESSION_STORAGE:
          sessionStorage.removeItem(this.keyName);
          break;
        case StorageType.LOCAL_STORAGE:
          localStorage.removeItem(this.keyName);
          break;
        default:
          throw ERROR_REMOVING;
      }

    } catch (error) {
      console.warn(`${error} ${storageType}`);
    }
  }

  clear(): void {
    sessionStorage.clear();
  }
}
