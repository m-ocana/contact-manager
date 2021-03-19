import fs, { constants } from 'fs';
import aes256 from 'aes256';

const CONTACTS_FILE = './contacts.file';
let SECRET = '';

function fileExists() {
  try {
    fs.accessSync(CONTACTS_FILE, constants.R_OK || constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function encrypt(data: Array<any>, password?: string) {
  try {
    const encrypted = aes256.encrypt(password || SECRET, JSON.stringify(data));
    fs.writeFileSync(CONTACTS_FILE, encrypted);
    return { message: 'Encrypted!' };
  } catch (e) {
    throw new Error(e.message);
  }
}

function decrypt(password: string) {
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    const decrypted = aes256.decrypt(password, data);
    // Setting modules private SECRET so the password doesn't
    // need to be passed around in subsequent ops
    SECRET = password;
    return JSON.parse(decrypted);
  } catch (e) {
    throw new Error(e.message);
  }
}

export default { fileExists, encrypt, decrypt };
