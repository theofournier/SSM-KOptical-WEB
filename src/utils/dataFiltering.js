import { isEmpty } from './validators';

export function sort(listToSort, sortId, sortAsc, sortType) {
  try {
    const listTemp = [...listToSort];
    switch (sortType) {
      case 'number':
        listTemp.sort((a, b) => {
          if (sortAsc) {
            return a[sortId] - b[sortId];
          }
          return b[sortId] - a[sortId];
        });
        break;
      case 'datetime':
        listTemp.sort((a, b) => {
          if (sortAsc) {
            return new Date(a[sortId]) - new Date(b[sortId]);
          }
          return new Date(b[sortId]) - new Date(a[sortId]);
        });
        break;
      case 'string':
        listTemp.sort((a, b) => {
          if (sortAsc) {
            return a[sortId]
              .toLowerCase()
              .localeCompare(b[sortId].toLowerCase());
          }
          return b[sortId].toLowerCase().localeCompare(a[sortId].toLowerCase());
        });
        break;
      case 'bool':
      default:
        listTemp.sort((a, b) => {
          if (sortAsc) {
            return a[sortId] - b[sortId];
          }
          return b[sortId] - a[sortId];
        });
        break;
    }
    return listTemp;
  } catch {
    console.log('Error on sort');
    return listToSort;
  }
}

export function checkInclude(element, searchValue, searchKeys) {
  for (const k of searchKeys) {
    if (
      !isEmpty(element[k])
      && element[k]
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) {
      return true;
    }
  }
  return false;
}

export function search(listToSearch, searchValue, searchKeys) {
  try {
    const listTemp = [...listToSearch];
    if (searchValue && searchValue !== '') {
      return listTemp.filter((element) => checkInclude(element, searchValue, searchKeys));
    }
    return listTemp;
  } catch (error) {
    console.log(`Error on search : ${error}`);
    return listToSearch;
  }
}

export function filter(listToFilter, filters) {
  try {
    let listTemp = [...listToFilter];
    const filtersId = Object.keys(filters);
    for (const filterId of filtersId) {
      if (!isEmpty(filters[filterId]) && filters[filterId] !== 'all') {
        listTemp = listTemp.filter((element) => filters[filterId].includes(
          getValueFromObject(element, filterId.split('.')),
        ));
      }
    }
    return listTemp;
  } catch (error) {
    console.log(`Error on filter : ${error}`);
    return listToFilter;
  }
}

export function getValueFromObject(obj, keyList) {
  let res = { ...obj };
  for (const key of keyList) {
    res = res ? res[key] : undefined;
  }
  return res;
}
