const STORAGE_PREFIX = 'USE_GLOBAL_STATE_';
const storageData = {};

function initStorageData(storage) {
  const now = new Date().getTime();
  for (let i = 0; i < storage.length; i++) {
    let key = storage.key(i);
    if (key.indexOf(STORAGE_PREFIX) === 0) {
      let value = storage.getItem(key);
      try {
        value = JSON.parse(value);
        if (!value.timeout || now - value.time < value.timeout) {
          let storageKey = key.substring(STORAGE_PREFIX.length);
          storageData[storageKey] = value.state;
        } else {
          storage.removeItem(key);
        }
      } catch (e) {
        console.log("初始化缓存失败");
      }
    }
  }
}

initStorageData(window.localStorage);
initStorageData(window.sessionStorage);

const defaultOptions = {
  storage: null, //local/session
  storageTimeout: 0,
};

function getStorageState(name) {
  return storageData[name];
}

function saveState(name, state, options = {}) {
  storageData[name] = state;
  if (options.storage === 'local') {
    window.localStorage.setItem(
      STORAGE_PREFIX + name,
      JSON.stringify({
        state,
        timeout: options.storageTimeout,
        time: new Date().getTime(),
      }),
    );
  } else if (options.storage === 'session') {
    window.sessionStorage.setItem(
      STORAGE_PREFIX + name,
      JSON.stringify({
        state,
        timeout: options.storageTimeout,
        time: new Date().getTime(),
      }),
    );
  }
}

export default (defaultState, key, options) => {
  if (typeof key === 'undefined' && typeof options === 'undefined') {
    key = defaultState;
    defaultState = undefined;
  } else if (typeof key === 'object' && typeof options === 'undefined') {
    options = key;
    key = defaultState;
    defaultState = undefined;
  }
  options = {
    ...defaultOptions,
    ...options,
  };

  const getState = () => {
    return getStorageState(key);
  }

  const setState = (newState) => {
    saveState(key, newState, options);
  };

  return [getState, setState];
};
