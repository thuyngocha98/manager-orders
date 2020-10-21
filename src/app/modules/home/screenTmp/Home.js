import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import styles from '@modules/home/styles/styles';
import {useSelector, useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  reduxGetData,
  reduxAddData,
  reduxDeleteData,
  reduxEditData,
} from '@actions/action';

const Home = ({navigation}) => {
  const [state, setState] = React.useState({
    modalVisible: false,
    text: '',
    textModal: '',
    id: '',
  });

  const dispatch = useDispatch();
  const {data} = useSelector(states => ({data: states.getData.data}));

  const addData = () => {
    let txt = state.text;
    dispatch(
      reduxAddData({collection: 'todos', document: '', field: {title: txt}}),
    );
    setState({
      ...state,
      text: '',
    });
  };

  const deleteDoc = doc => {
    dispatch(reduxDeleteData({collection: 'todos', document: doc}));
  };

  const closeModal = () => {
    setState({
      ...state,
      modalVisible: false,
    });
  };

  const pressEdit = async (Id, title) => {
    await setState({
      ...state,
      id: Id,
      textModal: title,
      modalVisible: true,
    });
  };

  const acceptEdit = () => {
    dispatch(
      reduxEditData({
        collection: 'todos',
        doc: state.id,
        fieldName: 'title',
        content: state.textModal,
      }),
    );
    closeModal();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={state.modalVisible}
        animationType={'slide'}
        transparent
        onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <TextInput
              style={styles.inputModel}
              onChangeText={txt => {
                setState({
                  ...state,
                  textModal: txt,
                });
              }}
              value={state.textModal}
            />
            <View style={styles.viewBtn}>
              <TouchableOpacity onPress={closeModal} style={styles.viewCancel}>
                <Text style={styles.txtModel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={acceptEdit} style={styles.viewCancel}>
                <Text style={styles.txtModel}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          onChangeText={txt => {
            setState({
              ...state,
              text: txt,
            });
          }}
          value={state.text}
        />
        <TouchableOpacity style={styles.btnAdd} onPress={addData}>
          <Text style={styles.txtAdd}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewFlatList}>
        <FlatList
          scrollEnabled
          data={data}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.viewTxt,
                {backgroundColor: index % 2 === 0 ? 'gray' : 'lightgrey'},
              ]}>
              <Text
                onPress={() => pressEdit(item.id, item.title)}
                style={styles.txt}>
                {item.title}
              </Text>
              <TouchableOpacity
                onPress={() => deleteDoc(item.id)}
                style={styles.viewDel}>
                <Text style={styles.txtDel}>X</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <Text onPress={() => navigation.navigate('Blank')}>next</Text>
      <TouchableOpacity
        style={styles.btnGet}
        onPress={() => {
          dispatch(
            reduxGetData({
              collection: 'todos',
              document: '',
              fieldSort: 'title',
            }),
          );
        }}>
        <Text style={styles.txtGet}>Get Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
