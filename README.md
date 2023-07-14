
api will find which of the 50 lines with ids (L01 - L50) intersect with the linestring.

To test api in postman :
use a post request in postman.
then use this link http://localhost:3000/findIntersections.
in header - content-Type and vale - application.json
in body request use this format :
{
    "longLinestring": {
      "type": "LineString",
      "coordinates": [
        [-96.79512, 32.77823],
      [-96.79469, 32.77832],
      [-96.79433, 32.77728],
      [-96.79424, 32.77715],
      [-96.79398, 32.77689],
      [-96.7932, 32.77625],
      [-96.79245, 32.7756]
        
      ]
    },
    "scatteredLines": [
      {
        "type": "LineString",
        "coordinates": [
          [-74.0386542, 40.7302174],
          [-74.038756, 40.7295611]
          
        ]
      },
      {
        "type": "LineString",
        "coordinates": [
          [-74.061602, 40.705933],
          [-74.06214, 40.706563]
          
        ]
      }
      
    ]
  }
  
