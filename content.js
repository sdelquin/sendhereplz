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
