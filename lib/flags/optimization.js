const merge = require('merge-options');
const { LoaderOptionsPlugin, optimize } = require('webpack');

const { MinChunkSizePlugin, LimitChunkCountPlugin } = optimize;

module.exports = {
  apply(argv, options) {
    // eslint-disable-next-line no-param-reassign
    options = merge({ plugins: [] }, options);

    const { flags } = module.exports;
    const keys = Object.keys(flags);

    for (const arg of keys) {
      const flag = flags[arg];
      const value = argv[arg];

      if (value) {
        const plugin = flag.apply(value);
        options.plugins.unshift(plugin);
      }
    }
  },

  flags: {
    'optimize-max-chunks': {
      apply: (value) =>
        new LimitChunkCountPlugin({ maxChunks: parseInt(value, 10) }),
      desc: 'Try to keep the chunk count below a limit',
      type: 'number',
    },
    'optimize-min-chunk-size': {
      apply: (value) =>
        new MinChunkSizePlugin({ minChunkSize: parseInt(value, 10) }),
      desc: 'Try to keep the chunk size above a limit',
      type: 'number',
    },
    'optimize-minimize': {
      apply: () => new LoaderOptionsPlugin({ minimize: true }),
      desc: 'Minimize javascript and switches loaders to minimizing',
      type: 'boolean',
    },
  },

  name: 'Optimization',
};
