import firestore from '@react-native-firebase/firestore';

export const getProduct = async userId => {
  var listProduct = [];
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .orderBy('createAt', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let obj = doc.data();
        obj.id = doc.id;
        listProduct.push(obj);
      });
    });
  return listProduct;
};

export const getImageProduct = async (userId, documentId) => {
  var listImageProduct = '';
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .doc(documentId)
    .get()
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        let obj = docSnapshot.data();
        listImageProduct = obj.images[0];
      }
    });
  return listImageProduct;
};

export const addProduct = async (userId, documentId, data) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .doc(documentId)
    .set(data);
  return;
};

export const editProduct = async (userId, documentId, objectDataEdit) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .doc(documentId)
    .update(objectDataEdit);
  return;
};

export const updateLinkImageProduct = async (userId, documentId, linkImage) => {
  const arrayUnion = firestore.FieldValue.arrayUnion;
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .doc(documentId)
    .update({images: arrayUnion(linkImage)});
  return;
};

export const deleteImage = async (userId, documentId, linkImage) => {
  const arrayRemove = firestore.FieldValue.arrayRemove;
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .doc(documentId)
    .update({images: arrayRemove(linkImage)});
  return;
};

export const deleteProduct = async (userId, productId) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('product')
    .doc(productId)
    .delete();
  return;
};
