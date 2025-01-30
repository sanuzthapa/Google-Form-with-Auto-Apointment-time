function sendEmailOnFormSubmit(e) {
    // Get the spreadsheet where form responses are stored
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1"); // Adjust sheet name if needed
    
    // Count the number of rows (this includes the header row)
    const rowCount = sheet.getLastRow(); // Get the total number of rows including header
    
    // Get the submitted form data
    const formResponse = e.values;
    
    // Retrieve values based on your sheet's column indexes
    const name = formResponse[1]; // "Name" is in Column 2 (adjust as per your form structure)
    const email = formResponse[2]; // "Email" is in Column 3
    
    // Calculate the estimated time based on the user's group
    const baseHour = 18;
    const baseMinute = 10;
    
    // Calculate the 15-minute interval for every 10 users
    const groupNumber = Math.floor((rowCount - 1) / 10); // Determine group (0 for 1-10, 1 for 11-20, etc.)
    const estimatedMinute = baseMinute + (groupNumber * 15); // Increases by 15 minutes for each group
    
    // Handle cases where minutes go above 60 by adjusting the hour
    const adjustedHour = baseHour + Math.floor(estimatedMinute / 60);
    const adjustedMinute = estimatedMinute % 60;
    
    const estimatedTime = `${adjustedHour}h${adjustedMinute.toString().padStart(2, '0')}`;
    
    // Customize your email subject and message
    const subject = "Thank you for your submission at AGORA !";
    const message = `Hello ${name},\n\nThank you for filling out the form.\nYou are registered as user number ${rowCount}.\nYour estimated time is ${estimatedTime}.\n\nBest regards,\nTHAPA Sanuz`;
    
    // Send the email
    MailApp.sendEmail(email, subject, message);
}
