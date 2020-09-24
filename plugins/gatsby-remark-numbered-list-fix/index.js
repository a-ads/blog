const visit = require("unist-util-visit")

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "list", node => {
    if (node.start > 1) {
      node.data = {
        "hProperties": {
          "style": `--start:${node.start}`
        }
      }
    }
    return node
  })

  return markdownAST
}
