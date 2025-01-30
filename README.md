# Google Automated Form Designed for AGORA (Free Food Distribution Service for Students)

## 👋 Hi there, I'm **Sanuz Thapa**

### 🎓 Behavioral Economics & Data Science Student at UFC, Besançon

---

## 🔍 Project Overview

L'AGORA (FAGE), a food distribution service for students at subsidized prices in Besançon, is an organization dedicated to student welfare, particularly for those struggling financially. It distributes subsidized food every Wednesday at the university premises (UMLP, formerly known as the University of Franche-Comté).  

Most students register at **16h30** through an online form and arrive at the distribution center at **18h00**, often unaware of when their number will be called. This leads to congestion and overcrowding at the premises.

To address this issue, I designed a system using **Google Scripts** that automates:
- Sending confirmation messages after registration.
- Allocating estimated time slots for students based on their registration sequence.
- Informing students of their registration number and expected time to collect food.

This system aims to **reduce crowding** and **help students plan their schedules efficiently**, preventing long waiting times (which can sometimes extend up to **2 hours** 😃).
<br>
**Form Link** : <br>
https://docs.google.com/forms/d/e/1FAIpQLSdpuPvaYreq33AZ-r2tXcU3xjppZnGAUROlI5g7ygBt9sHxZA/viewform?usp=sf_link
---

## 🚀 Features

- **User Registration Through Google Form**: Students can register via a Google Form.
- **Automatic Time Allocation**: The system assigns estimated collection times based on registration order.
- **Registration Confirmation**: All registered users receive a confirmation message with their allocated time.

---

## 📂 Table of Contents

1. [Introduction](#introduction)
2. [Google Forms](#google-forms)
3. [Response Handling](#response-handling)
4. [JavaScript (Google Script Code)](#js-code)
5. [Code Breakdown](#code-breakdown)
6. [Conclusion](#conclusion)

---

## 📌 Introduction

In this section, we will discuss the need for automating the student registration and food distribution process at AGORA. The challenges faced due to manual registration and unstructured arrival times will be highlighted.

## 📝 Google Forms

A Google Form is used for student registration. It collects essential details such as:
- **Student Name**
- **Email Address**
- **Registration Time[autofilled]** 
- **Registerd Number[autofilled]**
- ![ScoreBoard](https://github.com/sanuzthapa/Google-Form-with-Auto-Apointment-time/blob/main/assets/fill_form.png)

## 📊 Response Handling

Google Sheets stores all form responses, and a Google Script processes the data. The script assigns each student a number and an estimated collection time based on the sequence of registrations.
![ScoreBoard](https://github.com/sanuzthapa/Google-Form-with-Auto-Apointment-time/blob/main/assets/users.png)

## 🖥️ JavaScript (Google Script Code)

The Google Apps Script automates the entire process. It:
- Extracts form responses from Google Sheets.
- Assigns sequential numbers to students.
- Calculates estimated collection times.
- Sends confirmation emails with registration details.

```javascript
function sendEmailOnFormSubmit(e) {
    // Get the spreadsheet where form responses are stored
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1"); // Adjust sheet name if needed
    
    // Count the number of rows (this includes the header row)
    const rowCount = sheet.getLastRow(); // Get the total number of rows including header
    
    // Get the submitted form data
    const formResponse = e.values;
    
    // Retrieve values based on your sheet's column indexes
    const name = formResponse[1]; // "Name" is in Column 2
    const email = formResponse[2]; // "Email" is in Column 3
    
    // Calculate the estimated time based on the user's group
    const baseHour = 18;
    const baseMinute = 10;
    
    // Calculate the 15-minute interval for every 10 users
    const groupNumber = Math.floor((rowCount - 1) / 10); // Determine group (0 for 1-10, 1 for 11-20, etc.)
    const estimatedMinute = baseMinute + (groupNumber * 10); // Increases by 10 minutes for each group
    
    // Handle cases where minutes go above 60 by adjusting the hour
    const adjustedHour = baseHour + Math.floor(estimatedMinute / 60);
    const adjustedMinute = estimatedMinute % 60;
    
    const estimatedTime = `${adjustedHour}h${adjustedMinute.toString().padStart(2, '0')}`;
    
    // Customize your email subject and message
    const subject = "Thank you for your submission at AGORA !";
    const message = `Hello ${name},\n\nThank you for filling out the form.\nYou are registered as user number ${rowCount}.\nYour estimated time is ${estimatedTime}.\n\nBest regards,\nTHAPA Sanuz`;
    
    // Send the email
    MailApp.sendEmail(email, subject, message);
}}
```

## 🔍 Code Breakdown

1. **Fetching Google Sheets Data**: The script retrieves responses from the Google Sheet.
2. **Assigning Time Slots**: Each group of Students (1-10,11-20,21-30,...) are assigned a 10-minute slot based on their registration sequence groups.
3. **Sending Emails**: Google Apps Script uses `MailApp.sendEmail()` to notify students of their registration details, allocated time and Sequence in Registration.

## 🎯 Conclusion

This automated system effectively streamlines the **AGORA food distribution process**, reducing congestion and **improving student experience**. By implementing time-based slots and confirmation emails, students can better plan their schedules, making the distribution process smoother and more efficient.
![ScoreBoard](https://github.com/sanuzthapa/Google-Form-with-Auto-Apointment-time/blob/main/assets/final.png)

---

💡 **Future Improvements**:
- Implement SMS notifications.
- Allow students to reschedule their time slots.
- Develop a real-time tracking system to update students on wait times.
---
## 🔧 Tools & Technologies

- **Languages**: JavaScript (Google Apps Script), Google Forms
- **Platforms**: Google forrms, GoogleSheets.
- **Hosting**: Normal Gmail for Sending automated Response.

---

## 💌 Connect with Me

- 📧 Email: [sanuzh.thapa@gmail.com](mailto:sanuzh.thapa@gmail.com)
- 🌐 LinkedIn: [Sanuz Thapa](https://linkedin.com/in/sanuz-thapa)
