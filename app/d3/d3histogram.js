'use strict';

var drawHistogram = function(d3, svg, scope, iElement, iAttrs, data) { 
    // remove all previous items before render
    svg.selectAll("*").remove();

    var width = 800,
    height = 300;

    svg.attr("width", width)
       .attr("height", height);

    var dataset = scope.data;

    // var dataset = [
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

    var barPadding = 5,
        xPadding = 30,
        yPaddingBottom = 30,
        yPaddingTop = 100,
        yBottom = height - yPaddingBottom,
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

angular.module('d3').directive('d3Histogram', ['d3', function(d3) { 
    return {
        restrict: 'EA',
        scope: {
            data: '='
            // label: '@',
            // onClick: '&'
        },
        link: function(scope, iElement, iAttrs) {
            var svg = d3.select(iElement[0])
                .append("svg")
                .attr("width", "100%");

            // on window resize, re-render d3 canvas
            window.onresize = function() {
                return scope.$apply();
            };
            scope.$watch(function(){
                return angular.element(window)[0].innerWidth;
            }, function(){
                return scope.render(scope.data);
            });

            // watch for data changes and re-render
            scope.$watch('data', function(newVals, oldVals) {
                return scope.render(newVals);
            }, true);

            // define render function
            scope.render = function(data) {
                drawHistogram(d3, svg, scope, iElement, iAttrs, data);
            };
        }
    };
}]);