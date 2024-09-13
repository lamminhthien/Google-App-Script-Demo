var DataOperations = (function () {
  // Function to read data from the sheet and return as JSON
  function readData(sheet) {
    var data = sheet.getDataRange().getValues();
    var jsonData = Utilities.convertToJson(data);
    return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(ContentService.MimeType.JSON);
  }

  // Function to add data to the sheet with automatic column creation
  function addData(e, sheet) {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var newRow = new Array(headers.length).fill(""); // Initialize with empty strings
    var newHeaders = [];

    // Process existing headers and new data
    for (var key in e.parameter) {
      if (key !== "action") {
        var headerIndex = headers.findIndex((header) => header.toString().toLowerCase() === key.toLowerCase());
        if (headerIndex === -1) {
          // New column
          newHeaders.push(key);
          headers.push(key);
          newRow.push(e.parameter[key]);
        } else {
          // Existing column
          newRow[headerIndex] = e.parameter[key];
        }
      }
    }

    // Add new headers if any
    if (newHeaders.length > 0) {
      var lastColumn = sheet.getLastColumn();
      sheet.getRange(1, lastColumn + 1, 1, newHeaders.length).setValues([newHeaders]);
    }

    // Add the new row to the sheet
    sheet.appendRow(newRow);

    return ContentService.createTextOutput(
      JSON.stringify({
        message: "Data added successfully",
        newColumns: newHeaders,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return {
    readData: readData,
    addData: addData,
  };
})();
