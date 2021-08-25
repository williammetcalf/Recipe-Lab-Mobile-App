import firebase from "firebase";
import uuid from "react-native-uuid";

async function uploadLocalImage(uri: string) {
  const blob = await new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4().toString());
  const snapshot = await ref.put(blob);
  blob.close();
  return snapshot;
}

export default uploadLocalImage;
