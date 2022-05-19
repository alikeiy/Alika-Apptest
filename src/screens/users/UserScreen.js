import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  ToastAndroid,
} from 'react-native';
import CardUserComponent from '../../components/CardUserComponent';
import VectorIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import {
  saveContact,
  editContact,
  getAllContact,
  deleteContact,
  getContactByID,
} from '../users/UserService';

const initialForm = {
  id: '',
  firstName: '',
  lastName: '',
  age: '',
  photo: '',
};
const UserScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);

  const loadData = () => {
    getAllContact().then(resp => {
      if (resp.code === 200) {
        setUsers(resp.data);
      }
    });
  };

  const loadDatabyID = () => {
    getContactByID().then(resp => {
      if (resp.code === 400) {
        setUsers(resp.data.id);
      }
    });
  };

  const handleSave = action => {
    switch (action) {
      case 'SAVE':
        {
          saveContact(form).then(resp => {
            console.log('SAVE CONTACT', resp);
            if (resp.code === 201) {
              showtToast(`Contact saved ${resp.data.id}`);
              setModalVisible(false);
              loadData();
              loadDatabyID();
            }
          });
        }

        break;

      case 'EDIT':
        {
          editContact(form).then(resp => {
            if (resp.code === 400) {
              showtToast(`Contact edited ${resp.data.id}`);
              setModalVisible(false);
              setForm(initialForm);
              loadData();
              loadDatabyID();
            }
          });
        }
        break;

      default:
        break;
    }
  };

  const showtToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleTextInput = (firstName, text) => {
    setForm({...form, [firstName]: text});
  };

  const handleSelectedUser = contact => {
    setForm(contact);
    setModalVisible(true);
  };

  const handleDeleteUser = id => {
    deleteContact(id).then(resp => {
      if (resp.code === 202) {
        showtToast('Contact deleted');
        loadData();
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      {/* <SearchComponent
        placeholder={'Search Contact. . .'}
        sortTitle={'FILTER'}
      /> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 30,
          flex: 1,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 0,
            width: 200,
            fontFamily: 'sans-serif',
          }}>
          SIMPLE CRUD ALIKA
        </Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item: contact}) => (
          <CardUserComponent
            data={contact}
            handleClicked={handleSelectedUser}
            handleDeleteUser={handleDeleteUser}
          />
        )}
        keyExtractor={({id}) => id}
      />
      <VectorIcon
        name="add-circle"
        size={66}
        style={{position: 'absolute', bottom: 10, right: 10}}
        color={'green'}
        onPress={() => setModalVisible(!modalVisible)}
      />
      <Modal
        visible={modalVisible}
        animationType="fade"
        presentationStyle="overFullScreen">
        <View style={styles.centeredModal}>
          <View style={styles.modalView}>
            <View style={styles.title}>
              <Text style={styles.modalTitle}>New Contact</Text>
              <Icon name="x" size={24} onPress={() => setModalVisible(false)} />
            </View>

            <TextInput
              value={form.firstName}
              placeholder="First Name"
              onChangeText={text => handleTextInput('firstName', text)}
            />
            <TextInput
              value={form.lastName}
              placeholder="Last Name"
              onChangeText={text => handleTextInput('lastName', text)}
            />
            <TextInput
              value={form.age}
              placeholder="Age"
              onChangeText={text => handleTextInput('age', text)}
            />
            <TextInput
              value={form.photo}
              placeholder="Photo"
              onChangeText={text => handleTextInput('photo', text)}
            />
            <Button
              title="Save"
              onPress={() => {
                if (!form.id) {
                  handleSave('SAVE');
                } else {
                  handleSave('EDIT');
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  centeredModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
