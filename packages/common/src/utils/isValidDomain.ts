import { sldMap } from './data/sldMap';

export function isValidDomain(value: string) {
  if (typeof value !== 'string') return false
  value = value.toLowerCase()

  if (value.endsWith('.')) {
    value = value.slice(0, value.length - 1)
  }

  if (value.length > 253) {
    return false
  }

  const validChars = /^([\u0E00-\u0E7Fa-z0-9-._*]+)$/g
  if (!validChars.test(value)) {
    return false
  }

  // https://github.com/miguelmota/is-valid-domain/blob/master/index.js
  const sldRegex = /(.*)\.(([\u0E00-\u0E7Fa-z0-9]+)(\.[a-z0-9]+))/
  const matches = value.match(sldRegex)
  let tld = null
  let labels = null
  if (matches && matches.length > 2) {
    if (sldMap[matches[2] as string]) {
      tld = matches[2]
      labels = matches[1].split('.')
    }
  }

  if (!labels) {
    labels = value.split('.')
    if (labels.length <= 1) return false

    tld = labels.pop()
    const tldRegex = /^(?:xn--)?(?!^\d+$)[\u0E00-\u0E7Fa-z0-9]+$/gi

    if (tld && !tldRegex.test(tld)) return false
  }


  const isValid = labels.every(function (label, index) {

    let validLabelChars = /^([\u0E00-\u0E7Fa-zA-Z0-9-_]+)$/g
    if (index === labels.length - 1) {
      validLabelChars = /^([\u0E00-\u0E7Fa-zA-Z0-9-]+)$/g
    }

    const doubleDashCount = (label.match(/--(--)?/g) || []).length
    const xnDashCount = (label.match(/xn--/g) || []).length
    if (index === labels.length - 1 && doubleDashCount !== xnDashCount) {
      return false
    }

    const isValid = (
      validLabelChars.test(label) &&
      label.length < 64 &&
      !label.startsWith('-') &&
      !label.endsWith('-')
    )

    return isValid
  })

  return isValid
}