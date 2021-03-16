import fs, { constants } from 'fs';

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
  const file = fs.createWriteStream(CONTACTS_FILE);

  for (let i = 0; i <= 10; i += 1) {
    file.write(
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n'
    );
  }
  file.end();
}

function readFile() {
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return data;
  } catch (err) {
    return err;
  }
}

export { fileExists, createFile, readFile };
