import firestore from '@react-native-firebase/firestore';

export const getCustomer = async userId => {
  var listCustomer = [];
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('customer')
    .orderBy('createAt', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let obj = doc.data();
        obj.id = doc.id;
        listCustomer.push(obj);
      });
    });
  return listCustomer;
};

export const getDocumentCustomer = async (userId, documentId) => {
  var data = {};
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('customer')
    .doc(documentId)
    .get()
    .then(doc => {
      if (doc.exists) {
        data = doc.data();
      }
    });
  return data;
};

export const addCustomer = async (userId, documentId, data) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('customer')
    .doc(documentId)
    .set(data);
  return;
};

export const editCustomer = async (userId, documentId, objectDataEdit) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('customer')
    .doc(documentId)
    .update(objectDataEdit);
  return;
};

export const deleteCustomer = async (userId, customerId) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('customer')
    .doc(customerId)
    .delete();
  return;
};
