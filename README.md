# Pub Tool MMVP - Raffle System

A complete raffle entry system with email confirmations and database storage.

## 🎉 Status: Fully Deployed and Connected!

- ✅ **Frontend**: Live on Vercel
- ✅ **Backend**: Node.js/Express API  
- ✅ **Database**: Supabase with RLS security
- ✅ **Email**: Resend integration with `noreply@nubthing.com`
- ✅ **Git**: Connected to GitHub with auto-deployments
- ✅ **Domain**: Ready for `kelleysboston.com` setup

## Features

- ✅ Raffle entry form with name and email collection
- ✅ Confirmation page displaying user's name and email
- ✅ Database storage in Supabase
- ✅ Email confirmations via Resend
- ✅ Mobile-responsive design
- ✅ Real-time form validation

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Resend API Configuration
RESEND_API_KEY=your_resend_api_key_here

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL script from `supabase-setup.sql` to create the `raffle_entries` table
4. Copy your project URL and anon key from Settings > API

### 3. Resend Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Generate an API key from the dashboard
3. **Important**: Verify your domain in Resend or use a verified sender address

### 4. Installation

```bash
npm install
```

### 5. Local Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 6. Deployment

Deploy to Vercel:

```bash
vercel --prod
```

## Database Schema

The `raffle_entries` table contains:
- `id` - Primary key
- `first_name` - User's first name
- `email` - User's email address
- `created_at` - Timestamp of entry
- `updated_at` - Last update timestamp

## API Endpoints

- `POST /api/submit-raffle` - Submit raffle entry
- `GET /api/health` - Health check
- `GET /` - Main raffle form
- `GET /confirmation.html` - Confirmation page

## File Structure

```
├── server.js              # Main server file
├── submit.html            # Raffle entry form
├── confirmation.html      # Confirmation page
├── supabase-setup.sql     # Database setup script
├── env.example           # Environment variables template
├── package.json          # Dependencies
└── README.md            # This file
```

## Troubleshooting

### Email Not Sending
- Check Resend API key is correct
- Verify sender domain in Resend dashboard
- Check Vercel logs for detailed error messages

### Database Connection Issues
- Verify Supabase URL and anon key
- Check RLS policies are configured correctly
- Ensure table exists in Supabase

### Form Submission Errors
- Check browser console for JavaScript errors
- Verify all environment variables are set
- Check server logs for detailed error information 