const localStorageBase = 'SSM_KOPTICAL_WEB';

export const keyCurrentUser = 'CURRENT_USER';

export function setLocalStorage(key, value) {
  localStorage.setItem(`${localStorageBase}.${key}`, value);
}

export function getLocalStorage(key) {
  return localStorage.getItem(`${localStorageBase}.${key}`);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(`${localStorageBase}.${key}`);
}
