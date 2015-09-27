'use strict';

var drawHistogram = function(d3, svg, scope, iElement, iAttrs, data) { 
    // remove all previous items before render
    svg.selectAll("*").remove();

    var width = 800,
    height = 300;

    svg.attr("width", width)
       .attr("height", height);

    var dataset = scope.data;

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

    var xScale = d3.scale.ordinal()
                    .domain(data.map(function(d) { return d.x; }))
                    .rangeRoundBands([0, width], .1);

    var bar = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(d) { 
            return "translate(" + xScale(d.x) + ",0)";
        });

    bar.append("rect")
        .attr("y", function(d, i) { return yScale(d.y); })
        .attr("height", function(d) { return yBottom - yScale(d.y); })
        .attr("width", function(d) { return xScale.rangeBand(); })
        .attr("class", "bar");

    bar.append("text")
        .text(function(d,i) { return d.y; })
        .attr("y", function(d,i) { return yScale(d.y) - 5; })
        .attr("x", dataset.length)
        .attr("width", function(d) { return xScale.rangeBand(); })
        .attr("font-family", "sans-serif")
        .attr("font-fize", "11px")
        .attr("text-anchor", "middle");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + yBottom + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "axis y-axis")
        .call(yAxis);

    //     svg.selectAll("g")
    //         .data(dataset)
    //         .enter()
    //         .append("text")
    //         .text(function(d,i) { 
    //             // from http://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
    //             return parseFloat(Math.round(d.x * 100) / 100).toFixed(1);
    //         })
    //         .attr("x", function(d,i) { 
    //             return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
    //         })
    //         .attr("y", yBottom + 15)
    //         .attr("font-family", "sans-serif")
    //         .attr("font-fize", "11px")
    //         .attr("text-anchor", "middle");
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