//stats: { "total": int, "desc": string, "fields": [{ "name": string, "count": int, "desc": string}]}
bythenumbers = function(id, count, stats) {
  
  var margin = { x: 50, y: 55};
  var width = $('article').width();
  var height = width*.65;
    
  var radius = 1;
  
  var step = 0;
  
  var svg = d3.select(id).append('svg')
      .attr("width", width)
      .attr("height", height);
  
  var per = stats["total"] / count;
  
  var data = [];
  
  for (var i = 0; i < count; i++) {
    data.push({});
  }
  
  data.forEach(function(d) {
    stats["fields"].forEach(function(f) {
        d[f["name"]] = f["count"] > 0;
        f["count"]=f["count"]-per;
    });
  });
  
  d3.shuffle(data);
  
  var numbers = svg.selectAll('.number')
      .data(data).enter()
      .append('circle')
      .attr('class', 'number')
      .attr('r', radius)
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
    switch (step%2) {
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
            .attr('cx', function(d,i) {
              return (i%120 + 1)*4;
            })
            .attr('cy', function(d,i) {
              return Math.ceil((i+1)/120)*4 + 50;
            });
        legend.transition()
            .duration(1500)
            .style('opacity', '1');
        break;
      case 1:
        var tCount = -1;
        var fCount = -1;
        var tCountB = -1;
        var fCountB = -1;
        numbers.transition()
                .duration(1500)
                .attr('cx', function(d,i) {
                  if(d[stats["fields"][0]["name"]]) {
                    tCount++;
                    return (tCount%120 + 1)*4;
                  } else {
                    fCount++;
                    return (fCount%120 + 1)*4;
                  }
                });
        numbers.transition()
                .delay(1500)
                .duration(1500)
                .attr('cy', function(d,i) {
                  if(d[stats["fields"][0]["name"]]) {
                    tCountB++;
                    return Math.ceil((tCountB+1)/120)*4 + 50;
                  } else {
                    fCountB++;
                    return Math.ceil((fCountB+1)/120)*4 + 60 + Math.ceil((tCount+1)/120)*(4);
                  }
                });
        break;
    }
    step++;

  };

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
