// Main JavaScript File

// You'll have to wait for you page to load to assign events to the elements created in your index.html file
$(function() {
  // This function could help you format your data: lifted from the Plotly bubble map example:
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

  // Use d3.csv to read in your `data/Mass-Shooting-Data.csv` dataset: remember, you must be running a local server


    // Format your `data` object to pass to the plotly function. Make sure to set:
      // latitude (`lat`),
      // longitude(`lon`),
      // Marker attributes: size, color, opacity.
      // Tooltip information (which requires `text` and `hoverinfo`)


    // Declare your layout options to specify the title, projection and drawing specifications


    // Call your Plotly function

  });
});
