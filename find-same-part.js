// const aUrl = 'https://www.wnacg.org/photos-index-page-1-aid-102588.html'
// const bUrl = 'https://www.wnacg.org/photos-index-page-2-aid-102588.html'

const aUrl = 'https://e-hentai.org/g/2236458/86a41992be/?p=0'
const bUrl = 'https://e-hentai.org/g/2236458/86a41992be/?p=1'

const findSamePart = (a, b) => {
  let prefix = ''
  for (let i = 0; i < a.length; i += 1) {
    const newPrefix = `${prefix}${a[i]}`
    if (!b.startsWith(newPrefix)) {
      break
    }
    prefix = newPrefix
  }
  return prefix
}
const prefix = findSamePart(aUrl, bUrl)
console.log(prefix)

const [reverseAUrl, reverseBUrl] = [aUrl, bUrl].map((url) => [...url.replace(prefix, '')].reverse().join(''))
const suffix = [...findSamePart(reverseAUrl, reverseBUrl)].reverse().join('')
console.log(suffix)
