const GALLARY_URL = window.location.href
// e-hentai
const COVER_SELECTOR = '.gdtm'
const IMAGE_SELECTOR = '#i3'

// wnacg
// const COVER_SELECTOR = '.pic_box.tb'
// const IMAGE_SELECTOR = '#posselect'

// nhentai
// const COVER_SELECTOR = '.thumb-container'
// const IMAGE_SELECTOR = '#image-container'

fetch(GALLARY_URL)
  .then((res) => res.text())
  .then((html) => new DOMParser().parseFromString(html, 'text/html'))
  .then((dom) => {
    const selector = `${COVER_SELECTOR} a[href]`
    const viewImageUrls = [...dom.querySelectorAll(selector)]
      .slice(0, 5)
      .map((linkDOM) => linkDOM.href)
    return Promise.all(
      viewImageUrls.map((viewImageUrl) => fetch(viewImageUrl)),
    )
  })
  .then((resList) => Promise.all(resList.map((res) => res.text())))
  .then((htmlList) => htmlList.map((html) => new DOMParser().parseFromString(html, 'text/html')))
  .then((domList) => {
    const images = domList.map((dom) => {
      const imageSelector = `${IMAGE_SELECTOR} img[src]`
      const targetImageDOM = dom.querySelector(imageSelector)
      if (!targetImageDOM) {
        throw new Error('targetImageDOM not found')
      }

      return targetImageDOM.src
    })
    return images
  })
  .then(console.log)
  .catch(console.log)
