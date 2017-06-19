module.exports = {
  'apps': [{
    'name': 'express-graphql-mongoose',
    'script': 'npm',
    'args': 'start',
    'watch': true,
    'ignore_watch': ['ignore', 'dist'],
    'merge_logs': true,
    'autorestart': false,
    'restart_delay': 5000,
    'env': {
      'DEBUG': 'code-experiment*',
      'DEBUG_FD': 1, // for debug
      'NODE_ENV': 'development'
    }
  }
  ]
}
