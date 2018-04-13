// function processResolveAlias(arg, key) {
//   ifArgPair(arg, function(name, value) {
//     if (!name) {
//       throw new Error("--" + arg + " <string>=<string>");
//     }
//     ensureObject(options, key);
//     ensureObject(options[key], "alias");
//     options[key].alias[name] = value;
//   });
// }
// processResolveAlias("resolve-alias", "resolve");
// processResolveAlias("resolve-loader-alias", "resolveLoader");
//
// ifArg("resolve-extensions", function(value) {
//   ensureObject(options, "resolve");
//   if (Array.isArray(value)) {
//     options.resolve.extensions = value;
//   } else {
//     options.resolve.extensions = value.split(/,\s*/);
//   }
// });

module.exports = {
  flags: {
    'resolve-alias': {
      desc:
        'Setup a module alias for resolving (Example: jquery-plugin=jquery.plugin)',
      type: 'string',
    },
    'resolve-extensions': {
      desc:
        'Setup extensions that should be used to resolve modules (Example: --resolve-extensions .es6,.js)',
      type: 'array',
    },
    'resolve-loader-alias': {
      desc: 'Setup a loader alias for resolving',
      type: 'string',
    },
  },

  name: 'Resolver',
};
