const express = require('express');
const bodyParser = require('body-parser');
const turf = require('@turf/turf');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// Middleware function for header-based auth check
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'YOUR_AUTH_TOKEN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Route to find intersections
app.post('/findIntersections', authenticate, (req, res) => {
  try {
    // Extract the Long LineString and scattered lines from the request body
    const { longLinestring, scatteredLines } = req.body;

    // Convert Long LineString to Turf.js LineString
    const longLineString = turf.lineString(longLinestring.coordinates);

    // Convert scattered lines to Turf.js FeatureCollection of LineStrings
    const scatteredLinesFeatures = scatteredLines.map(line => turf.lineString(line.coordinates));
    const scatteredLinesFeatureCollection = turf.featureCollection(scatteredLinesFeatures);

    // Find intersections between the Long LineString and scattered lines
    const intersections = turf.lineIntersect(longLineString, scatteredLinesFeatureCollection);

    if (intersections.features.length === 0) {
      // No intersections found
      res.json([]);
    } else {
      // Extract intersecting line IDs and points of intersection
      const intersectingLines = intersections.features.map(intersection => ({
        id: intersection.properties.id,
        point: intersection.geometry.coordinates,
      }));
      res.json(intersectingLines);
      console.log("fetched");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
    console.log(`server started on port ${PORT}`);
});
