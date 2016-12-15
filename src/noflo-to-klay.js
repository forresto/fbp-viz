/*

  Noflo graph JSON to KLay graph JSON

*/

const klay = require('klayjs')
const xtend = require('xtend')

const graphProps =
  { direction: 'RIGHT'
  , spacing: 40
  , feedBackEdges: true
  , edgeRouting: 'ORTHOGONAL'
  , unnecessaryBendpoints: false
  }
const nodeProps =
  { nodeLabelPlacement: 'INSIDE H_CENTER V_TOP'
  , portLabelPlacement: 'INSIDE'
  , sizeConstraint: 'MINIMUM_SIZE NODE_LABELS PORTS PORT_LABELS'
  , sizeOptions: 'DEFAULT_MINIMUM_SIZE COMPUTE_INSETS MINIMUM_SIZE_ACCOUNTS_FOR_INSETS'
  , labelSpacing: 14
  // , portSpacing: 14
  , minWidth: 36
  , minHeight: 48
  , portConstraints: 'FIXED_POS'
  }
const portProps =
  { sizeConstraint: 'MINIMUM_SIZE'
  , portSide: 'WEST'
  }
const options =
  { intCoordinates: true
  }

function makeKPorts (portInfo, processId) {
  const inports = portInfo.in.map(function (id, index) {
    return {
      id: `${processId}:::${id}`,
      labels: [ { text: id } ],
      y: (index + 2) * 21,
      // height: 21,
      // width: id.length * 10 + 12,
      properties: {portSide: 'WEST'},
    }
  })
  const outports = portInfo.out.map(function (id, index) {
    const minWidth = id.length * 10 + 12
    return {
      id: `${processId}:::${id}`,
      labels: [ { text: id } ],
      y: (index + 2) * 21,
      // height: 21,
      // width: id.length * 10 + 12,
      properties: {portSide: 'EAST'},
    }
  })
  return inports.concat(outports)
}

function makeKNode (processId, node, portInfo) {
  const label = `${processId} (${node.component ? node.component : ''})`
  const minWidth = label.length * 10 + 12
  let kNode = {
    id: processId,
    labels: [ { text: label } ],
    properties: xtend(nodeProps, {minWidth}),
    ports: makeKPorts(portInfo, processId),
  }
  return kNode
}

function makeKNodes (processes, kPorts) {
  const keys = Object.keys(processes)
  return keys.map(function (key) {
    return makeKNode(key, processes[key], kPorts[key])
  })
}

function makeKEdge (edge, index) {
  return {
    id: index + '',
    source: edge.src.process,
    sourcePort: `${edge.src.process}:::${edge.src.port}`,
    target: edge.tgt.process,
    targetPort: `${edge.tgt.process}:::${edge.tgt.port}`,
  }
}

function graphToPorts (graph) {
  let portInfo = {}
  for (let i = 0, len = graph.connections.length; i < len; i++) {
    const edge = graph.connections[i]
    if (!portInfo[edge.src.process]) {
      portInfo[edge.src.process] = {in: [], out: []}
    }
    if (portInfo[edge.src.process].out.indexOf(edge.src.port) === -1) {
      portInfo[edge.src.process].out.push(edge.src.port)
    }
    if (!portInfo[edge.tgt.process]) {
      portInfo[edge.tgt.process] = {in: [], out: []}
    }
    if (portInfo[edge.tgt.process].in.indexOf(edge.tgt.port) === -1) {
      portInfo[edge.tgt.process].in.push(edge.tgt.port)
    }
  }
  return portInfo
}

function graphToKGraph (graph) {
  const portInfo = graphToPorts(graph)
  const kGraph = {
    id: 'root',
    properties: graphProps,
    children: makeKNodes(graph.processes, portInfo),
    edges: graph.connections.map(makeKEdge),
  }
  return kGraph
}

function nofloToKlay (graph, error, success) {
  const kGraph = graphToKGraph(graph)
  // Can be workerized if too sluggish on main thread
  // https://github.com/OpenKieler/klayjs#web-worker
  klay.layout({graph: kGraph, options, error, success})
}

module.exports = nofloToKlay
