import { FirebaseObject } from "./FirebaseObject";

export function mapFirebaseList<T extends FirebaseObject>(obj: {
  [key: string]: Omit<T, "_uid">;
}): T[] {
  return Object.keys(obj).map((key) => mapFirebaseObject(obj[key], key));
}

export function mapFirebaseObject<T extends FirebaseObject>(
  obj: Omit<T, "_uid">,
  uid: string
): T {
  return { ...obj, _uid: uid } as T;
}
