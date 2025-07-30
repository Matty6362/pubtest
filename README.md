# Pub Tool MMVP

**Pub Tool** is a mobile-first web application designed to onboard participants into a business-run raffle — typically for a food item, gift card, or other giveaway.

## 🎯 Purpose

This Minimum-Most-Viable-Product (MMVP) streamlines the process of capturing customer interest and participation via a branded, mobile-friendly experience.

## 🧑‍💼 Roles

- **Producer**: The business or person running the raffle.
- **End User**: The Producer's client, customer, or follower.

## 📱 How It Works

1. **QR Code Access**  
   The End User scans a QR code which links to the Producer's branded raffle page.

2. **Raffle Entry Page**  
   The page displays:
   - The Producer's branding
   - The name of the raffle
   - The drawing date
   - Two input fields:  
     - First Name  
     - Email Address  
   - A **Submit** button

3. **Submission Flow**
   - Upon submission:
     - The End User is taken to a confirmation page.
     - An automatic confirmation email is sent to the provided email address.
     - The submitted name and email are stored in a scalable cloud database.

4. **Future Easter Egg**
   - The current placeholder page ("green with letters like GO MATT GO") will eventually serve as an Easter egg within the app.

## 🧰 Stack

- **Frontend**: Mobile-first HTML/CSS/JS
- **Backend**: Node.js API
- **Database**: Supabase
- **Hosting**: Vercel

## 🚀 Goals

- Easy entry for participants
- Automated confirmation via email
- Clean, branded user experience for each Producer
- Scalable, secure data handling

--- 