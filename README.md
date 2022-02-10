# SendHerePlz - Amazon shipping availability

<a href="img/sendhereplz-logo.svg">
<img width="128" src="img/sendhereplz-logo.svg" alt="Logo SendHerePlz">
</a>

**Quick identification of Amazon products with shipping restrictions**

Have you ever spend hours looking for items on Amazon sites but none of them were available for shipping to your location? With this **browser extension** you will be able to detect these items quickly from the results page, so you can easily identify which products are eligible for you.

## Features

- Identify the non-eligible items (within the results page) because of shipping restrictions.
- Add a badge for each item (within the results page) which is only available through other sellers.
- It works with any Amazon site regardless of the language you use or the country you live in.

## Installation

<a href="https://chrome.google.com/webstore/detail/sendhereplz/anpeeogkdbgkhakjldceemkolhggobhd">
<img height="45" src="img/chrome-webstore.svg" alt="Google Chrome Web-Store">
</a>
&nbsp;&nbsp;
<a href="https://addons.mozilla.org/firefox/addon/sendhereplz/">
<img height="45" src="img/mozilla-addons.svg" alt="Mozilla Firefox Add-Ons">
</a>
&nbsp;&nbsp;
<a href="https://microsoftedge.microsoft.com/addons/detail/sendhereplz-amazon-ship/bdfbmfojnplfbblihocncebdocmibofi">
<img height="45" src="img/edge-addons.svg" alt="Microsoft Edge Add-Ons">
</a>

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

## Hide unshippable items

We think that hiding unshippable items would be too intrusive for the final user. There is a way you can achieve this though:

- Install uBlock Origin extension (available for multiple browsers).
- Add the following code to "My filters" panel:
  ```
  amazon.com##div[class*="shp-not-deliverable-product"]
  ```
  Just replace `.com` with the extension of Amazon you're using.

> 💡 &nbsp;Thank you MickyFoley2 for [this trick](https://github.com/sdelquin/sendhereplz/issues/37#issuecomment-1034233190).

## Feedback

If you want to give us any feedback you are very welcome [to add a new issue](https://github.com/sdelquin/sendhereplz/issues).

## Former

This project is a fork from the original _SendHerePlz_ project developed by Micael Martín ([@micaelcometa](https://github.com/micaelcometa)) at [Desarrollo Cometa](https://desarrollocometa.com):

![Desarrollo Cometa](img/cometa-logo.svg)
