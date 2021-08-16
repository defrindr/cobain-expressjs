// register glob untuk mengambil seluruh file controller
const glob = require("glob");
const Controller = require("./controller.core");

// base path untuk seluruh file controller
const BasePath = "app/controllers/";
const ControllerSuffix = ".controller.js";

/**
 * Mengembalikan seluruh file controller yang berada didalam BasePath
 * @returns {Array}
 */
function getAllControllerFiles() {
  return glob.sync(BasePath + "**/*" + ControllerSuffix);
}

/**
 * Mengambil seluruh fungsi/method yang memiliki prefix action
 * @param {Object} obj
 * @returns {Array}
 */
const getMethods = (obj) => {
  let properties = new Set();
  let current_obj = obj;
  do {
    Object.getOwnPropertyNames(current_obj).map((item) => properties.add(item));
  } while ((current_obj = Object.getPrototypeOf(current_obj)));
  return [...properties.keys()].filter(
    (item) => typeof obj[item] === "function" && item.startsWith("action")
  );
};

/**
 * Inisialisasi Default Behaviors
 * @param {Controller} controller
 * @returns {Object}
 */
function initializeBehaviors(controller) {
  let custom_behaviors = controller.behaviors();
  let default_behaviors = {
    methods: {
      ...{
        get: [],
        head: [],
        post: [],
        put: [],
        patch: [],
        delete: [],
        options: [],
      },
      ...custom_behaviors.methods,
    },
    middlewares: custom_behaviors.middlewares
      ? custom_behaviors.middlewares
      : [],
    links: custom_behaviors.links ? custom_behaviors.links : {},
  };

  return default_behaviors;
}

/**
 * Mengubah Camel Case menjadi Kebab Case
 * @param {String} str
 * @returns
 */
function pascal2Kebab(str) {
  return str
    .replace("action", "")
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}

/**
 * Mendapatkan method http request dari setiap fungsi di controller
 * dengan default method adalah GET
 * @param {object} behaviors
 * @param {string} action_name
 * @returns
 */
function getHttpMethod(behaviors, action_name) {
  // find-method-to-be-used
  let http_method = "get";
  if (behaviors.methods.head.includes(action_name)) {
    http_method = "post";
  } else if (behaviors.methods.post.includes(action_name)) {
    http_method = "post";
  } else if (behaviors.methods.put.includes(action_name)) {
    http_method = "put";
  } else if (behaviors.methods.patch.includes(action_name)) {
    http_method = "patch";
  } else if (behaviors.methods.delete.includes(action_name)) {
    http_method = "delete";
  } else if (behaviors.methods.options.includes(action_name)) {
    http_method = "delete";
  }

  return http_method;
}

/**
 * Mendapatkan Seluruh Middleware dari sebuah action
 * @param {Object} behaviors
 * @param {String} action_name
 * @returns
 */
function getActionMiddleware(behaviors, action_name) {
  let list_middleware = [];
  behaviors.middlewares.map((middleware) => {
    if (middleware.except !== undefined) {
      if (middleware.except.includes(action_name) == false) {
        list_middleware = list_middleware.concat(middleware.class);
      }
    } else if (middleware.only !== undefined) {
      if (middleware.only.includes(action_name) == true) {
        list_middleware = list_middleware.concat(middleware.class);
      }
    } else {
      list_middleware = list_middleware.concat(middleware.class);
    }
  });

  return list_middleware;
}

/**
 * Get custom link
 * @param {*} behaviors
 * @param {*} action_name
 * @returns
 */
function getLinks(behaviors, action_name) {
  return behaviors.links[action_name] != undefined
    ? behaviors.links[action_name]
    : action_name;
}

const RegisterRoute = (router) => {
  // mendapatkan seluruh file di BasePath
  let files = getAllControllerFiles();

  files.map((file) => {
    let controller_file = require(`./../${file}`);
    let controller_class = new controller_file();
    let list_method = getMethods(controller_class);
    let url_prefix = file.replace(BasePath, "").replace(ControllerSuffix, "");
    let behaviors = initializeBehaviors(controller_class);

    list_method.map((action_method) => {
      let action_name = pascal2Kebab(action_method);

      // mendapatkan-http-method
      let http_method = getHttpMethod(behaviors, action_name);
      // mendapatkan middleware
      let list_middleware = getActionMiddleware(behaviors, action_name);

      let links = getLinks(behaviors, action_name);

      // register-route
      if (list_middleware.length != 0) {
        router[http_method](
          `/${url_prefix}/${links}`,
          list_middleware,
          (req, res, next) => controller_class[action_method](req, res, next)
        );
      } else {
        router[http_method](`/${url_prefix}/${links}`, (req, res, next) =>
          controller_class[action_method](req, res, next)
        );
      }
    });
  });

  return router;
};

module.exports = RegisterRoute;
