const debounce = (func) => {
  let setTimeOutForSearch;

  return (...args) => {
    if (setTimeOutForSearch) {
      clearTimeout(setTimeOutForSearch);
    }

    setTimeOutForSearch = setTimeout(() => {
      func.apply(null, args);
    }, 1000);
  };
};
