var svg = d3.select("svg");

// dataset = [
//     {"x": -2.808341779, "y":8},
//     {"x": -2.513197563, "y":8},
//     {"x": -2.218053347, "y":3},
//     {"x": -1.922909131, "y":8},
//     {"x": -1.627764915, "y":3},
//     {"x": -1.3326207, "y":4},
//     {"x": -1.037476484, "y":2},
//     {"x": -0.742332268, "y":6},
//     {"x": -0.447188052, "y":4},
//     {"x": -0.152043836, "y":7},
//     {"x": 0.14310038, "y":5},
//     {"x": 0.438244596, "y":4},
//     {"x": 0.733388812, "y":4},
//     {"x": 1.028533028, "y":3},
//     {"x": 1.323677244, "y":8},
//     {"x": 1.618821459, "y":4},
//     {"x": 1.913965675, "y":3},
//     {"x": 2.209109891, "y":6},
//     {"x": 2.504254107, "y":4},
//     {"x": 2.799398323, "y":6}
// ];

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var w = 500,
    h = 100,
    barPadding = 1;

svg.attr("width", w)
   .attr("height", h);


svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
        return i * (w / dataset.length); 
    })
    .attr("y", function(d) { 
        return h - (d*4);
    })
    .attr("width", w / dataset.length - barPadding)
    .attr("height", function(d) {
        return d*4;
    })
    .attr("fill", function(d) {
        return "rgb(0,0," + (d * 10) + ")";
    });

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) { 
        return d;
    })
    .attr("x", function(d, i) { 
        return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    })
    .attr("y", function(d) { 
        return h - (d*4) + 15;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");

