bythenumbers = function(id) {
  var margin = { x: 50, y: 55};
  var width = $('article').width();
  var height = (width-margin.x*2)*7/12 + margin.y*2;
    
  var radius = (width - margin.x*2)/24;
  
  var colors = ["#FEC0AA", "#D0F1BF", "#95F9E3"];
  
  var color = d3.scale.ordinal()
    .range(["#FEC0AA", "#D0F1BF", "#95F9E3"]);
    
  var constants = ["name", "abbreviation", "row", "column", colorField];
  
  var svg = d3.select(id).append('svg')
                .attr("width", width)
                .attr("height", height);
  
  
}
