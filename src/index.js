let warned = false

const omit = (object, property) => {
  const acc = {}
  Object.keys(object).forEach((key) => {
    if (key !== property) {
      acc[key] = object[key]
    }
  })
  return acc
}
 
export default (property = 'label', removeProperty = true, padding = 20) => {
  if (property.selector) {
    // Misuse
    if (!warned) {
      console.warn('extract-to-comment: This plugin exports factory that should be called before usage.')
      console.warn(`extract-to-comment: plugins.add(extractToComment('label', true))`)
      warned = true
    }
    return property
  }
  
  return ({ selector, style }) => {
    const { label, ...rest } = style
    let comment = style[property] || '' 
    for (let i = comment.length; i < padding; i++) {
      comment += ' '
    } 
    selector = `/* ${comment}*/ ${selector}`
    if (removeProperty && style[property] !== undefined) {
      style = omit(style, property)
    }
    return ({ selector, style }) 
  }
}
