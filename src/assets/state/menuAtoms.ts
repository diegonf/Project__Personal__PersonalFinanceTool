import { atom } from 'recoil';
import db from 'components/MenuST/_assets/languageDB.json';

const languageDB = db.languages;
export const languagesAtom = atom<typeof languageDB> ({
  key: 'languagesAtom',
  default: languageDB
});

export const selectedLanguageAtom = atom<typeof languageDB[0]> ({
  key: 'selectedLanguageAtom',
  default: languageDB[0]
});

export const menuStatusAtom = atom<boolean> ({
  key: 'menuStatusAtom',
  default: false
});

export const isSignedInAtom = atom<boolean> ({
  key: 'isSignedInAtom',
  default: false
});

export const userMenuStatusAtom = atom<boolean> ({
  key: 'userMenuStatusAtom',
  default: false
});