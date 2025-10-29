<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            margin-bottom: 30px;
        }
        .credentials-box {
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            padding: 20px;
            margin: 20px 0;
        }
        .credential-item {
            margin: 10px 0;
            padding: 10px;
            background-color: white;
            border-radius: 3px;
        }
        .important-notice {
            color: #dc3545;
            font-weight: bold;
            padding: 15px;
            margin: 20px 0;
            border-left: 4px solid #dc3545;
            background-color: #fff3f3;
        }
        .login-button {
            display: inline-block;
            background-color: #333;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .portal-link {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            text-align: center;
            word-break: break-all;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            text-align: center;
            font-size: 0.9em;
            color: #6c757d;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Welcome to Our Learning Portal!</h2>
        </div>

        <p>Dear {{ $credentials['name'] }},</p>

        <p>Your enrollment has been approved, and we're excited to have you join our learning community! Below are your login credentials:</p>

        <div class="credentials-box">
            <div class="credential-item">
                <strong>Email:</strong> {{ $credentials['email'] }}
            </div>
            <div class="credential-item">
                <strong>Temporary Password:</strong> {{ $credentials['password'] }}
            </div>
        </div>

        <div class="important-notice">
            Important: For security reasons, please change your password immediately after your first login.
        </div>

        <p>To get started:</p>
        <ol>
            <li>Visit our Learning Portal at:
                <div class="portal-link">
                    <a href="http://localhost:3000/login-credentials">http://localhost:3000/login-credentials</a>
                </div>
            </li>
            <li>Click on the "Login" button or use the direct link below</li>
            <li>Enter your email and temporary password</li>
            <li>Follow the prompts to change your password</li>
        </ol>

        <div style="text-align: center;">
            <a href="http://localhost:3000/login-credentials" class="login-button">
                Access Learning Portal
            </a>
        </div>

        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>

        <div class="footer">
            <p>Best regards,<br>Learning Portal Team</p>
            <small>This is an automated message, please do not reply directly to this email.</small>
        </div>
    </div>
</body>
</html>