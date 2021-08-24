function mapFirebaseList<T extends FirebaseObject>(obj: {
  [key: string]: Omit<T, "_uid">;
}): T[] {
  return Object.keys(obj).map((key) => ({ ...obj[key], _uid: key } as T));
}

export default mapFirebaseList;
