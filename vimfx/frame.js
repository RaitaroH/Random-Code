vimfx.listen('getCurrentHref', (data, callback) => {
  let {href} = content.document.activeElement
  callback(href)
})
vimfx.listen('getSelection', (data, callback) => {
  let selection = content.getSelection().toString()
  callback(selection)
})
