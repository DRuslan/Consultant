export default {
  install(Vue) {
    let initWidjet = {};

    const isEmpty = (obj) => {
      return Object.keys(obj).length === 0;
    };

    Vue.config.globalProperties.$widjet = function(params) {
      if (params && !isEmpty(params)) {
        initWidjet = params;
      }
      return initWidjet
    }

    if (window.widjetOuter && !isEmpty(window.widjetOuter)) {
      return initWidjet = window.widjetOuter;
    }

    return initWidjet; 
  }
};
