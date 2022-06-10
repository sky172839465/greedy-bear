import { first, isEmpty, concat } from 'lodash'
import { findAllRealImageUrls, parseStrToDom } from '../Utils/dom'
import { getSelector } from '../Utils/host'
import { getRequest } from './utils'

export const fetchRealImageUrl = async (viewPageUrl) => {
  const html = await getRequest(viewPageUrl).then(parseStrToDom)
  return html
}

export const fetchAllRealImageUrls = async (viewPageUrls = []) => {
  const selector = getSelector(first(viewPageUrls))
  if (isEmpty(selector)) {
    return []
  }

  const domList = await Promise.all(viewPageUrls.map(fetchRealImageUrl))
  const imageUrls = concat(
    ...domList.map((dom) => findAllRealImageUrls(dom, selector.image)),
  )
  return imageUrls
}
