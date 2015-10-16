$(document).ready(function() {
  var cfg = {
      id: '#timeline',
      width: 180,
      height: $('article').height(),
      dateFormat: "%Y/%m/%d %H:%M:%S",
      radius: 10
    };
  
  var svg = d3.select(cfg.id).append('svg')
                .attr("width", cfg.width)
                .attr("height", cfg.height);
  
  svg.append("line")
      .attr("y1", 0)
      .attr("x1", cfg.radius+5)
      .attr("y2", cfg.height)
      .attr("x2", cfg.radius+5)
      .style("stroke", "#777")
      .style("stroke-width", "2");
  
  d3.json('../../data/timeline.json', function (data) {
    
    var circles = svg.selectAll('circle')
                      .data(data).enter()
                      .append('circle')
                      .attr("r", cfg.radius)
                      .attr("cx", cfg.radius+5)
                      .attr("cy", function(d, i) {
                        return (i+0.5) / data.length * cfg.height ;
                      })
                      .on("mouseover", function() {
                        d3.select(this).attr("class", "hover");
                      })
                      .on("mouseout", function() {
                        d3.select(this).attr("class", "circle");
                      })
                      .on("click", click); 

    var dates = svg.selectAll('.date')
                      .data(data).enter()
                      .append('text')
                      .attr('class', 'date')
                      .text( function(d) { return d.date; })
                      .attr("x", cfg.radius+15)
                      .attr("y", function(d, i) {
                        return (i+0.5) / data.length * cfg.height + 30;
                      })
                      .on("click", click);     
                                      
    var titles = svg.selectAll('.title')
                          .data(data).enter()
                          .append('text')
                          .attr('class', 'title')
                          .text( function(d) { return d.title; })
                          .attr("x", cfg.radius+15)
                          .attr("y", function(d, i) {
                            return (i+0.5) / data.length * cfg.height + 50;
                          })
                          .on("click", click);
                          
    var descriptions = svg.selectAll('.description')
                          .data(data).enter()
                          .append('text')
                          .attr('class', function(d,i) {
                            return 'description i' + i;
                          })
                          .text( function(d) { return d.description; })
                          .attr("x", cfg.radius+15)
                          .attr("y", function(d, i) {
                            return (i+0.5) / data.length * cfg.height + 70;
                          })
                          .attr("dy", 0)
                          .call(wrap, 160)
                          .on("click", click);
    
  });
  
  var click = function(d,i) { 
    var thisCircle = d3.selectAll('.description.i'+i);
    thisCircle.classed("show", !thisCircle.classed("show"));
  };
  
  function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          x = text.attr("x"),
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
})
