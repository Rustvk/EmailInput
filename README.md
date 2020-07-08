<h1 align="center">Emails Input Library</h1>
<p align="center">
  Simple input field for entering email addresses with control buttons.
  <br>
  <a href="https://rustvk.github.io/EmailInput"><strong>Demo Page</strong></a>
  ·
  <a href="https://www.npmjs.com/package/@rustvk/emailsinput"><strong>NPM Package</strong></a>
</p>

## Content

- [Сompatibility](#compatibility)
- [Install](#install)
- [Usage](#usage)
- [API](#documentation)

## Compatibility

Library is compatible with Ecmascript 5th version.

` IE11 | Chrome | Firefox | Safari | Edge `

## Install

Several quick start options are available:

### Install with npm:

If you use NPM packages in your project the next way is right for you:

- Run command 
```
  npm i @rustvk/emailsinput
```
- Add to your JS component: 
```JS
  import '@rustvk/emailsinput/emails-input.min.js';
  import '@rustvk/emailsinput/emails-input.css';
```

### Via sources:

- Clone project or [download](https://github.com/Rustvk/EmailInput/archive/master.zip) sources to your computer

    Within the download you'll find the following directories and files:
```text
EmailInput-master/
└── dist/
    ├── emails-input.min.js
    └── emails-input.css
├── src/
    └── EmailsInput
        ├── index.js
        └── style.css
├── index.html
├── style.css
├── webpack.config.js
└── package.json
```

- Load **dist / index.js** и **dist / style.css** into your project
- Include to your *.html file:

```HTML
  ...
  <head>
    <link href="{path}/emails-input.css" rel="stylesheet" />
  </head>
  <body>
    ...
    <script src="{path}/emails-input.min.js"></script>
  </body> 
  ...
```

## Usage

- Create container for component with your ID

```html
<body>
    ...
    <div id="emails-input"></div>
    ...
</body>>
```

- Add `<script>` tag after before `<body>` closed

```html
    <body>
        ...
        <script>
            var emailsInput = EmailsInput({
                container: document.querySelector('#emails-input')
            });
        </script>
    </body>
```

- Add your width and height rules. 
  By default width is 540px and height is 300px
  Default sizes will be ignored if #emails-input has a max-width and height style properties
```css
  #emails-input {
    max-width: 600px;
    height: 400px;
  }
```

## Documentation

Added script is create EmailsInput component function in your global object `Window`

EmailsInput get an object with options as an argument

list of options:
```JS
   @params {object} options
   @params {HTMLContainer} container - HTMLElement that will conaint EmailsInput component
   @params {string} [title] - Optional title for EmailsInput block
    
```

EmailsInput function return an object with methods:
```JS
/**
 * Adding email to field
 * @params {string} email
**/
addEmail: function() {...}

/**
 * Get emails count
 * @returns {string} String with valid and common emails count
**/
getCount: function() {...}
```
