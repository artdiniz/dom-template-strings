const assert = require('assert')
const dom = require('../src/')

describe('dom tagged template string', function() {
  it('should return a DOM node', function() {
    let node = dom`<span></span>`
    assert.ok(node instanceof Node)
    assert.equal(node.tagName, "SPAN")
  })

  it('should return a DOM fragment', function() {
    let node = dom`<tr><td>a</td></tr><tr><td>b</td></tr>`
    assert.ok(node instanceof Node)
    assert.equal(node.querySelectorAll('tr').length, 2)
    assert.equal(node.querySelectorAll('tr > td').length, 2)
    assert.equal(node.nodeType, Node.DOCUMENT_FRAGMENT_NODE)
  })

  it('should replace attributes values', function() {
    let obj = {
      className: 'myclass',
      text: 'awesome'
    }
    let node = dom`<span class="${obj.className}">${obj.text}</span>`
    assert.equal(node.innerHTML, obj.text)
    assert.equal(node.className, obj.className)
  })

  it('should replace a Node value', function() {
    const items = [ 'One', 'Two', 'Three' ]
    const list = dom`<ul>${items.map(label => {
      const removeBtn = dom`<button>X</button>`
      const node = dom`<li>${label} ${removeBtn}</li>`
    return node
    })}</ul>`
    assert.equal(list.querySelectorAll('li').length, 3)
    assert.equal(list.querySelectorAll('li > button').length, 3)
    assert.equal(list.textContent, 'One XTwo XThree X')
  })
})

