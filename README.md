# patch-version [![Build Status](https://travis-ci.org/lijunle/npm-patch-version.svg?branch=master)](https://travis-ci.org/lijunle/npm-patch-version)

Patch git tag version to package.json before publish to npm.

## Usage

1. Install [patch-version](https://www.npmjs.com/package/patch-version) from npm.
2. Stick your package.json to one version. My suggestion is `0.0.1`, as this package does.
3. Add `patch-version` command to deployment hook in your CI configuration file.
4. When you want to publish a new version to npm, create a tag with a valid [semver](http://semver.org/), push it to trigger CI build and deployment. The tag version will be patched to `package.json` before publish to npm.

## Supported CI

- Travis
- GitLab
- AppVeyor

## Example

Here is the example configuration for Travis CI. A full example could be the [.travis.yml](https://github.com/lijunle/npm-patch-version/blob/master/.travis.yml) file of this project.

```yaml
before_deploy:
  - ./node_modules/.bin/patch-version

deploy:
  provider: npm
  email: "my@email"
  api_key:
    secure: "secure-key"
  on:
    tags: true
```

## License

MIT License.
