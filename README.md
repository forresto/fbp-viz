# fbp-viz

Rewrite of [noflo/visualize](https://github.com/noflo/visualize) with simpler stack:
* relying on [klayjs](https://github.com/OpenKieler/klayjs) for layout
* vanilla canvas for rendering
* tagged template literals via [yo-yo](https://github.com/maxogden/yo-yo)
* ES features that work in modern browsers (non-transpiled!)

![screen shot 2016-12-15 at 10 45 54 am](https://cloud.githubusercontent.com/assets/395307/21232470/b6fa7f56-c2b9-11e6-810c-fca094bc9344.png)

## structure

fbp string
→ noflo graph
→ klay graph
→ klay layout
→ canvas render

## todo / ideas

- [ ] Graph in/outports
- [ ] Extract rendering to lib
- [ ] Colors and magic numbers to theme config
- [ ] Save FBP to url hash for simple serverless sharing
- [ ] Example of FBP→PNG rendering from command line using [node-canvas]()
- [ ] SVG renderer, switchable
- [ ] Animate changes while editing
- [ ] [fbp-diff](https://github.com/flowbased/fbp-diff) visualization (green and red nodes and edges, let KLay layout?)
- [ ] Highlight rendered edge of cursor FBP line
- [ ] Tap rendered edge to select FBP line
