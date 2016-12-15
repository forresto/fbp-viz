const fbpToNoflo = require('./fbp-to-noflo')
const nofloToKlay = require('./noflo-to-klay')
const klayToCanvas = require('./klay-to-canvas')

function layoutGraph (nofloGraph, canvas, error, callback) {
  function klayError (e) {
    console.log(e)
    error(e.text)
  }
  function klaySuccess (kGraph) {
    console.log(kGraph)
    klayToCanvas(kGraph, canvas)
    callback(canvas)
  }
  nofloToKlay(nofloGraph, klayError, klaySuccess)
}

function fbpToCanvas (fbpString, canvas, error, callback) {
  let nofloGraph
  try {
    nofloGraph = fbpToNoflo(fbpString)
  } catch (e) {
    console.log(e)
    error(e.message)
    return
  }

  layoutGraph(nofloGraph, canvas, error, callback)
}

module.exports = fbpToCanvas
