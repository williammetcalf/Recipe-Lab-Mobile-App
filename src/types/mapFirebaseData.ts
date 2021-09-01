import { FirebaseObject } from "./FirebaseObject";

export function mapFirebaseList<T extends FirebaseObject>(obj?: {
  [key: string]: Omit<T, "_uid">;
}): T[] {
  if (!obj) return [];
  return Object.keys(obj).map((key) => mapFirebaseObject(obj[key], key));
}

export function mapListToFirebaseData<T extends FirebaseObject>(list: T[]) {
  const obj: any = {};
  list.forEach((item) => {
    obj[item._uid] = mapDataToFirebaseObject(item);
  });
  return obj;
}

export function mapFirebaseObject<T extends FirebaseObject>(
  obj: Omit<T, "_uid">,
  uid: string
): T {
  return { ...obj, _uid: uid } as T;
}

export function mapDataToFirebaseObject<T extends FirebaseObject>(data: T) {
  const fbData: any = { ...data };
  delete fbData["_uid"];

  return fbData;
}
