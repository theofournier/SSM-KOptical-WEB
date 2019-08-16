export function isEmpty(value) {
  return (
    value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0)
  );
}

export function isNumber(value) {
  return /^[-+]?[0-9]+$/.test(value.toString());
}

export function isDecimal(value) {
  if (!value.toString().includes('.')) return isNumber(value);
  return /^[-+]?[0-9]+\.[0-9]+$/.test(value.toString());
}

export function isPositiveNumber(value) {
  return /^[0-9]+$/.test(value.toString());
}

export function isEmail(value) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

export function isPhoneNumber(phoneNumber) {
  return /^\+?(?:[0-9] ?){6,14}[0-9]$/.test(phoneNumber);
}
