(function () {
  const parser = new DOMParser()

  ready(function () {
    checkProducts()
    observeNewProducts()
  })

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn()
    } else {
      document.addEventListener('DOMContentLoaded', fn)
    }
  }

  function checkProducts() {
    console.log('SendHerePlz is making its magic...')

    getProductLinks().forEach(productLink => {
      const productTitle = productLink.closest('h2')

      const loader = createLoader()
      productTitle.prepend(loader)

      fetch(productLink.getAttribute('href'))
        .then(response => response.text())
        .then(data => {
          const productPage = parser.parseFromString(data, 'text/html')

          if (!isProductDeliverable(productPage)) {
            const productItem = productTitle.closest('.s-result-item, .s-inner-result-item')
            productItem.classList.add('shp-not-deliverable-product')

            productTitle.prepend(createNotDeliverableIndicator())
          }

          const availableFromOtherSellers = getAvailableFromOtherSellers(productPage)
          if (availableFromOtherSellers) {
            const productTitleContainer = productTitle.closest('.a-section')
            const sellersMessage = createSellersMessage(availableFromOtherSellers.innerHTML)
            productTitleContainer.after(sellersMessage)
          }
        })
        .finally(() => loader.remove())
    })
  }

  function getProductLinks() {
    return document.querySelectorAll('.s-result-item h2 a')
  }

  function createLoader() {
    const loader = document.createElement('span')

    loader.classList.add('shp-loader')
    loader.innerText = 'Loading...'

    return loader
  }

  function isProductDeliverable(page) {
    return !page.querySelector(`
      #ddmDeliveryMessage .a-color-error,
      #deliveryMessageMirId .a-color-error
    `)
  }

  function createNotDeliverableIndicator() {
    const notDeliverableIndicator = document.createElement('span')
    notDeliverableIndicator.classList.add('shp-not-deliverable-product-icon')
    notDeliverableIndicator.innerHTML = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" viewBox="0 0 865 794" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M668.153,253.542c8.908,2.682 17.108,7.554 23.809,14.254l118.127,118.128c10.642,10.642 16.673,25.068 16.673,40.085l0,127.824l18.919,0c10.406,0 18.92,8.514 18.92,18.92l0,37.838c0,10.406 -8.514,18.92 -18.92,18.92l-56.758,0c0,62.67 -50.846,113.516 -113.516,113.516c-62.67,0 -113.516,-50.846 -113.516,-113.516l-151.355,0c0,62.67 -50.846,113.516 -113.516,113.516c-32.564,0 -61.935,-13.728 -82.62,-35.732l40.188,-40.188c10.353,11.768 25.533,19.162 42.432,19.162c31.335,0 56.758,-25.423 56.758,-56.758c0,-16.899 -7.394,-32.079 -19.161,-42.432l265.113,-265.113l0,118.351l170.274,0l0,-14.308l-118.128,-118.127l-38.062,0l54.339,-54.34Zm7.254,432.727c-31.335,0 -56.758,-25.423 -56.758,-56.758c0,-31.336 25.423,-56.758 56.758,-56.758c31.335,0 56.758,25.422 56.758,56.758c0,31.335 -25.423,56.758 -56.758,56.758Zm-148.073,-548.662l-419.508,419.508l0,-362.75c0,-31.335 25.423,-56.758 56.758,-56.758l362.75,0Z"/><path d="M777.084,78.402c8.966,-8.965 8.966,-23.502 0,-32.467c-9.152,-9.152 -20.549,-20.549 -29.701,-29.701c-8.965,-8.966 -23.501,-8.966 -32.467,0c-97.226,97.225 -601.457,601.456 -698.682,698.682c-8.966,8.966 -8.966,23.502 0,32.467c9.152,9.152 20.549,20.549 29.701,29.701c8.965,8.966 23.502,8.966 32.467,0c97.226,-97.225 601.457,-601.456 698.682,-698.682Z"/></svg>'

    return notDeliverableIndicator
  }

  function getAvailableFromOtherSellers(page) {
    return page.querySelector('#availability .a-declarative[data-action="show-all-offers-display"]')
  }

  function createSellersMessage(content) {
    const element = document.createElement('div')
    element.classList.add('shp-sellers-message')
    element.innerHTML = content

    return element
  }

  function observeNewProducts() {
    const resultsLoader = document.getElementsByClassName('s-result-list-placeholder')[0]
    if (resultsLoader) {
      const observer = new MutationObserver((_) => {
        checkProducts()
      })
      observer.observe(resultsLoader, { attributes: true })
    }
  }
})()
