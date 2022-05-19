import {REQUEST_HEADER} from '../../constants';

const getAllContact = async () => {
  const resp = await fetch('https://simple-contact-crud.herokuapp.com/contact');
  return await resp.json();
};

const saveContact = async payload => {
  const resp = await fetch(
    'https://simple-contact-crud.herokuapp.com/postContact',
    {
      method: 'POST',
      headers: REQUEST_HEADER,
      body: JSON.stringify(payload),
    },
  );
  return await resp.json();
};

const editContact = async payload => {
  const resp = await fetch(
    'https://simple-contact-crud.herokuapp.com/putContactId',
    {
      method: 'PUT',
      headers: REQUEST_HEADER,
      body: JSON.stringify(payload),
    },
  );
  return await resp.json();
};

const deleteContact = async id => {
  const resp = await fetch(
    'https://simple-contact-crud.herokuapp.com/contact/deleteContactId',
    {
      method: 'DELETE',
      headers: REQUEST_HEADER,
    },
  );
  return await resp.json();
};

const getContactByID = async id => {
  const resp = await fetch(
    'https://simple-contact-crud.herokuapp.com/contact/getContactId',
    {
      method: 'GET',
      headers: REQUEST_HEADER,
    },
  );
  return await resp.json();
};

export {getAllContact, saveContact, editContact, deleteContact, getContactByID};
