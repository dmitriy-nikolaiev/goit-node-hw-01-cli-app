const path = require('path');
const fs = require('fs').promises;
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    if (!contacts || contacts.length === 0) {
      console.log('No contacts found');
      return [];
    }

    return contacts;
    // console.table(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    if (!contacts) return;
    const findContact = contacts.find(
      (contact) => String(contact.id) === String(contactId)
    );

    if (!findContact) {
      console.log(`Contact with id=${contactId} not found`);
      return;
    }

    return findContact;
    // console.table(contact);
  } catch (error) {
    console.log(error.message);
  }
}

// (async () => {
//   const cont = await getContactById(8);
//   console.table(cont);
// })();

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    if (!contacts) return;

    const contact = await getContactById(String(contactId));
    if (!contact) return;

    const newContacts = contacts.filter(
      (contact) => String(contact.id) !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return contact;
    // console.table(newContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = { id: v4(), name, email, phone };

  try {
    const contacts = await listContacts();
    if (!contacts) return;

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
