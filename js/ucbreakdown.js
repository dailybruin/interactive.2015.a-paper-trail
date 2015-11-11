ucbreakdown = function(id, dataPath) {
  var margin = { x: 50, y: 55};
  var width = $('article').width()*2/3;
  var height = width + 30;
    
  var radius = (width - margin.x*2)/24;
  
  var color = d3.scale.ordinal()
    .range(["#609C92", "#77626D", "#E57A44"]);
  
  var svg = d3.select(id).append('svg')
                .attr("width", width)
                .attr("height", height);
  
  d3.json(dataPath, function(data) {
    var ucs = svg.selectAll('.uc')
                .data(data).enter()
                .append('rect')
                .attr('class', 'uc')
                .attr('x', 10)
                .attr('y', function(d,i) {
                  return 10 + 40*i;
                })
                .attr('width', 150)
                .attr('height', 35)
                .style('fill', function(d) { return color(d["law"]) });
    
    var labels = svg.selectAll('.ucLabel')   
                .data(data).enter()
                .append('text')
                .attr('class', 'ucLabel')
                .attr('x', 85)
                .attr('y', function(d,i) {
                  return 32 + 40*i;
                })
                .attr('text-anchor', 'middle')
                // .style('font-weight', 'bold')
                .style('fill', '#fdfdfd')
                .text(function(d) { return d["name"]; });
                
    var legend = svg.selectAll(".legend")
        .data(color.domain().sort())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 40 + ")"; });        
                      
    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; })
        .call(wrap, 150);
    
    var proposal = svg.append("text")
                      .attr("x", width - 14)
                      .attr("y", height - 70)
                      .attr("dy", ".35em")
                      .style("text-anchor", "end")
                      .text("Click to see Nelson's proposal.")
                      .call(wrap, 155)
                      .on("click", path);
    
    svg.append("rect")
        .attr("x", width - 164)
        .attr("y", height - 90)
        .attr("width", 160)
        .attr("height", 60)
        .style("stroke", "#609C92")
        .style("fill", "none")
        .on("click", path);
    
    function path() {
      svg.selectAll('.path').remove();
                    
      var path = svg.selectAll('.path')
                    .data(data).enter()
                    .append('path')
                    .filter(function(d) { return d.pathto })
                    .attr('d', function(d) {
                        return "M 160 " + (d.pathto*40 -10 ) + 
                                " Q 250 " + ((Math.abs((d.pathto*40)+(d.position*40)))/2-10) +
                                " 160 " + (d.position*40 -10 );
                    })
                    .style("stroke", "#fdfdfd")
                    .style("fill", "none")
                    .style("stroke-dasharray", 5);
      
      path.transition()
            .duration(1500)
            .delay(function(d,i) { return (i-1)*500; })
            .style("stroke", "#333");
      
      var proposalLegend = svg.append("text")
                        .attr("x", width - 14)
                        .attr("y", height - 150)
                        .attr("dy", ".35em")
                        .style("font-size", "0.9rem")
                        .style("text-anchor", "end")
                        .text("- Proposed way to share resources")
                        .call(wrap, 155)
                        .style("stroke", "#fdfdfd");
      proposalLegend.transition()
            .duration(750)
            .style("stroke", "#333");
    }
  })              
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
