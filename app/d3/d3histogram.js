'use strict';

var drawHistogram = function(d3, svg, scope, iElement, iAttrs, data) { 
    // remove all previous items before render
    svg.selectAll("*").remove();

    var width = scope.width,
        height = scope.height,
        dataset = scope.data,
        variableName = scope.variable;

    svg.attr("width", width)
       .attr("height", height);

    var margin = { top: 100, bottom: 30, left: 30, right: 30}

    var barPadding = 5,
        yBottom = height - margin.bottom,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right;

    var yScale = d3.scale.linear()
                    .domain([0, d3.max(dataset, function(d) { return d.y; })])
                    .range([yBottom, yTop]);

    var xScale = d3.scale.ordinal()
                    .domain(data.map(function(d) { return d.x; }))
                    .rangeRoundBands([xLeft, xRight], .1);

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

    // use of "text-anchor = middle", causes the text to center on the 
    // x location supplied (so we supply it the middle of the bar)
    bar.append("text")
        .text(function(d,i) { return d.y })
        .attr("y", function(d,i) { return yScale(d.y) - 5; })
        .attr("x", xScale.rangeBand() / 2)
        .attr("text-anchor", "middle")
        .attr("class", "bar-label");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickValues(data.map(function(d) { 
                        if(d >= 100)
                            return d3.round(d.x, 0);
                        else
                            return d3.round(d.x, 1); 
                    }));

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + yBottom + ")")
        .call(xAxis);

    var title = svg.append("g")
        .attr("class", "title")
        .attr("transform", "translate(0,30)")
        .attr("width", width);

    title.append("text")
        .text("Histogram of " + variableName)
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("class", "main-title");

    title.append("text")
        .text("Divided into 20 equal size buckets")
        .attr("transform", "translate(0, 20)")
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("class", "sub-title");
}

angular.module('d3').directive('d3Histogram', ['d3', function(d3) { 
    return {
        restrict: 'EA',
        scope: {
            data: '=',
            variable: '=', // binding to an angular object
            width: '@',    // static binding to a value
            height: '@'
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