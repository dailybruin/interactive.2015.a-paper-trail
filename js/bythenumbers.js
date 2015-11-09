//stats: { "total": int, "desc": string, "fields": [{ "name": string, "count": int, "desc": string}]}
bythenumbers = function(id, count, stats) {
  
  var margin = { x: 50, y: 55};
  var width = $('article').width();
  var height = width*.65;
    
  var radius = 2,
      step = 0,
      columns = 80,
      spacing = 6
      wspacing = 9.9;
  
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
  
  var numbers = svg.selectAll('.number')
      .data(data).enter()
      .append('circle')
      .attr('class', 'number')
      .attr('r', radius-0.5)
      .attr('cx', function(d,i) {
        return (i%columns + 1)*wspacing;
      })
      .attr('cy', function(d,i) {
        return Math.ceil((i+1)/columns)*(wspacing-2.5) + 50;
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
      .text("Each one of these dots represents "+per+" undocumented people, rounded to the next "+per)
      .call(wrap, 230);
  
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
    switch (step%(properties.length+2)) {
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
              return (i%columns + 1)*spacing;
            })
            .attr('cy', function(d,i) {
              return Math.ceil((i+1)/columns)*spacing + 50;
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
                            .text('There are approximately 11.43 million undocumented people in the ' + 
                                  'United States. That is '+columns+' columns and '+Math.round(count/columns*10)/10+
                                  ' rows of dots – '+count+' total, with each dot representing '+per+' people.')
                            .call(wrap, 250);
        description.transition()
            .duration(1500)
            .style('opacity', 1);
            
        break;
      case properties.length+1:
        numbers.transition()
          .duration(1500)
          .attr('cx', function(d,i) {
            return (i%columns + 1)*wspacing;
          })
          .attr('cy', function(d,i) {
            return Math.ceil((i+1)/columns)*(wspacing-2.5) + 50;
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
        break;
      default:
        breakdown(step%(properties.length+2)-1);
        break;
    }
    step++;

  };

  function breakdown(index) {
    var color = d3.scale.category20();
    var counts = properties[index];
    numbers.transition()
            .duration(1000)
            .attr('cx', function(d,i) {
              for (var prop in counts) {
                if(d[stats["fields"][index]["name"]]==prop) {
                  counts[prop]++;
                  return (counts[prop]%columns + 1)*spacing;
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
                if(d[stats["fields"][index]["name"]]==prop) {
                  counts[prop]--;
                  var offset = propCount == 0 ? 0 : Math.ceil((totalCount+1)/columns)*spacing + 7.5*propCount;
                  return Math.ceil(((totals[prop]-counts[prop]))/columns)*spacing + 50 + offset;
                }
                propCount++;
                totalCount += totals[prop];
              }
            })
            .style('fill', function(d) { return color(d[stats["fields"][index]["name"]]); });
    
    svg.selectAll('.description').remove();
    var description = svg.append('text')
                        .attr('class', 'description')
                        .attr("x", width - 260)
                        .attr("y", height/5*3)
                        .attr("dy", ".35em")
                        .style('opacity', 0)
                        .text(stats["fields"][index]["desc"])
                        .call(wrap, 250);
    description.transition()
        .duration(1500)
        .style('opacity', 1);           
    
    svg.selectAll('.colorLegend').remove();                            
    var colorLegend = svg.selectAll(".colorLegend")
        .data(color.domain().sort())
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
