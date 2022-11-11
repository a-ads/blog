import { Fragment, createElement } from 'react'

export default ({ htmlStr, tagCn = 'txt-primary-300 bold', attrValueCn = 'txt-primary-100' }) => {
  const els = {
    tag: {
      regex: /(<|<\/)\w+/,
      cleanup: str => str.replaceAll('<', '').replaceAll('>', ''),
      wrapWith: ['<', '>'],
      cn: tagCn
    },
    attr: {
      regex: /"([\S|\S;\s]*?)"/,
      cleanup: str => str.replaceAll('"', ''),
      wrapWith: ['"', '"'],
      cn: attrValueCn,
    }
  }

  function wrapHtml (htmlArr, elsKey) {
    return htmlArr.map(strOrSubArr => {
      let s = strOrSubArr

      if (typeof s !== 'string') return s

      const elArr = []
      function findNextMatch () {
        const html = els[elsKey]
        if (s.match(html.regex)) {
          const match = s.match(html.regex)
          const before = html.cleanup(s.substring(0, match.index))
          const el = createElement(Fragment, {
            children: [
              html.wrapWith[0],
              createElement('span', { children: html.cleanup(match[0]), className: html.cn, key: match[0] }),
              html.wrapWith[1],
            ],
            key: match[0]
          })
          elArr.push(before, el)
          s = s.replace(before, '').replace(match[0], '')
          findNextMatch()
        }
        else elArr.push(html.cleanup(s))
      }
      findNextMatch()
      
      return elArr
    }).flat()
  }
  
  return Object.keys(els).reduce((p, c) => wrapHtml(p, c), [htmlStr.trim()])
}