import RNFS from 'react-native-fs';

const SelectPathImage = uri => {
  let path =
    uri.indexOf('https') > -1
      ? uri
      : `file://${RNFS.DocumentDirectoryPath}/${uri}`;
  return path;
};

export default SelectPathImage;
