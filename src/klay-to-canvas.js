function drawEdge (context, edge) {
  const {sourcePoint, bendPoints, targetPoint} = edge
  context.beginPath()
  context.moveTo(sourcePoint.x, sourcePoint.y)
  if (bendPoints) {
    for (let i = 0, len = bendPoints.length; i < len; i++) {
      const bendPoint = bendPoints[i]
      context.lineTo(bendPoint.x, bendPoint.y)
    }
  }
  context.lineTo(targetPoint.x, targetPoint.y)
  context.stroke()
}

function drawPort (context, port, dx, dy) {
  const {x, y, labels, properties} = port
  context.strokeRect(x + dx - 2, y + dy - 2, 4, 4)

  context.textAlign = properties.portSide === "EAST" ? 'right' : 'left'
  context.textBaseline = 'middle'

  const padding = properties.portSide === "EAST" ? -7 : 7

  for (let i = 0, len = labels.length; i < len; i++) {
    const label = labels[i]
    context.fillText(label.text, x + dx + padding, y + dy)
  }
}

function drawNode (context, node) {
  const {x, y, width, height, labels, ports} = node
  context.strokeRect(x, y, width, height + 14)

  context.textAlign = 'center'
  context.textBaseline = 'top'

  for (let i = 0, len = labels.length; i < len; i++) {
    const label = labels[i]
    context.fillText(label.text, x + label.x, y + label.y)
  }

  for (let i = 0, len = ports.length; i < len; i++) {
    const port = ports[i]
    drawPort(context, port, x, y)
  }
}

function klayToCanvas (kGraph, canvas) {
  const {width, height, children, edges} = kGraph
  canvas.width = width
  canvas.height = height + 14
  const context = canvas.getContext('2d')

  // Reset
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height + 14)
  // Whole pixel magic
  context.setTransform(1, 0, 0, 1, 0.5, 0.5)
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  // context.lineWidth = 2
  context.font = '14px monospace'

  for (let i = 0, len = children.length; i < len; i++) {
    drawNode(context, children[i])
  }
  for (let i = 0, len = edges.length; i < len; i++) {
    drawEdge(context, edges[i])
  }
}

module.exports = klayToCanvas
