countryoforigin = function(id) {
  var map = new Datamap({
    element: document.getElementById(id),
    setProjection: function(element) {
      var projection = d3.geo.mercator()
        .scale(150)
        .translate([element.offsetWidth / 2, element.offsetHeight / 5 * 3 ]);
      var path = d3.geo.path()
        .projection(projection);
      
      return {path: path, projection: projection};
    },
    geographyConfig: {
      popupTemplate: function(geography, data) {
          if (!data) return;
          return '<div class="hoverinfo"><h1>' + geography.properties.name + 
                  '</h1><p>Number of undocumented people: '+ data.numberOfThings + '</p>'+
                  '<p>Percent of undocumented people: '+ Math.round(data.numberOfThings/11430000*1000)/10 + '</p></div>';
        }
    },
    fills: {
              'Top ten countries of origin': 'rgb(171, 221, 164)',
              defaultFill: 'lightgrey'
          },
          data: {
              MEX: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 6720000
              },
              SLV: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 690000
              },
              GTM: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 560000
              },
              HND: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 360000
              },
              PHL: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 310000
              },
              IND: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 260000
              },
              CHN: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 230000
              },
              KOR: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 210000
              },
              ECU: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 170000
              },
              VNM: {
                  fillKey: 'Top ten countries of origin',
                  numberOfThings: 160000
              }
          }
  });
  map.arc([
    {
        origin: {
            latitude: 23,
            longitude: -102
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 13.83,
            longitude: -88.92
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 15.5,
            longitude: -90.25
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 15,
            longitude: -86.5
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 13,
            longitude: 122
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 20,
            longitude: 77
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 37,
            longitude: 127.5
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 35,
            longitude: 105
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: -2,
            longitude: -77.5
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    },
    {
        origin: {
            latitude: 16.16,
            longitude: 107.83
        },
        destination: {
            latitude: 39.828,
            longitude: -98.579
        }
    }
  ],  {strokeWidth: 1, arcSharpness: 1.4});

  map.legend();
}
