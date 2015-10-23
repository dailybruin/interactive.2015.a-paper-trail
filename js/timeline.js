$(document).ready(function() {
  
  var cfg = {
      id: '#timeline',
      width: 180,
      height: $('article.post').innerHeight()*0.75,
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
    
    data.sort(function(a,b) { return a.year - b.year; });
    
    var circles = svg.selectAll('circle')
                      .data(data).enter()
                      .append('circle')
                      .attr('class', function(d,i) {
                        return 'circle i' + i;
                      })
                      .attr("r", cfg.radius)
                      .attr("cx", cfg.radius+5)
                      .attr("cy", function(d, i) {
                        return (i+0.3) / data.length * (cfg.height-60) + 50;
                      })
                      .on("mouseover", mouseover)
                      .on("mouseout", mouseout)
                      .on("click", click); 

    var dates = svg.selectAll('.date')
                      .data(data).enter()
                      .append('text')
                      .attr('class', 'date')
                      .text( function(d) { return moment(d.year, 'YYYY').format('YYYY'); })
                      .attr("x", cfg.radius+15)
                      .attr("y", function(d, i) {
                        return (i+0.3) / data.length * (cfg.height-60) + 80;
                      })
                      .on("mouseover", mouseover)
                      .on("mouseout", mouseout)
                      .on("click", click);     
                                      
    var titles = svg.selectAll('.title')
                          .data(data).enter()
                          .append('text')
                          .attr('class', function(d,i) {
                            return 'title i' + i;
                          })
                          .text( function(d) { return d.name; })
                          .attr("x", cfg.radius+15)
                          .attr("y", function(d, i) {
                            return (i+0.3) / data.length * (cfg.height-60) + 100;
                          })
                          .attr("dy", 0)
                          .call(wrap, 160)
                          .on("mouseover", mouseover)
                          .on("mouseout", mouseout)
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
                            var offset = ($('.title.i'+i+' tspan').length-1) * 15;
                            return (i+0.3) / data.length * (cfg.height-60) + 120 + offset;
                          })
                          .attr("dy", 0)
                          .call(wrap, 160)
                          .on("mouseover", mouseover)
                          .on("mouseout", mouseout)
                          .on("click", click);
                          
    var tags = svg.selectAll('.tag')
                          .data(data).enter()
                          .append('text')
                          .attr('class', function(d,i) {
                            return 'tag i' + i;
                          })
                          .text( function(d) { return d.tag; })
                          .attr("x", cfg.radius+15)
                          .attr("y", function(d, i) {
                            var offset = ($('.title.i'+i+' tspan').length-1) * 15;
                            offset += ($('.description.i'+i+' tspan').length-1) * 15;
                            return (i+0.3) / data.length * (cfg.height-60) + 130 + offset;
                          })
                          .attr("dy", 0)
                          .call(wrap, 160)
                          .on("mouseover", mouseover)
                          .on("mouseout", mouseout)
                          .on("click", click);

    var title = svg.append('text')
                          .attr('class', 'title')
                          .text("A Quick Look at Significant Legislation and Executive Action on Immigration and Undocumented Individuals")
                          .attr("x", cfg.radius+15)
                          .attr("y", 20)
                          .attr("dy", 0)
                          .call(wrap, 160);
    
    var attribution = svg.append('text')
                          .attr('class', 'attr')
                          .text("Compiled with information from Hiroshi Motomura’s Immigration Outside the Law, the National Immigration Law Center, and the Cornell Legal Information Institute")
                          .attr("x", cfg.radius+15)
                          .attr("y", cfg.height-80)
                          .attr("dy", 0)
                          .call(wrap, 160);
  });
  
  var mouseout = function(d,i) {
    var thisCircle = d3.selectAll('.circle.i'+i);
    thisCircle.classed("hover", false);
  }
  
  var mouseover = function(d,i) {
    var thisCircle = d3.selectAll('.circle.i'+i);
    thisCircle.classed("hover", true);
  }
  
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
