var expect = require("../chai").expect,
    Graph = require("../..").Graph,
    floydWarshall = require("../..").alg.floydWarshall,
    allShortestPathsTest = require("./all-shortest-paths-test");

describe("alg.floydWarshall", function() {
  allShortestPathsTest.tests(floydWarshall);

  it("handles negative weights", function() {
    var g = new Graph();
    g.edge("a", "b").weight =  1;
    g.edge("a", "c").weight = -2;
    g.edge("b", "d").weight =  3;
    g.edge("c", "d").weight =  3;

    expect(floydWarshall(g, weightFn(g))).to.eql({
      a: {
        a: { distance:  0 },
        b: { distance:  1, predecessor: "a" },
        c: { distance: -2, predecessor: "a" },
        d: { distance:  1, predecessor: "c" }
      },
      b: {
        a: { distance: Number.POSITIVE_INFINITY },
        b: { distance: 0 },
        c: { distance: Number.POSITIVE_INFINITY },
        d: { distance: 3, predecessor: "b" }
      },
      c: {
        a: { distance: Number.POSITIVE_INFINITY },
        b: { distance: Number.POSITIVE_INFINITY },
        c: { distance: 0 },
        d: { distance: 3, predecessor: "c" }
      },
      d: {
        a: { distance: Number.POSITIVE_INFINITY },
        b: { distance: Number.POSITIVE_INFINITY },
        c: { distance: Number.POSITIVE_INFINITY },
        d: { distance: 0 }
      }
    });
  });

  it("does include negative weight self edges", function() {
    var g = new Graph();
    g.edge("a", "a").weight = -1;

    // In the case of a negative cycle the distance is not well-defined beyond
    // having a negative value along the diagonal.
    expect(floydWarshall(g, weightFn(g))).to.eql({
      a: {
        a: { distance: -2, predecessor: "a" }
      }
    });
  });
});

function weightFn(g) {
  return function(edge) {
    return g.edge(edge).weight;
  };
}
