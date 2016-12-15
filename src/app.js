const yo = require('yo-yo')

const fbpToCanvas = require('./fbp-to-canvas')

let el


function initApp (el) {
  const fbpInput = el.querySelector('#fbpinput')
  const fbpError = el.querySelector('#fbperror')
  const editor = el.querySelector('#editor')
  const example = el.querySelector('#example')
  const viz = el.querySelector('#viz')
  const canvas = el.querySelector('#canvas')

  function visualize () {
    const fbpString = fbpInput.value.trim()
    function error (errorMessage) {
      fbpError.textContent = errorMessage
    }
    function callback (message) {
      fbpError.textContent = ''
      console.log('Success!', message)
    }
    fbpToCanvas(fbpString, canvas, error, callback)
  }

  fbpInput.focus()

  fbpInput.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.keyCode === 13) {
      event.preventDefault()
    }
  })
  fbpInput.addEventListener('keyup', function (event) {
    if (event.shiftKey && event.keyCode === 13) {
      visualize()
    }
  })
  fbpInput.addEventListener('blur', function (event) {
    visualize()
  })
  example.addEventListener('click', function (event) {
    fbpInput.value = `\
Process1(Component1) OUT -> IN Process2(c2)
Process1 OUT2 -> IN Process2(c2)
Process1 OUT3 -> IN Process2(c2)
Process1 ERROR -> IN Process3(c3)
Process2 LOOPBACK -> IN Process1
`
    visualize()
  })
  viz.addEventListener('click', function (event) {
    visualize()
  })

  // DEBUG
  example.click()
}

function renderApp () {
  return yo`
    <div onload=${initApp}>
      <div id="editor">
        <canvas id="canvas"></canvas>
      </div>
      <div id="fbperror"></div>
      <div id="fbp">
        <textarea id="fbpinput" placeholder="Type your FBP here, press (shift+enter) to 👁"></textarea>
      </div>
      <div id="controls">
        <button id="example" title="load example graph">ex</button>
        <button id="viz" title="visualize (shift+enter)">viz 👁</button>
      </div>
    </div>
  `
}

/* 
// More complexity than worth right now
function update (newState) {
  state = xtend(state, newState)
  const newEl = renderApp(state)
  yo.update(el, newEl)
}
*/

function mount () {
  el = renderApp()
  document.body.appendChild(el)
}

module.exports = {mount}
