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
      // TODO: add description
      desc: '',
      type: 'string',
    },
    'module-bind-pre': {
      // TODO: add description
      desc: '',
      type: 'string',
    },
  },

  name: 'Modules',
};
