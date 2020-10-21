import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';
import {
  storeDataAsyncStorage,
  getDataAsyncStorage,
} from '@utils/AsyncStorageUtils';

const deleteValueInAsyncStorage = async (key, pathAndDocumentId) => {
  try {
    let data = await getDataAsyncStorage(key);
    if (data) {
      let value = await data.filter(el => {
        return el !== pathAndDocumentId;
      });
      if (value.length > 0) {
        await storeDataAsyncStorage(key, value);
      } else {
        await AsyncStorage.removeItem(key);
      }
    }
  } catch (e) {
    // error reading value
  }
};

export const onCleanAfterUpLoadSuccess = async (
  fileName,
  documentId,
  keyStorage,
) => {
  let path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  let pathAndDocumentId = `${path}_${documentId}`;
  await deleteValueInAsyncStorage(keyStorage, pathAndDocumentId);
  RNFS.exists(path)
    .then(result => {
      console.log('file exists: ', result);
      if (result) {
        return (
          RNFS.unlink(path)
            .then(() => {
              console.log('FILE DELETED');
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch(err => {
              console.log(err.message);
            })
        );
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const onSaveImageToTemp = async (
  uri,
  fileName,
  documentId,
  keyStorage,
) => {
  let destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  let pathAndDocumentId = `${destPath}_${documentId}`;
  await RNFS.copyFile(uri, destPath);
  await AsyncStorage.getItem(keyStorage, async (error, result) => {
    if (result !== null) {
      var newImages = JSON.parse(result).concat(pathAndDocumentId);
      await AsyncStorage.setItem(keyStorage, JSON.stringify(newImages));
    } else {
      await AsyncStorage.setItem(
        keyStorage,
        JSON.stringify([pathAndDocumentId]),
      );
    }
  });
};

export const uploadImageAsPromise = (fileName, documentId, keyStorage) => {
  return new Promise((resolve, reject) => {
    //Upload file
    var task = storage()
      .ref(`images/${fileName}`)
      .putFile(`${RNFS.DocumentDirectoryPath}/${fileName}`);
    //Update progress bar
    task.on(
      storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        if (snapshot.state === storage.TaskState.SUCCESS) {
        }
      },
      error => {
        onCleanAfterUpLoadSuccess(fileName, documentId, keyStorage);
        console.log('image upload error: ' + error.toString());
        reject(null);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(async downLoadURL => {
          await onCleanAfterUpLoadSuccess(fileName, documentId, keyStorage);
          resolve(downLoadURL);
        });
      },
    );
  });
};

const getFileNameFromDownLoadURL = downLoadURL => {
  let fileName = downLoadURL.substr(
    downLoadURL.indexOf('%2F') + 3,
    downLoadURL.indexOf('?') - (downLoadURL.indexOf('%2F') + 3),
  );
  fileName = fileName.replace('%20', ' ');
  return fileName;
};

export const deleteImageProduct = async downLoadURL => {
  let fileName = await getFileNameFromDownLoadURL(downLoadURL);
  await storage()
    .ref(`images/${fileName}`)
    .delete();
  return;
};
