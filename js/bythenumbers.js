//stats: { "total": int, "desc": string, "fields": [{ "name": string, "count": int, "desc": string}]}
bythenumbers = function(id, count, stats) {
  
  var margin = { x: 50, y: 55};
  var width = $('article').width();
  var height = width*.65;
    
  var radius = 1.5;
  
  var step = 0;
  
  var color = d3.scale.ordinal()
    .range(["#FEC0AA", "#D0F1BF", "#95F9E3"]);
  
  var svg = d3.select(id).append('svg')
      .attr("width", width)
      .attr("height", height);
  
  var per = stats["total"] / count;
  
  var data = [];
  
  var properties = [];
  
  stats["fields"].forEach(function(f) {
    var temp = {};
    for (var prop in f["counts"]) {
      temp[prop] = -1;
    }
    properties.push(temp);
  });
  
  for (var i = 0; i < count; i++) {
    var temp = {};
    stats["fields"].forEach(function(f) {
      for (var prop in f["counts"]) {
        if (f["counts"][prop] > 0) {
          temp[f["name"]] = prop;
          f["counts"][prop]-=per;
          break;
        }
      }
    });
    data.push(temp);
  }
  
  
  d3.shuffle(data);
  console.log(data);
  
  var numbers = svg.selectAll('.number')
      .data(data).enter()
      .append('circle')
      .attr('class', 'number')
      .attr('r', radius-0.5)
      .attr('cx', function(d,i) {
        return (i%120 + 1)*7;
      })
      .attr('cy', function(d,i) {
        return Math.ceil((i+1)/120)*4 + 50;
      })
      .style('fill', '#5B5B5B');
  
  var legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; })
      .style('opacity', 0);        
                    
  legend.append("circle")
      .attr("cx", width - 250)
      .attr("cy", 12)
      .attr("r", radius)
      .style("fill", "grey");
  
  legend.append("circle")
      .attr("cx", width - 250)
      .attr("cy", 12)
      .attr("r", 5)
      .style("stroke", "grey")
      .style("fill", "none");

  legend.append("text")
      .attr("x", width - 240)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text("Each one of these dots represents 1000 undocumented people, rounded to the next 1000")
      .call(wrap, 250);
  
  var nextRect = svg.append('rect')
      .attr('x', width/2-20)
      .attr('y', height/2-45)
      .attr('width', 50)
      .attr('height', 30)
      .attr('class', 'next')
      .style('fill', 'white')
      .style('stroke', '#444')
      .on('click', click);
                    
  var next = svg.append('path')
      .attr('d', 'M-30,-30L30,0L-30,30Z')
      .attr('class', 'next')
      .attr('fill', '#444')
      .attr('transform', 'translate('+(width/2+6)+','+(height/2-30)+')scale(.3)')
      .attr('class', 'next')
      .on('click', click);                                 

  function click() {
    switch (step%3) {
      case 0:
        nextRect.transition()
            .duration(1000)
            .attr('x', width-57)
            .attr('y', height-45);
        next.transition()
            .duration(1000)
            .attr('transform', 'translate('+(width-30)+','+(height-30)+')scale(.3)');
        numbers.transition()
            .duration(1500)
            .attr('r', radius)
            .attr('cx', function(d,i) {
              return (i%120 + 1)*4;
            })
            .attr('cy', function(d,i) {
              return Math.ceil((i+1)/120)*4 + 50;
            });
        legend.transition()
            .duration(1500)
            .style('opacity', '1');
            
        var description = svg.append('text')
                            .attr('class', 'description')
                            .attr("x", width - 260)
                            .attr("y", height/2)
                            .attr("dy", ".35em")
                            .style('opacity', 0)
                            .text('There are approximately 11.4 million undocumented people in the ' + 
                                  'United States. That is 120 columns times 95 rows times 1000 people ' +
                                  'per dot.')
                            .call(wrap, 250);
        description.transition()
            .duration(1500)
            .style('opacity', 1);
            
        break;
      case 1:
        breakdown();
        break;
      case 2:
        numbers.transition()
          .duration(1500)
          .attr('cx', function(d,i) {
            return (i%120 + 1)*7;
          })
          .attr('cy', function(d,i) {
            return Math.ceil((i+1)/120)*4 + 50;
          })
          .attr('r', radius-0.5)
          .style('fill', '#5B5B5B');
        legend.transition()
            .duration(1500)
            .style('opacity', '0');
        nextRect.transition()
            .duration(1000)
            .attr('x', width/2-20)
            .attr('y', height/2-45)
        next.transition()
            .duration(1000)
            .attr('transform', 'translate('+(width/2+6)+','+(height/2-30)+')scale(.3)');
        
        svg.selectAll(".colorLegend").remove();
        svg.selectAll(".description").remove();
    }
    step++;

  };

function breakdown() {
  var counts = properties[0];
  numbers.transition()
          .duration(1000)
          .attr('cx', function(d,i) {
            for (var prop in counts) {
              if(d[stats["fields"][0]["name"]]==prop) {
                counts[prop]++;
                return (counts[prop]%120 + 1)*4;
              }
            }
          });
  var totals = jQuery.extend({}, counts);
  numbers.transition()
          .delay(1000)
          .duration(1000)
          .attr('cy', function(d,i) {
            var propCount = 0;
            var totalCount = 0;
            for (var prop in counts) {
              if(d[stats["fields"][0]["name"]]==prop) {
                counts[prop]--;
                var offset = propCount == 0 ? 0 : Math.ceil((totalCount+1)/120)*4 + 7.5*propCount;
                return Math.ceil(((totals[prop]-counts[prop]))/120)*4 + 50 + offset;
              }
              propCount++;
              totalCount += totals[prop];
            }
            if(d[stats["fields"][0]["name"]]) {
              tCountB++;
              return Math.ceil((tCountB+1)/120)*4 + 50;
            } else {
              fCountB++;
              return Math.ceil((fCountB+1)/120)*4 + 60 + Math.ceil((tCount+1)/120)*(4);
            }
          })
          .style('fill', function(d) { return color(d[stats["fields"][0]["name"]]); });
  
  var description = svg.selectAll('.description')
                      .transition()
                      .duration(1000)
                      .style('opacity', 0);
  description.transition()
              .delay(1000)
              .duration(1000)
              .style('opacity', 1)
              .text(stats["fields"][0]["desc"]);              
                              
  var colorLegend = svg.selectAll(".colorLegend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "colorLegend")
      .attr("transform", function(d, i) { return "translate(0," + (i * 20 + 75) + ")"; });        
                    
  colorLegend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  colorLegend.append("text")
      .attr("class", "colorLegendText")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });
}

}

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
