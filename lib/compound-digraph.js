var Digraph = require("./digraph"),
    baseCompoundGraph = require("./base-compound-graph");

module.exports = CDigraph;

function CDigraph() {
  Digraph.call(this);

  // Graph with each edge representing a "parent of" relationship. This is
  // actually a forest, but you can image the root being "undefined" and thus
  // all sources have the root as their parent.
  this._nestingTree = new Digraph();
}

CDigraph.prototype = new Digraph();
CDigraph.prototype.constructor = CDigraph;

baseCompoundGraph.mixin(CDigraph.prototype);