//stats: { "total": int, "desc": string, "fields": [{ "name": string, "count": int, "desc": string}]}
bythenumbers = function(id, count, stats) {
  
  var margin = { x: 50, y: 55};
  var width = $('article').width();
  var height = width/2.5;
    
  var radius = 5;
  
  var svg = d3.select(id).append('svg')
                .attr("width", width)
                .attr("height", height);
  
  var per = stats["total"] / count;
  
  var data = new Array(count);
  
  data.forEach(function(d) {
    stats["fields"].forEach(function(f) {
        d[f["name"]] = f["count"] > 0;
        f["count"]--;
    });
  });
  
  var numbers = svg.selectAll('.number')
                    .data(data).enter()
                    .append('circle')
                    .attr('class', 'number')
                    .attr('r', radius)
                    .attr('cx', function(d,i) {
                      return Math.ceil((i+1)/10)*15;
                    })
                    .attr('cy', function(d,i) {
                      return (i%10 + 1)*15;
                    })
                    .style('fill', '#5B5B5B')
                    .on('click', clickNext);
  
  var nextRect = svg.append('rect')
                    .attr('x', width-100)
                    .attr('y', height-45)
                    .attr('width', 50)
                    .attr('height', 30)
                    .attr('class', 'next')
                    .style('fill', 'transparent')
                    .style('stroke', 'black')
                    .on('click', function() {clickNext(svg)});
                    
  var next = svg.append('text')
                  .text('next')
                  .attr('x', width-75)
                  .attr('y', height-25)
                  .attr("text-anchor", "middle")
                  .attr('class', 'next')
                  .on('click', function() {clickNext(svg)});                
                    
}

var clickNext = function (svg) {
  var numbers = svg.selectAll('.number');
  
  numbers.transition()
          .duration(1500)
          .attr('cx', function(d,i) {
            return '' + (parseInt(d3.select(this).attr('cx')) + 50);
          })
};
