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
  import '@rustvk/emailsinput/index.js';
  import '@rustvk/emailsinput/style.css';
```

### Via sources:

- Clone project or [download](https://github.com/Rustvk/EmailInput/archive/master.zip) sources to your computer

    Within the download you'll find the following directories and files:
```text
EmailInput-master/
└── dist/
    ├── index.js
    └── style.css
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
    <link href="{path}/style.css" rel="stylesheet" />
  </head>
  <body>
    ...
    <script src="{path}/index.js"></script>
  </body> 
  ...
```

##Usage

- Create container for component with your ID

```html
<body>
    ...
    <div id="emails-input" class="block"></div>
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
##Documentation
