import {
  isEmpty,
  isEqual,
  isNull,
  isUndefined,
} from 'lodash'
import { findAllViewImagePageUrls, parseStrToDom } from '../Utils/dom'
import {
  getSelector,
  getPaginationGenerator,
} from '../Utils/host'
import { getRequest } from './utils'

export const fetchViewPageHtml = async (paginationUrl) => {
  const html = await getRequest(paginationUrl).then(parseStrToDom)
  return html
}

export const fetchAllViewPageUrls = async (galleryUrl, page, totalViewImagePageUrls = []) => {
  const selector = getSelector(galleryUrl)
  if (isEmpty(selector)) {
    return []
  }

  const coverSelector = selector.cover
  const paginationGenerator = getPaginationGenerator(galleryUrl)
  if (isNull(paginationGenerator)) {
    const html = await fetchViewPageHtml(galleryUrl)
    const viewImagePageUrls = findAllViewImagePageUrls(html, coverSelector)
    return viewImagePageUrls
  }

  if (isUndefined(paginationGenerator)) {
    return []
  }

  const paginationUrl = paginationGenerator(page)
  const html = await fetchViewPageHtml(paginationUrl)
  const viewImagePageUrls = findAllViewImagePageUrls(html, coverSelector)
  const isLastPage = (
    isEmpty(viewImagePageUrls) ||
    isEqual(totalViewImagePageUrls.slice(-1), viewImagePageUrls.slice(-1))
  )
  if (isLastPage) {
    return totalViewImagePageUrls.slice(0, 20)
    // return totalViewImagePageUrls
  }

  const newTotalViewImagePageUrls = [...totalViewImagePageUrls, ...viewImagePageUrls]
  return fetchAllViewPageUrls(galleryUrl, page + 1, newTotalViewImagePageUrls)
}
