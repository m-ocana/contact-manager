import fs, { constants } from 'fs';
import faker from 'faker';

const CONTACTS_FILE = './contacts.file';

function fileExists() {
  try {
    fs.accessSync(CONTACTS_FILE, constants.R_OK || constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function createFile() {
  const contacts = Array.from({ length: 5 }, () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    postCode: faker.address.zipCode(),
  }));
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts));
    return true;
  } catch (e) {
    return e;
  }
}

function readFile() {
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return data;
  } catch (e) {
    return e;
  }
}

export { fileExists, createFile, readFile };
