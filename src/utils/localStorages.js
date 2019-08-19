const localStorageBase = 'SSM_KOPTICAL_WEB';

export const keyCurrentUser = 'CURRENT_USER';
export const keyRememberMe = 'REMEMBER_ME';

export function setLocalStorage(key, value) {
  localStorage.setItem(`${localStorageBase}.${key}`, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const item = localStorage.getItem(`${localStorageBase}.${key}`);
  return item ? JSON.parse(item) : false;
}

export function removeLocalStorage(key) {
  localStorage.removeItem(`${localStorageBase}.${key}`);
}
