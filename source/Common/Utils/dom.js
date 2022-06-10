import { isUndefined } from 'lodash'

export const parseStrToDom = (str) => new DOMParser().parseFromString(str, 'text/html')

export const findAllViewImagePageUrls = (dom, coverSelector) => {
  const linkSelector = `${coverSelector} a[href]`
  const allViewImagePageUrls = [...dom.querySelectorAll(linkSelector)]
    .map((linkDom) => {
      if (isUndefined(linkDom)) {
        throw new Error(`view image page link not found: ${linkSelector}`)
      }

      return linkDom.href
    })
  return allViewImagePageUrls
}

export const findAllRealImageUrls = (dom, imageContainerSelector) => {
  const imageSelector = `${imageContainerSelector} img[src]`
  const allRealImageUrls = [...dom.querySelectorAll(imageSelector)]
    .map((imgDom) => {
      if (isUndefined(imgDom)) {
        throw new Error(`real image link not found: ${imageSelector}`)
      }

      return imgDom.src
    })
  return allRealImageUrls
}
