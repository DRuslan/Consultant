export default {
  install(Vue) {
    // Vue.config.globalProperties.$widjet = function(params) {
    //   return params
    // }
    let initWidjet = {};

    Vue.config.globalProperties.$widjet = function(params) {
      if (params) {
        initWidjet = params
      }
      return initWidjet
    }

    if (window.widjetOuter) {
      return initWidjet = window.widjetOuter;
    } else {
      return initWidjet = {};
    }
  }
};
