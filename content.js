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

    document.querySelectorAll(targetProducts.toString()).forEach(function (theLink) {
      fetch(theLink.getAttribute('href'))
        .then(function (response) {
          return response.text()
        })
        .then(function (data) {
          for (i = 0; i < notDeliverMessages.length; i++) {
            if (data.search(notDeliverMessages[i]) != -1) {
              theLink.querySelectorAll('span').forEach(function (span) {
                span.setAttribute('style', notDeliverStyle)
              })
              break
            }
          }
        })
    })
  }

  function observeNewProducts() {
    const resultLoaderNodes = document.getElementsByClassName('s-result-list-placeholder')
    if (resultLoaderNodes.length > 0) {
      const observer = new MutationObserver(function (_) {
        checkProducts()
      })
      observer.observe(resultLoaderNodes[0], { attributes: true })
    }
  }
})()
