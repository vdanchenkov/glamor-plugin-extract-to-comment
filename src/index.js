let warned = false

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
    let comment = label || '' 
    for (let i = comment.length; i < padding; i++) {
      comment += ' '
    } 
    selector = `/* ${comment}*/ ${selector}`
    if (removeProperty && label) {
      style = rest
    }
    return ({ selector, style }) 
  }
}
