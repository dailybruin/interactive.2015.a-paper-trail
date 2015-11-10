//uses abbreviation as key for data
uscartogram = function(id, dataPath, colorField, offset) {
  var margin = { x: 50, y: 55};
  var width = $(id).width();
  var height = (width-margin.x*2)*7/12 + margin.y*2 + margin.y*offset;
    
  var radius = (width - margin.x*2)/24;
  
  var color = d3.scale.ordinal()
    .range(["#FEC0AA", "#D0F1BF", "#95F9E3"]);
    
  var constants = ["name", "abbreviation", "row", "column", colorField];
  
  var svg = d3.select(id).append('svg')
                .attr("width", width)
                .attr("height", height);
  
  d3.json(dataPath, function(initialData) {
    var data = merge(initialData);

    var states = svg.selectAll('.state')
                      .data(data).enter()
                      .append('circle')
                      .attr('class', function(d,i) {
                        var className = "";
                        if (d[colorField]=="" || d[colorField] === undefined) {
                          className = "non";
                        }
                          
                        return 'state i' + i + " " + className;
                      })
                      .attr("r", radius-1)
                      .attr("cx", function(d) {
                        return (d.column-1) * radius * 2 + margin.x + radius;
                      })
                      .attr("cy", function(d) {
                        return (d.row-1) * radius * 2 + margin.y*(1+offset) + radius;
                      })
                      .style("fill", function(d) { 
                        if (d[colorField]=="")
                          return "lightgrey";
                        return color(d[colorField]); 
                      })
                      .on("mouseover", mouseover);
                      
    var abbrLabels = svg.selectAll('abbr')
                      .data(data).enter()
                      .append('text')
                      .attr('class', 'abbr')
                      .attr("text-anchor", "middle")
                      .text(function(d){ return d.abbreviation; })
                      .attr("x", function(d) {
                        return (d.column-1) * radius * 2 + margin.x + radius;
                      })
                      .attr("y", function(d) {
                        return (d.row-1) * radius * 2 + margin.y*(1+offset) + radius*1.3;
                      })
                      .on("mouseover", mouseover);

    var legend = svg.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });        
                      
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
        .text(function(d) { return d; });
    
    var more = svg.append("text")
              .attr("class", "more")
              .text("Hover for more details on each state.")
              .attr("x", margin.x)
              .attr("y", height-5);
  });
  
  var mouseout = function(d,i) {
    var circles = svg.selectAll('.state');
    circles.classed("hover", false);
    var more = svg.selectAll('.more')
                  .text('Hover for more details on each state.');
  }

  var mouseover = function(d,i) {
    var circles = svg.selectAll('.state');
    circles.classed("hover", false);
    var thisCircle = svg.selectAll('.state.i'+i);
    thisCircle.classed("hover", true);
    var more = svg.selectAll('.more')
                  .text(function() {
                    var text = d["name"] + " - ";
                    for (var prop in d) {
                      if (constants.indexOf(prop) == -1) {
                        text +=  prop + ': ' + d[prop] + ' ';
                      }
                    }
                    return text;
                  });
  }
}

