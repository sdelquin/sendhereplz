function ready(fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

ready(function () {
  console.log('SendHerePlz is making its magic...')

  let targetProducts = ['h2 a.a-link-normal.a-text-normal']
  let notDeliverMessages = [
    'no puede ser enviado',
    'no hay vendedores que realicen envíos a',
    'no realiza envíos a',
    'Disponible a través de',
    'no puede enviarse',
  ]
  let notDeliverStyle = 'color: #f56c42 !important; text-decoration: line-through !important;'

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
})
