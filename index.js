const argv = require('yargs').argv;

const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contacts.listContacts());

      break;

    case 'get':
      // ... id
      console.table(await contacts.getContactById(id));

      break;

    case 'add':
      // ... name email phone
      console.table(await contacts.addContact(name, email, phone));

      break;

    case 'remove':
      // ... id
      console.table(await contacts.removeContact(id));

      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавляем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3
