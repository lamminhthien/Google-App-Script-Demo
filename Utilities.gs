var Utilities = (function () {
  // Helper function to convert 2D array to JSON
  function convertToJson(data) {
    var headers = data[0];
    var jsonData = [];
    for (var i = 1; i < data.length; i++) {
      var row = {};
      for (var j = 0; j < headers.length; j++) {
        row[headers[j].toString().toLowerCase()] = data[i][j];
      }
      jsonData.push(row);
    }
    return jsonData;
  }

  return {
    convertToJson: convertToJson,
  };
})();
