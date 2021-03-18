import fs, { constants } from 'fs';
import aes256 from 'aes256';
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

function encrypt(data, password) {
  try {
    const encrypted = aes256.encrypt(password, JSON.stringify(data));
    fs.writeFileSync(CONTACTS_FILE, encrypted);
    return { message: 'Encrypted!' };
  } catch (exception) {
    throw new Error(exception.message);
  }
}

function decrypt(password) {
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    const decrypted = aes256.decrypt(password, data);
    return JSON.parse(decrypted);
  } catch (exception) {
    console.log(exception);
    throw new Error(exception.message);
  }
}

export { fileExists, encrypt, decrypt };
