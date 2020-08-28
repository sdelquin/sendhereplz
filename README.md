# SendHerePlz - Amazon shipping availability

[![Logo SendHerePlz](img/sendhereplz-logo-128.png)](img/sendhereplz-logo.png)

**Quick identification of Amazon products with shipping restrictions**

Have you ever spend hours looking for items on Amazon sites but none of them were available for shipping to your location? With this **browser extension** you will be able to detect these items quickly from the results page, so you can easily identify which products are eligible for you.

## Features

- Identify the non-eligible items (within the results page) because of shipping restrictions.
- Add a badge for each item (within the results page) which is only available through other sellers.
- It works with any Amazon site regardless of the language you use or the country you live in.

## Installation

[![Chrome Web-Store](img/chrome-webstore-200.png)](https://chrome.google.com/webstore/detail/sendhereplz/anpeeogkdbgkhakjldceemkolhggobhd)
&nbsp;&nbsp;
![Mozilla Add-Ons](img/mozilla-addons-200.png)

### Developer mode

#### Google Chrome

- [Download](https://github.com/sdelquin/sendhereplz/archive/master.zip) the project.
- Uncompress the `.zip` file (a folder named `sendhereplz-master` is created).
- Place the folder where you want to keep it (write down this location).
- Open [Chrome](https://www.google.com/intl/es_es/chrome/) browser.
- Go to `chrome://extensions/` on navigation bar.
- Check the box for **Developer Mode** in the top right.
- Click on **Load unpacked**.
- Select the folder from the location where the extension was saved.

#### Mozilla Firefox

- [Download](https://github.com/sdelquin/sendhereplz/archive/master.zip) the project.
- Uncompress the `.zip` file (a folder named `sendhereplz-master` is created).
- Place the folder where you want to keep it (write down this location).
- Open [Firefox](https://www.mozilla.org/firefox/new/) browser.
- Go to `about:debugging` on navigation bar.
- Click on **This Firefox** on the left panel.
- Click on **Load Temporary Add-on...** on the right hand side.
- Select [manifest.json](manifest.json) from the location where the extension was saved.

## Usage

You can check the behaviour of the extension with this video:

![Screen Recording](img/sendhereplz-screenrec.gif)

Note that:

- First item has a new badge below to indicate that it is only available from other sellers.
- Second item is shaded and it has a new icon since Amazon does not ship it to your location.
- Third item is kept as usual because it is fully eligible (in terms of shipping).

## Feedback

If you want to give us any feedback you are very welcome [to add a new issue](https://github.com/sdelquin/sendhereplz/issues).

## Former

This project is a fork from the original _SendHerePlz_ project developed by Micael Martín ([@micaelcometa](https://github.com/micaelcometa)) at [Desarrollo Cometa](https://desarrollocometa.com):

![Desarrollo Cometa](img/cometa-logo.png)
