# Web Component Boilerplate

A sample project for building and sharing Web Components.

This project requires modern browsers, using modern JavaScript (es6), JavaScript module (esm), modern CSS and modern HTML.

This project uses absolute URLs to avoid dependency issues. This uses [GulpJS](https://gulpjs.com) (v4) to generate the final code by replacing ```{{DEST}}``` and ```{{INFIX}}``` placholder string with the correct absolute URL prefix and a possible ".min" infix. The infix is only used for minified files.

For the absolute URL, this project uses [JSDelivr](https://www.jsdelivr.com) CDN. This CDN automatically have access to all branches and tags of public GIT repos without additional setup. After making a `git commit` and `git push`, clear the CDN cache on the [CDN's purge cache page](https://www.jsdelivr.com/tools/purge).

## Source Folder (./src)

The source folder holds a sample web component to get started with.

The JavaScript file (index.js) contains the web component definition, a template HTML file that is cloned whenever a new web component is created, ad a style CSS file to provide styles for the component.

Placeholder strings (```{{DEST}}``` and ```{{INFIX}}```) must be used for the build process to generate the correct absolute URL.

## Distribution Folder (./dist)

The distribution folder contains the "built" web component. This contains the script that is ready to use for web development.

The build process also includes minified versions and sourcemaps.

A list of CDN files (CDN-FILES.md) is also generated to make it easier to find the URL for each file.

## Test Folder (./test)

The test folder is used for testing the web component. This is usually done by embedding the new web component inside an HTML and linking to the web component module.

I use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) Visual Studio Code extension to host the test page locally.

To build the web component for local testing, use the follow:

```
gulp
```

## GulpJS (v4) Build Process

[GulpJS](https://gulpjs.com) (v4) and gulp plugins are one of the dev dependencies for this project. This replaces the ```{{DEST}}``` and ```{{INFIX}}``` placeholder strings, generate minified versions and create the CDN-FILES.md.

This requires dependencies to be installed before usage. To install the dependencies, use the following command:

```
npm install
```

When copying the boilerplate, update the CDN_URL_PREFIX constant in the gulpfile.js file to point to the correct repository.

To build for testing, use the following:

```
gulp
```

To use the absolute URL, use one of the following:

```
gulp --tag BRANCH_NAME
```

```
gulp --tag TAG_NAME
```

Using the `--tag` flag generates absolute URLs to the CDN. You need to do `git commit` and `git push` soon after so the files are available on the CDN. Using `gulp --tag BRANCH_NAME` should be done on the correct branch name. Using `gulp --tag TAG_NAME` will require that tag to be created on the repo. These will be incorporated on the final absolute CDN URLs.
