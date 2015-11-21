# patch-version [![Build Status](https://travis-ci.org/lijunle/npm-patch-version.svg?branch=master)](https://travis-ci.org/lijunle/npm-patch-version)

Patch git tag version to package.json before publish to npm.

## Usage

1. Install [patch-version](https://www.npmjs.com/package/patch-version) from npm.
2. Stick your package.json to one version. My suggestion is `0.0.1`, as this package does.
3. Add patch version command to deploy hook in your `.travis.yml` file.
  ```yaml
  before_deploy:
  - ./node_modules/.bin/patch-version
  ```
4. When you want to publish a new version to npm, create a tag with a valid [semver](http://semver.org/), push it to trigger [Travis deployment](http://docs.travis-ci.com/user/deployment/npm/). The tag version will be patched to `package.json` before publish to npm.

## License

MIT License.
