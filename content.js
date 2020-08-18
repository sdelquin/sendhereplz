$(function () {
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

  $(targetProducts.toString()).each(function () {
    let theLink = $(this)
    $.get(theLink.attr('href'), function (data) {
      for (i = 0; i < notDeliverMessages.length; i++) {
        if (data.search(notDeliverMessages[i]) != -1) {
          theLink.find('span').attr('style', notDeliverStyle)
          break
        }
      }
    })
  })
})
