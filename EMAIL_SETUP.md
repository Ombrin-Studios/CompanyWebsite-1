# Email Form Setup Instructions


## Setup Steps:

### 1. Create a Free Formspree Account
- Go to https://formspree.io/
- Click **Sign Up** (free account allows 50 submissions/month)
- Sign up with your email or GitHub account

### 2. Create a New Form
- After logging in, click **New Form** or **+ New**
- Give your form a name (e.g., "Contact Form")
- Set the **Email To** field to: `gamerguy0570@gmail.com`
- Click **Create Form**

### 3. Get Your Form Endpoint URL
- After creating the form, you'll see your form endpoint URL
- It will look like: `https://formspree.io/f/YOUR_FORM_ID`
- **Copy this entire URL** (you'll need this)

### 4. Update Your Code
Open `script.js` and find this line (around line 88):
```javascript
fetch('YOUR_FORMSPREE_ENDPOINT', {
```

Replace `YOUR_FORMSPREE_ENDPOINT` with your actual Formspree form URL.

Example:
```javascript
fetch('https://formspree.io/f/abc123xyz789', {
```

### 5. Configure Form Settings (Optional)
In your Formspree dashboard, you can:
- Set up email notifications
- Add custom redirect URLs after submission
- Enable spam protection
- Set up webhooks
- Customize email templates


The form sends the following data:
- `name` - Full name
- `email` - Email address
- `phone` - Phone number
- `service` - Service needed
- `message` - Project details
- `_replyto` - Set to the user's email (for easy replies)
- `_subject` - Email subject line
