// This function handles GET requests
function doGet(e) {
  var action = e.parameter.action;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  if (action == 'read') {
    return readData(sheet);
  } else {
    return ContentService.createTextOutput("Invalid action").setMimeType(ContentService.MimeType.TEXT);
  }
}

// This function handles POST requests
function doPost(e) {
  var action = e.parameter.action;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  if (action == 'add') {
    return addData(e, sheet);
  } else {
    return ContentService.createTextOutput("Invalid action").setMimeType(ContentService.MimeType.TEXT);
  }
}

// Function to read data from the sheet and return as JSON
function readData(sheet) {
  var data = sheet.getDataRange().getValues();
  var jsonData = convertToJson(data);
  return ContentService.createTextOutput(JSON.stringify(jsonData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Improved function to add data to the sheet
function addData(e, sheet) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var newRow = [];
  
  // Find the "Name" column (case-insensitive)
  var nameColumnIndex = headers.findIndex(header => header.toString().toLowerCase() === 'name');
  
  if (nameColumnIndex === -1) {
    return ContentService.createTextOutput("Error: 'Name' column not found").setMimeType(ContentService.MimeType.TEXT);
  }
  
  // Prepare the new row data
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i].toString().toLowerCase();
    newRow[i] = e.parameter[header] || ''; // Use empty string if parameter is not provided
  }
  
  // Add the new row to the sheet
  sheet.appendRow(newRow);
  
  return ContentService.createTextOutput("Data added successfully").setMimeType(ContentService.MimeType.TEXT);
}

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