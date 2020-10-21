import firestore from '@react-native-firebase/firestore';

export const getOrders = async userId => {
  var listOrders = [];
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('orders')
    .orderBy('createAt', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let obj = doc.data();
        obj.id = doc.id;
        listOrders.push(obj);
      });
    });
  return listOrders;
};

export const getStatusOrderInTransaction = async (userId, documentId) => {
  var statusOrderCustomer = [];
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('orders')
    .where('statusOrder', '==', 'inTransaction')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let obj = doc.data();
        if (obj.customer.id === documentId) {
          statusOrderCustomer.push(obj);
        }
      });
    });
  return statusOrderCustomer;
};

export const getListPurchaseOrders = async (userId, documentId) => {
  var listPurchaseOrders = [];
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('orders')
    .where('statusOrder', 'in', ['complete', 'cancellation'])
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let obj = doc.data();
        if (obj.customer.id === documentId) {
          listPurchaseOrders.push(obj);
        }
      });
    });
  return listPurchaseOrders;
};

export const addOrder = async (userId, documentId, data) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('orders')
    .doc(documentId)
    .set(data);
  return;
};

export const editOrder = async (userId, documentId, objectDataEdit) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('orders')
    .doc(documentId)
    .update(objectDataEdit);
  return;
};

export const deleteOrder = async (userId, orderId) => {
  await firestore()
    .collection('users')
    .doc(userId)
    .collection('orders')
    .doc(orderId)
    .delete();
  return;
};
