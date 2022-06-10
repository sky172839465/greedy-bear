const GALLARY_URL = 'https://nhentai.net/g/404231/'
const VIEW_IMAGE_URL = 'https://nhentai.net/g/404231/1/'
const TRUE_IMAGE_URL = 'https://i7.nhentai.net/galleries/2228283/1.jpg'

// const GALLARY_URL = 'https://e-hentai.org/g/2236458/86a41992be/'
// const VIEW_IMAGE_URL = 'https://e-hentai.org/s/150c631dfc/2236458-1'
// const TRUE_IMAGE_URL = 'https://vwtwwtc.hptullknlhgd.hath.network/h/e3282418043b3bb8ef1f20e28279525f077d6bc9-413818-1280-2068-jpg/keystamp=1654343400-4eb4b2d15c;fileindex=108879750;xres=1280/18299059_98786678_p0.jpg'

// const GALLARY_URL = 'https://www.wnacg.org/photos-index-aid-102588.html'
// const VIEW_IMAGE_URL = 'https://www.wnacg.org/photos-view-id-8308611.html'
// const TRUE_IMAGE_URL = 'https://img2.qy0.ru/data/1025/88/Leo_LoliPatron_14_000a.jpg'

const findWithParentSelector = (dom, targetSelector) => {
  let retry = 5
  let currentDOM = dom
  let currentSelectors = []
  while (retry > 0) {
    currentDOM = currentDOM.parentNode
    const { id, className } = currentDOM
    if (id) {
      currentSelectors.push(`#${id}`)
    } else if (className) {
      currentSelectors.push(`.${className.split(' ').join('.')}`)
    }

    if (currentSelectors.length > 0) {
      console.log(currentSelectors, currentDOM.querySelectorAll(targetSelector))
      if (currentDOM.querySelectorAll(targetSelector).length !== 1) {
        currentSelectors = []
        break
      }

      break
    }

    retry -= 1
  }
  const targetWithParentSelector = [...currentSelectors, targetSelector].join(' ')
  return targetWithParentSelector
}

fetch(GALLARY_URL)
  .then((res) => res.text())
  .then((html) => new DOMParser().parseFromString(html, 'text/html'))
  .then((dom) => {
    const { pathname } = new URL(VIEW_IMAGE_URL)
    const selector = `[href$="${pathname}"]`
    return dom.querySelectorAll(selector)
  })
  .then((thumbnailDOMs) => {
    console.log({ thumbnailDOMs })
    const targetThumbnailDOM = [...thumbnailDOMs]
      .reverse()
      .find((thumbnailDOM) => {
        const isTargetDOM = thumbnailDOM.className || thumbnailDOM.style
        return isTargetDOM
      })
    if (!targetThumbnailDOM) {
      throw new Error('targetThumbnailDOM not found')
    }
    const defaultThumbnailSelector = targetThumbnailDOM.className ? `.${targetThumbnailDOM.className}` : 'a[href]'
    const thumbnailSelector = findWithParentSelector(targetThumbnailDOM, defaultThumbnailSelector)
    const viewImageUrl = targetThumbnailDOM.href
    console.log({ thumbnailSelector })
    return fetch(viewImageUrl)
  })
  .then((res) => res.text())
  .then((html) => new DOMParser().parseFromString(html, 'text/html'))
  .then((dom) => {
    const imageFileName = TRUE_IMAGE_URL.split('/').pop()
    const imageSelector = `img[src*="${imageFileName}"]`
    const targetImageDOM = dom.querySelector(imageSelector)
    console.log({ targetImageDOM })
    if (!targetImageDOM) {
      throw new Error('targetImageDOM not found')
    }

    const defaultImageSelector = targetImageDOM.className || 'img[src]'
    const imgSelector = findWithParentSelector(targetImageDOM, defaultImageSelector)
    console.log({ imgSelector })
    return targetImageDOM.src
  })
  .then(console.log)
  .catch(console.log)
