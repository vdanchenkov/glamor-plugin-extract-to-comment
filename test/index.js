import test from "tape"
import plugin from "../src"

const definition = { 
  selector: '[data-css-1lyca4j]', 
  style: { display: 'block', label: 'ModuleSelector' } 
}

Object.freeze(definition) 

test("adds comments with default settings", (t) => {
  t.deepEqual(
    { selector: '/* ModuleSelector      */ [data-css-1lyca4j]', style: { display: 'block' } }, 
    plugin()(definition)
  )
  t.end()
})

test("keep label if asked for", (t) => {
  t.deepEqual(
    { selector: '/* ModuleSelector      */ [data-css-1lyca4j]', style: definition.style }, 
    plugin('label', false)(definition)
  )
  t.end()
})

test("allows to define padding", (t) => {
  t.deepEqual(
    { selector: '/* ModuleSelector */ [data-css-1lyca4j]', style: definition.style }, 
    plugin('label', false, 15)(definition)
  )
  t.end()
})

test('warns about misusage of factory', (t) => {
  // It's two-line mesage
  t.plan(2)
  const warn = console.warn
  console.warn = () => t.pass('warn called')
  plugin(definition)
  plugin(definition)
  plugin(definition)
  console.warn = warn
  t.end()
})