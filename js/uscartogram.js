uscartogram = function(id, initialData) {
  var margin = { x: 50, y: 20};
  var width = $('article.post').width();
  var height = (width-margin.x*2)*7/12 + margin.y*2;
    
  var radius = (width - margin.x*2)/24;
  
  var data = merge(initialData);
  console.log(data);
  var svg = d3.select(id).append('svg')
                .attr("width", width)
                .attr("height", height);
  console.log(svg);
  var states = svg.selectAll('.state')
                    .data(data).enter()
                    .append('circle')
                    .attr('class', 'state')
                    .attr("r", radius)
                    .attr("cx", function(d) {
                      return (d.column-1) * radius * 2 + margin.x + radius;
                    })
                    .attr("cy", function(d) {
                      return (d.row-1) * radius * 2 + margin.y + radius;
                    });
}

function merge(data) {
  if (data) {
    data.forEach(function(d) {
      stateGrid.forEach(function(s) {
        if (d["abbreviation"] == state["abbreviation"]) {
          d["name"] = state["name"];
          d["row"] = state["row"];
          d["column"] = state["column"];
        }
      });
    });
    return data;
  } else {
    return stateGrid;
  }  
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
    "name": "Minnesota",
    "abbreviation": "MN",
    "row": 2,
    "column": 6
  },
  {
    "name": "Wisconsin",
    "abbreviation": "WI",
    "row": 2,
    "column": 7
  },
  {
    "name": "Michigan",
    "abbreviation": "MI",
    "row": 2,
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
    "column": 11
  },
  {
    "name": "Massachusetts",
    "abbreviation": "MA",
    "row": 2,
    "column": 12
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
    "row": 3,
    "column": 7
  },
  {
    "name": "Ohio",
    "abbreviation": "OH",
    "row": 3,
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
    "row": 4,
    "column": 6
  },
  {
    "name": "Illinois",
    "abbreviation": "IL",
    "row": 4,
    "column": 7
  },
  {
    "name": "Kentucky",
    "abbreviation": "KY",
    "row": 4,
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
    "row": 5,
    "column": 6
  },
  {
    "name": "Tennessee",
    "abbreviation": "TN",
    "row": 5,
    "column": 7
  },
  {
    "name": "West Virginia",
    "abbreviation": "WV",
    "row": 5,
    "column": 8
  },
  {
    "name": "Virginia",
    "abbreviation": "VA",
    "row": 5,
    "column": 9
  },
  {
    "name": "North Carolina",
    "abbreviation": "NC",
    "row": 5,
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
    "row": 6,
    "column": 6
  },
  {
    "name": "Mississippi",
    "abbreviation": "MS",
    "row": 6,
    "column": 7
  },
  {
    "name": "Alabama",
    "abbreviation": "AL",
    "row": 6,
    "column": 8
  },
  {
    "name": "Georgia",
    "abbreviation": "GA",
    "row": 6,
    "column": 9
  },
  {
    "name": "South Carolina",
    "abbreviation": "SC",
    "row": 6,
    "column": 10
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
    "column": 10
  }
]
