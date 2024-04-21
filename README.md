# Web Component Boilerplate v3

A simple boilerplat for native web component projects.

## Folder Structure

```
+ ROOT\
  +- components\
  |  +- COMPONENT\
  |  |  +- assets
  |  |  +- index.js
  |  +- index.js
  +- tests\
  |  +- COMPONENT\
  |     +- index.html
  |     +- script.js
  |     +- style.js
  +- README.md
```

### Root

The `root\` folder holds editor configurations and the README.md file.

### Components

The `components\` folder holds your web components. Each web component should be in its own sub folders. Web component scripts should be in a `index.js` JavaScript file. An `index.js` directly under the `components\` folders should import all the web components in the sub folders.

### Tests

The `tests\` folder holds the tests for your web components. Tests for specific web component should be in its own sub folder.

## Tips

### Live Server

When used with Visual Studio Code, [the Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) creates a web server serving the project root.

### JavaScript Module URL

Use the following code to determine URLs relative to your JavaScript module.

``` JavaScript
import.meta.resolve(RELATIVE_PATH)
```

This is useful when generating URL to assets for HTML templates.

### Web Component Friendly Bootstrap 5

I have forked the Bootstrap 5 repo, modifying the CSS by replacing `:root` and `body` selector to `:host`.

``` HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/JamesRobertHugginsNgo/bootstrap@main/dist/css/bootstrap.min.css">
```

### GitHub Page

When using github, you can configure a github page to host your code. Optionally you can use [jsdelivr.net](https://www.jsdelivr.com). Use the `README.md` to link to provide documentations and links to the files.

## GITHub Page

- [Project Page](https://jamesroberthugginsngo.github.io/web-component-boilerplate/)
- [JavaScript Module](https://jamesroberthugginsngo.github.io/web-component-boilerplate/components/index.js)

### Simple Component

- [JavaScript Module](https://jamesroberthugginsngo.github.io/web-component-boilerplate/components/simple-component/index.js)
- [Test Page](https://jamesroberthugginsngo.github.io/web-component-boilerplate/tests/simple-component/index.html)

### Mutating Component

- [JavaScript Module](https://jamesroberthugginsngo.github.io/web-component-boilerplate/components/mutating-component/index.js)
- [Test Page](https://jamesroberthugginsngo.github.io/web-component-boilerplate/tests/mutating-component/index.html)

### Form Field Component

- [JavaScript Module](https://jamesroberthugginsngo.github.io/web-component-boilerplate/components/form-field-component/index.js)
- [Test Page](https://jamesroberthugginsngo.github.io/web-component-boilerplate/tests/form-field-component/index.html)
