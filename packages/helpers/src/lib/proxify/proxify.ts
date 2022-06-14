export class Proxify {

  static proxy<T>(obj: object, keys: string): T {
    return keys.split('.').reduce((value: any, key: any): any | undefined => {
      return value && key in value ? value[key] as T : undefined;
    }, obj);
  }
}
