function getPathFromRegex(regexp) {
  return regexp
    .toString()
    .replace("/^", "")
    .replace("?(?=\\/|$)/i", "")
    .replace(/\\\//g, "/")
    .replace("?$/i", "");
}

function recursiveRouter(router, prefix = "") {
  let nested_router = router.handle.stack;
  if (nested_router != undefined) {
    let routerPath = undefined;
    if (nested_router != []) {
      return nested_router.map((element) => {
        let new_prefix = prefix;

        if (element.route != undefined) {
          let route_link = prefix + element.route.path;
          route_link = route_link.replace("//", "/");
          return {
            url: route_link,
            method: element.route.stack[0].method,
          };
        } else if (element.regexp != undefined) {
          routerPath = getPathFromRegex(element.regexp);
        }
        if (routerPath != undefined || routerPath != "/") {
          new_prefix += routerPath;
          new_prefix = new_prefix.replace("//", "/");
        }
        return recursiveRouter(element, new_prefix).flat();
      });
    }
  }
}

module.exports = function (app) {
  let router = recursiveRouter(app._router.stack[10]).flat();
  return router;
};
