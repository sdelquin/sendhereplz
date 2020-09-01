const parser = new DOMParser()

init()

function init() {
  checkProducts(getVisibleProductItems())
  observeNewProducts()
}

function getVisibleProductItems() {
  return Array
    .from(document.querySelectorAll('.s-result-item h2 a'))
    .map(productLink => {
      const productContainer = productLink.closest('.s-result-item, .s-inner-result-item')
      return ProductItem(productContainer)
    })
    .filter(productItem => productItem.isVisible())
}

function checkProducts(productItems) {
  console.log('SendHerePlz is making its magic...')

  productItems.forEach(productItem => {
    productItem.showLoader()

    fetch(productItem.getProductUrl())
      .then(response => response.text())
      .then(html => parser.parseFromString(html, 'text/html'))
      .then(page => {
        const product = Product(page)

        if (!product.isDeliverable()) {
          productItem.markAsNotDeliverable()
        }

        if (product.isAvailableFromOtherSellers()) {
          productItem.addSellersMessage(product.getSellersMessage())
        }
      })
      .finally(productItem.hideLoader)
  })
}

function ProductItem(container) {
  const productTitle = container.querySelector('h2')
  const productTitleContainer = productTitle.closest('.a-section')
  const productLink = container.querySelector('h2 a')

  const loader = document.createElement('span')
  loader.classList.add('shp-loader')
  loader.innerText = 'Loading...'

  return {
    getProductUrl: () => new URL(productLink.getAttribute('href'), window.location),

    isVisible: () => !container.closest('.aok-hidden, .a-hidden'),

    showLoader: () => {
      productTitle.prepend(loader)
    },
    hideLoader: () => {
      loader.remove()
    },

    markAsNotDeliverable: () => {
      container.classList.add('shp-not-deliverable-product')

      const notDeliverableIndicator = document.createElement('span')
      notDeliverableIndicator.classList.add('shp-not-deliverable-product-icon')
      notDeliverableIndicator.innerHTML = '<svg fill-rule="evenodd" height="100%" stroke-linejoin="round" viewBox="0 0 865 794" width="100%"><path d="m668.2 253.5c8.9 2.7 17.1 7.6 23.8 14.3l118.1 118.1c10.6 10.6 16.7 25.1 16.7 40.1v127.8h18.9c10.4 0 18.9 8.5 18.9 18.9v37.8c0 10.4-8.5 18.9-18.9 18.9h-56.8c0 62.7-50.8 113.5-113.5 113.5s-113.5-50.8-113.5-113.5h-151.4c0 62.7-50.8 113.5-113.5 113.5-32.6 0-61.9-13.7-82.6-35.7l40.2-40.2c10.4 11.8 25.5 19.2 42.4 19.2 31.3 0 56.8-25.4 56.8-56.8 0-16.9-7.4-32.1-19.2-42.4l265.1-265.1v118.4h170.3v-14.3l-118.1-118.1h-38.1l54.3-54.3zm7.3 432.7c-31.3 0-56.8-25.4-56.8-56.8 0-31.3 25.4-56.8 56.8-56.8 31.3 0 56.8 25.4 56.8 56.8 0 31.3-25.4 56.8-56.8 56.8zm-148.1-548.7-419.5 419.5v-362.7c0-31.3 25.4-56.8 56.8-56.8h362.8zm249.7-59.1c9-9 9-23.5 0-32.5-9.2-9.2-20.5-20.5-29.7-29.7-9-9-23.5-9-32.5 0-97.2 97.2-601.5 601.5-698.7 698.7-9 9-9 23.5 0 32.5l29.7 29.7c9 9 23.5 9 32.5 0 97.2-97.2 601.5-601.5 698.7-698.7z"/></svg>'
      productTitle.prepend(notDeliverableIndicator)
    },

    addSellersMessage: (content) => {
      const sellersMessage = document.createElement('div')
      sellersMessage.classList.add('shp-sellers-message')
      sellersMessage.innerHTML = content
      productTitleContainer.after(sellersMessage)
    }
  }
}

function Product(container) {
  const availableFromOtherSellers = container.querySelector('#availability .a-declarative[data-action="show-all-offers-display"]')

  return {
    isDeliverable: () => {
      return !container.querySelector(`
        #deliveryMessageMirId .a-color-error,
        #qualifiedBuybox #ddmDeliveryMessage .a-color-error,
        .a-accordion-active #ddmDeliveryMessage .a-color-error
      `)
    },

    isAvailableFromOtherSellers: () => Boolean(availableFromOtherSellers),
    getSellersMessage: () => availableFromOtherSellers.innerHTML
  }
}

function observeNewProducts() {
  const resultsLoader = document.querySelector('.s-result-list-placeholder')
  if (resultsLoader) {
    const observer = new MutationObserver(() => {
      checkProducts(getVisibleProductItems())
    })
    observer.observe(resultsLoader, { attributes: true })
  }
}
