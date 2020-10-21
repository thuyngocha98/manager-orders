import auth from '@react-native-firebase/auth';

export const logout = () => {
  return auth().signOut();
};

export const updateUser = async objectDataEdit => {
  await auth().currentUser.updateProfile(objectDataEdit);
  return auth().currentUser;
};
