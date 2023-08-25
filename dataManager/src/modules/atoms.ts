import { atom } from 'recoil';

const userCredentials = atom({
  key: 'userCredentials',
  default: {},
});

const userLoggedIn = atom({
  key: 'userLoggedIn',
  default: false,
});

export { userCredentials, userLoggedIn };
