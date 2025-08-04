const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Check if API key is loaded
console.log('API Key loaded:', process.env.RESEND_API_KEY ? 'Yes' : 'No');
console.log('API Key starts with:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'Not found');
console.log('Using API key:', process.env.RESEND_API_KEY || 're_XrUfpwHy_5GQaWMG72ajoUEwY7hbqRNv7');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_XrUfpwHy_5GQaWMG72ajoUEwY7hbqRNv7');

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase URL:', supabaseUrl ? 'Configured' : 'Not configured');
console.log('Supabase Key:', supabaseKey ? 'Configured' : 'Not configured');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from current directory

// Email template function
function createEmailTemplate(firstName, email) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pub Tool MMVP - Entry Confirmed</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .email-container {
                background-color: #ffffff;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding: 20px;
                background: linear-gradient(135deg, #005c03 0%, #228B22 100%);
                border-radius: 8px;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
            }
            .content {
                margin-bottom: 30px;
            }
            .success-icon {
                text-align: center;
                font-size: 48px;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .highlight {
                color: #005c03;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>🍺 Pub Tool MMVP</h1>
            </div>
            
            <div class="content">
                <div class="success-icon">✅</div>
                
                <h2 style="color: #005c03; text-align: center; margin-bottom: 20px;">
                    Entry Confirmed!
                </h2>
                
                <p>Hi <span class="highlight">${firstName}</span>,</p>
                
                <p>Thank you for entering our raffle! Your submission has been received and recorded successfully.</p>
                
                <p><strong>Entry Details:</strong></p>
                <ul>
                    <li><strong>Name:</strong> ${firstName}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Entry Date:</strong> ${new Date().toLocaleDateString()}</li>
                </ul>
                
                <p>We'll notify you if you're selected as a winner. Good luck! 🍀</p>
                
                <p style="margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; border-left: 4px solid #005c03;">
                    <strong>Note:</strong> This is an automated confirmation email. Please do not reply to this message.
                </p>
            </div>
            
            <div class="footer">
                <p>© 2025 Pub Tool MMVP. All rights reserved.</p>
                <p>This email was sent to ${email}</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

// API Routes
app.post('/api/submit-raffle', async (req, res) => {
    try {
        const { firstName, email } = req.body;

        // Validate input
        if (!firstName || !email) {
            return res.status(400).json({
                success: false,
                message: 'First name and email are required'
            });
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        console.log('Processing raffle entry:', { firstName, email });

        // Send confirmation email via Resend
        const emailHtml = createEmailTemplate(firstName, email);
        console.log('Sending email to:', email);
        console.log('Email HTML length:', emailHtml.length);
        console.log('Resend instance:', resend ? 'Initialized' : 'Not initialized');
        
        let emailResult;
        try {
            console.log('About to call resend.emails.send with:', {
                from: 'onboarding@resend.dev',
                to: [email],
                subject: '🍺 Pub Tool MMVP - Your Raffle Entry is Confirmed!',
                htmlLength: emailHtml.length
            });
            
            emailResult = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: [email],
                subject: '🍺 Pub Tool MMVP - Your Raffle Entry is Confirmed!',
                html: emailHtml,
                text: `Hi ${firstName},\n\nThank you for entering our raffle! Your submission has been received and recorded successfully.\n\nEntry Details:\n- Name: ${firstName}\n- Email: ${email}\n- Entry Date: ${new Date().toLocaleDateString()}\n\nWe'll notify you if you're selected as a winner. Good luck!\n\n© 2025 Pub Tool MMVP. All rights reserved.`
            });

            console.log('Email sent successfully:', emailResult);
            console.log('Email ID:', emailResult.id);
            console.log('Full emailResult:', JSON.stringify(emailResult, null, 2));
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            console.error('Email error details:', {
                message: emailError.message,
                status: emailError.status,
                code: emailError.code
            });
            throw emailError;
        }

        // Store data in Supabase
        console.log('Storing data in Supabase...');
        const { data: dbData, error: dbError } = await supabase
            .from('raffle_entries')
            .insert([{ 
                first_name: firstName, 
                email: email,
                created_at: new Date().toISOString()
            }]);

        if (dbError) {
            console.error('Supabase insert error:', dbError);
            throw new Error('Failed to store entry in database');
        }

        console.log('Data stored in Supabase:', dbData);

        // Return success response
        res.json({
            success: true,
            message: 'Raffle entry submitted successfully',
            emailSent: emailResult && emailResult.id ? true : false,
            entryId: emailResult ? emailResult.id : null,
            dbEntryId: dbData ? dbData[0]?.id : null
        });

    } catch (error) {
        console.error('Error processing raffle entry:', error);
        console.error('Full error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            code: error.code,
            status: error.status
        });
        
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your entry',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Pub Tool MMVP API'
    });
});

// Serve the main page (submit form)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/submit.html');
});

// Serve confirmation page
app.get('/confirmation.html', (req, res) => {
    res.sendFile(__dirname + '/confirmation.html');
});

// Serve static images
app.get('/Kelley.logo.png', (req, res) => {
    res.sendFile(__dirname + '/Kelley.logo.png');
});

app.get('/Kelley.Green.png', (req, res) => {
    res.sendFile(__dirname + '/Kelley.Green.png');
});

app.get('/Beer.2.png', (req, res) => {
    res.sendFile(__dirname + '/Beer.2.png');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Pub Tool MMVP API server running on port ${PORT}`);
    console.log(`📧 Resend API configured: ${process.env.RESEND_API_KEY ? 'Yes' : 'No'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📱 Frontend available at: http://localhost:${PORT}`);
});

module.exports = app; 