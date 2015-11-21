var variables = [
  'TRAVIS_TAG', // Travis
  'CI_BUILD_TAG', // GitLab
  'APPVEYOR_REPO_TAG_NAME', // AppVeyor
];

module.exports = function getServiceTag() {
  return variables.map(function env(variable) {
    return process.env[variable];
  }).filter(function defined(variable) {
    return variable;
  })[0] || 'INVALID';
};
