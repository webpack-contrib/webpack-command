const { bind } = require('./util');

module.exports = {
  apply(argv, options) {
    bind(argv.moduleBind, undefined, options); // eslint-disable-line no-undefined
    bind(argv.moduleBindPre, 'pre', options);
    bind(argv.moduleBindPost, 'post', options);
  },

  flags: {
    'module-bind': {
      desc: 'Bind an extension to a loader',
      type: 'string',
    },
    'module-bind-post': {
      desc: 'Bind an extension to a prostLoader',
      type: 'string',
    },
    'module-bind-pre': {
      desc: 'Bind an extension to a preLoader',
      type: 'string',
    },
  },

  name: 'Modules',
};
