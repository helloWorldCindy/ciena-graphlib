var expect = require("../chai").expect,
    _ = require("lodash"),
    Graph = require("../..").Graph,
    components = require("../..").alg.components;

describe("alg.components", function() {
  it("returns an empty list for an empty graph", function() {
    expect(components(new Graph({ directed: false }))).to.be.empty;
  });

  it("returns singleton lists for unconnected nodes", function() {
    var g = new Graph({ directed: false });
    g.node("a");
    g.node("b");

    var result = _.sortBy(components(g), function(arr) { return _.min(arr); });
    expect(result).to.eql([["a"], ["b"]]);
  });

  it("returns a list of nodes in a component", function() {
    var g = new Graph({ directed: false });
    g.edge("a", "b");
    g.edge("b", "c");

    var result = _.map(components(g), function(xs) { return _.sortBy(xs); });
    expect(result).to.eql([["a", "b", "c"]]);
  });

  it("returns nodes connected by a neighbor relationship in a digraph", function() {
    var g = new Graph();
    g.path("a", "b", "c", "a");
    g.edge("d", "c");
    g.edge("e", "f");

    var result = _.sortBy(_.map(components(g), function(xs) { return _.sortBy(xs); }),
                          "0");
    expect(result).to.eql([["a", "b", "c", "d"], ["e", "f"]]);
  });
});
