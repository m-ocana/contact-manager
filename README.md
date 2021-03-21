# Secure Contact Manager

Basic but secure Electron app to store your contacts. The contact files are password protected and AES-256 encrypted.

![Overview Video](./assets/SCM.gif 'Overview Video')

This application uses [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).

## Application Overview

Secure Contact Manager allows you to:

- access to application data controlled by password
- decrypt and load contact file from disk, or create new file if none existing
- add new contacts
- edit existing contacts
- write encrypted modified contacts datafile to disk

### To do

Upcoming features/activities:

- search contacts by field
- add unit and e2e tests

## Install

First, clone the repo via git and install dependencies:

```bash
git clone git@github.com:m-ocana/contact-manager.git
cd contact-manager
yarn
```

## Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```
