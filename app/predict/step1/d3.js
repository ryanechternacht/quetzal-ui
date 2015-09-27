var svg = d3.select("svg");

var width = 800,
    height = 300;

svg.attr("width", width)
   .attr("height", height);

function makeMyData() { 
    var dataset = [
        {"x": -2.808341779, "y":8},
        {"x": -2.513197563, "y":8},
        {"x": -2.218053347, "y":3},
        {"x": -1.922909131, "y":8},
        {"x": -1.627764915, "y":3},
        {"x": -1.3326207, "y":4},
        {"x": -1.037476484, "y":2},
        {"x": -0.742332268, "y":6},
        {"x": -0.447188052, "y":4},
        {"x": -0.152043836, "y":7},
        {"x": 0.14310038, "y":5},
        {"x": 0.438244596, "y":4},
        {"x": 0.733388812, "y":4},
        {"x": 1.028533028, "y":3},
        {"x": 1.323677244, "y":8},
        {"x": 1.618821459, "y":4},
        {"x": 1.913965675, "y":3},
        {"x": 2.209109891, "y":6},
        {"x": 2.504254107, "y":4},
        {"x": 2.799398323, "y":6}
    ];

    var barPadding = 5,
        xPadding = 30,
        yPaddingBottom = 30,
        yPaddingTop = 100,
        yBottom = height - yPaddingBottom;
        yTop = yPaddingTop,
        w = width - 2*xPadding;

    var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) { return d.y; })])
                    .range([yBottom, yTop]);

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d,i) { 
            return i * (w / dataset.length);
        })
        .attr("y", function(d,i) { 
            return yScale(d.y); 
        })
        .attr("width", w / dataset.length - barPadding)
        .attr("height", function(d,i) { 
            return yBottom - yScale(d.y); 
        })
        .attr("class", "bar");

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d,i) { 
                return d.y;
            })
            .attr("x", function(d,i) { 
                return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
            })
            .attr("y", function(d,i) { 
                return yScale(d.y) - 5;
            })
            .attr("font-family", "sans-serif")
            .attr("font-fize", "11px")
            .attr("text-anchor", "middle");

        svg.selectAll("g")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d,i) { 
                // from http://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
                return parseFloat(Math.round(d.x * 100) / 100).toFixed(1);
            })
            .attr("x", function(d,i) { 
                return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
            })
            .attr("y", yBottom + 15)
            .attr("font-family", "sans-serif")
            .attr("font-fize", "11px")
            .attr("text-anchor", "middle");

}

function makeScatterPlot() { 
    var dataset = [
        [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
        [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600,150]
    ];

    var padding = 30;

    var xScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                    .range([padding, width - 2*padding]);

    var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(5);

    var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                    .range([height - padding, padding]);

    var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(5);


    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d) { 
            return xScale(d[0]);
        })
        .attr("cy", function(d) { 
            return yScale(d[1]);
        })
        .attr("r", 5);

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", function(d) { 
            return xScale(d[0]);
        })
        .attr("y", function(d) { 
            return yScale(d[1]);
        })
        .text(function(d) { 
            return "(" + d[0] + "," + d[1] + ")";
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "red");

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + (height-padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(yAxis);
}


function makeBars() { 
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                    11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

    var barPadding = 1;

    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (width / dataset.length); 
        })
        .attr("y", function(d) { 
            return height - (d*4);
        })
        .attr("width", width / dataset.length - barPadding)
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
            return i * (width / dataset.length) + (width / dataset.length - barPadding) / 2;
        })
        .attr("y", function(d) { 
            return height - (d*4) + 15;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "white")
        .attr("text-anchor", "middle");
}

// makeBars();
// makeScatterPlot();
makeMyData();