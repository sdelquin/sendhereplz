(function () {
  const targetProducts = ['h2 a.a-link-normal.a-text-normal']
  const notDeliverMessages = [
    'no puede ser enviado',
    'no hay vendedores que realicen envíos a',
    'no realiza envíos a',
    'Disponible a través de',
    'no puede enviarse',
    'cannot be shipped',
    'non può essere spedito',
  ]
  const notDeliverStyle = 'color: #f56c42 !important; text-decoration: line-through !important;'

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

    document.querySelectorAll(targetProducts.toString()).forEach(productLink => {
      fetch(productLink.getAttribute('href'))
        .then(response => response.text())
        .then(data => {
          const isNotDeliverable = notDeliverMessages.some(message => data.includes(message))
          if (isNotDeliverable) {
            const productTitle = productLink.querySelector('span')
            productTitle.setAttribute('style', notDeliverStyle)
          }
        })
    })
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
