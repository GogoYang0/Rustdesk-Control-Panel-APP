const expoConfig = require('eslint-config-expo/flat')

module.exports = [
  ...expoConfig,
  {
    ignores: ['dist/*', 'src/api/generated/*', 'node_modules/*'],
  },
]