function merge(data) {
  if (data) {
    data.forEach(function(d) {
      stateGrid.forEach(function(s) {
        if (d["abbreviation"] == s["abbreviation"]) {
          d["name"] = s["name"];
          d["row"] = s["row"];
          d["column"] = s["column"];
        }
      });
    });
    return data;
  } else {
    return stateGrid;
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

var stateGrid = [
  {
    "name": "Alaska",
    "abbreviation": "AK",
    "row": 1,
    "column": 1
  },
  {
    "name": "Maine",
    "abbreviation": "ME",
    "row": 1,
    "column": 12
  },
  {
    "name": "Washington",
    "abbreviation": "WA",
    "row": 2,
    "column": 2
  },
  {
    "name": "Idaho",
    "abbreviation": "ID",
    "row": 2,
    "column": 3
  },
  {
    "name": "Montana",
    "abbreviation": "MT",
    "row": 2,
    "column": 4
  },
  {
    "name": "North Dakota",
    "abbreviation": "ND",
    "row": 2,
    "column": 5
  },
  {
    "name": "Wisconsin",
    "abbreviation": "WI",
    "row": 3,
    "column": 7
  },
  {
    "name": "Minnesota",
    "abbreviation": "MN",
    "row": 2,
    "column": 6
  },
  {
    "name": "Michigan",
    "abbreviation": "MI",
    "row": 3,
    "column": 8
  },
  {
    "name": "Vermont",
    "abbreviation": "VT",
    "row": 2,
    "column": 10
  },
  {
    "name": "New Hampshire",
    "abbreviation": "NH",
    "row": 2,
    "column": 12
  },
  {
    "name": "Massachusetts",
    "abbreviation": "MA",
    "row": 2,
    "column": 11
  },
  {
    "name": "Oregon",
    "abbreviation": "OR",
    "row": 3,
    "column": 2
  },
  {
    "name": "Nevada",
    "abbreviation": "NV",
    "row": 3,
    "column": 3
  },
  {
    "name": "Wyoming",
    "abbreviation": "WY",
    "row": 3,
    "column": 4
  },
  {
    "name": "South Dakota",
    "abbreviation": "SD",
    "row": 3,
    "column": 5
  },
  {
    "name": "Iowa",
    "abbreviation": "IA",
    "row": 3,
    "column": 6
  },
  {
    "name": "Indiana",
    "abbreviation": "IN",
    "row": 4,
    "column": 7
  },
  {
    "name": "Ohio",
    "abbreviation": "OH",
    "row": 4,
    "column": 8
  },
  {
    "name": "Pennsylvania",
    "abbreviation": "PA",
    "row": 3,
    "column": 9
  },
  {
    "name": "New York",
    "abbreviation": "NY",
    "row": 3,
    "column": 10
  },
  {
    "name": "Connecticut",
    "abbreviation": "CT",
    "row": 3,
    "column": 11
  },
  {
    "name": "Rhode Island",
    "abbreviation": "RI",
    "row": 3,
    "column": 12
  },
  {
    "name": "California",
    "abbreviation": "CA",
    "row": 4,
    "column": 2
  },
  {
    "name": "Utah",
    "abbreviation": "UT",
    "row": 4,
    "column": 3
  },
  {
    "name": "Colorado",
    "abbreviation": "CO",
    "row": 4,
    "column": 4
  },
  {
    "name": "Nebraska",
    "abbreviation": "NE",
    "row": 4,
    "column": 5
  },
  {
    "name": "Missouri",
    "abbreviation": "MO",
    "row": 5,
    "column": 6
  },
  {
    "name": "Illinois",
    "abbreviation": "IL",
    "row": 4,
    "column": 6
  },
  {
    "name": "Kentucky",
    "abbreviation": "KY",
    "row": 5,
    "column": 8
  },
  {
    "name": "Maryland",
    "abbreviation": "MD",
    "row": 4,
    "column": 9
  },
  {
    "name": "Delaware",
    "abbreviation": "DE",
    "row": 4,
    "column": 10
  },
  {
    "name": "New Jersey",
    "abbreviation": "NJ",
    "row": 4,
    "column": 11
  },
  {
    "name": "Arizona",
    "abbreviation": "AZ",
    "row": 5,
    "column": 3
  },
  {
    "name": "New Mexico",
    "abbreviation": "NM",
    "row": 5,
    "column": 4
  },
  {
    "name": "Kansas",
    "abbreviation": "KS",
    "row": 5,
    "column": 5
  },
  {
    "name": "Arkansas",
    "abbreviation": "AR",
    "row": 6,
    "column": 6
  },
  {
    "name": "Tennessee",
    "abbreviation": "TN",
    "row": 6,
    "column": 8
  },
  {
    "name": "West Virginia",
    "abbreviation": "WV",
    "row": 5,
    "column": 9
  },
  {
    "name": "Virginia",
    "abbreviation": "VA",
    "row": 5,
    "column": 10
  },
  {
    "name": "North Carolina",
    "abbreviation": "NC",
    "row": 6,
    "column": 10
  },
  {
    "name": "Oklahoma",
    "abbreviation": "OK",
    "row": 6,
    "column": 5
  },
  {
    "name": "Louisiana",
    "abbreviation": "LA",
    "row": 7,
    "column": 7
  },
  {
    "name": "Mississippi",
    "abbreviation": "MS",
    "row": 5,
    "column": 7
  },
  {
    "name": "Alabama",
    "abbreviation": "AL",
    "row": 6,
    "column": 7
  },
  {
    "name": "Georgia",
    "abbreviation": "GA",
    "row": 7,
    "column": 8
  },
  {
    "name": "South Carolina",
    "abbreviation": "SC",
    "row": 6,
    "column": 9
  },
  {
    "name": "Hawaii",
    "abbreviation": "HI",
    "row": 7,
    "column": 1
  },
  {
    "name": "Texas",
    "abbreviation": "TX",
    "row": 7,
    "column": 5
  },
  {
    "name": "Florida",
    "abbreviation": "FL",
    "row": 7,
    "column": 9
  },
  {
    "name": "District of Columbia",
    "abbreviation": "DC",
    "row": 6,
    "column": 12
  }
]
