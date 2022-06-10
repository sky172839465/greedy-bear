export const SITE_TYPE = {
  EX_HENTAI: 'exhentai',
  E_HENTAI: 'e-hentai',
  N_HENTAI: 'nhentai',
  WNACG: 'wnacg',
}

export const HOST = {
  EX_HENTAI: 'exhentai.org',
  E_HENTAI: 'e-hentai.org',
  N_HENTAI: 'nhentai.net',
  WNACG: 'wnacg.org',
}

export const GALLERY_PATH = {
  EX_HENTAI: 'g',
  E_HENTAI: 'g',
  N_HENTAI: 'g',
  WNACG: 'photos-index',
}

export const getSiteUrl = (urlStr) => {
  const { origin, pathname } = new URL(urlStr)
  const siteUrl = `${origin}${pathname}`
  return siteUrl
}

export const getSiteType = (urlStr) => {
  const siteUrl = getSiteUrl(urlStr)
  let siteType
  switch (true) {
    case new RegExp(`${HOST.EX_HENTAI}`).test(siteUrl): {
      siteType = SITE_TYPE.EX_HENTAI
      break
    }
    case new RegExp(`${HOST.E_HENTAI}`).test(siteUrl): {
      siteType = SITE_TYPE.E_HENTAI
      break
    }
    case new RegExp(`${HOST.N_HENTAI}`).test(siteUrl): {
      siteType = SITE_TYPE.N_HENTAI
      break
    }
    case new RegExp(`${HOST.WNACG}`).test(siteUrl): {
      siteType = SITE_TYPE.WNACG
      break
    }
    default: {
      break
    }
  }
  return siteType
}

export const getSelector = (galleryUrl) => {
  const siteType = getSiteType(galleryUrl)
  let selector
  switch (siteType) {
    case SITE_TYPE.EX_HENTAI: {
      selector = {
        cover: '.gdtm',
        image: '#i3',
      }
      break
    }
    case SITE_TYPE.E_HENTAI: {
      selector = {
        cover: '.gdtm',
        image: '#i3',
      }
      break
    }
    case SITE_TYPE.N_HENTAI: {
      selector = {
        cover: '.thumb-container',
        image: '#image-container',
      }
      break
    }
    case SITE_TYPE.WNACG: {
      selector = {
        cover: '.pic_box.tb',
        image: '#posselect',
      }
      break
    }
    default:
      break
  }
  return selector
}

export const getPaginationGenerator = (galleryUrl) => {
  const siteType = getSiteType(galleryUrl)
  const siteUrl = getSiteUrl(galleryUrl)
  let paginationGenerator
  switch (siteType) {
    case SITE_TYPE.EX_HENTAI:
    case SITE_TYPE.E_HENTAI: {
      const generator = (page) => `${siteUrl}?p=${page}`
      paginationGenerator = generator
      break
    }
    case SITE_TYPE.WNACG: {
      // 'https://www.wnacg.org/photos-index-aid-102588.html'
      // https://www.wnacg.org/photos-index-page-2-aid-102588.html
      const generator = (page) => siteUrl.replace('index-aid', `index-page-${page + 1}-aid`)
      paginationGenerator = generator
      break
    }
    case SITE_TYPE.N_HENTAI:
      paginationGenerator = null
      break
    default:
      break
  }
  return paginationGenerator
}
