# Contact Form Setup Guide

## Overview
The contact form is now fully functional with:
- ✅ Email delivery via Formspree (free service)
- ✅ Form validation
- ✅ Modern toast notifications (success/error messages)
- ✅ Loading state indicators
- ✅ Responsive design

## Setup Instructions

### Step 1: Set Up Formspree Account (2 minutes)

1. Go to https://formspree.io/
2. Click "Sign Up" and create a free account
3. Verify your email

### Step 2: Create a Form Endpoint

1. After signing in, click "Create Form"
2. For "Email address to receive submissions", enter: **ploharkar21@gmail.com**
3. Give it a name like "Portfolio Contact Form"
4. Click "Create Form"
5. You'll get a form ID that looks like: `mbjqqvbz` (or similar)

### Step 3: Update the Contact Component

In `src/app/component/contact/contact.ts`, find this line:

```typescript
private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbjqqvbz';
```

Replace `mbjqqvbz` with your form ID from Formspree:

```typescript
private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

### Step 4: Test the Form

1. Run `npm start`
2. Navigate to the Contact section
3. Fill out the form and click "Send Message"
4. You should see a green success toast notification
5. Check your email at **ploharkar21@gmail.com** for the message

## Features Implemented

### Form Validation
- ✅ Name required (non-empty)
- ✅ Email required (valid format)
- ✅ Subject required (non-empty)
- ✅ Message required (minimum 10 characters)

### Toast Notifications
- **Success** (Green) - Message sent successfully
- **Error** (Red) - Validation or network errors
- **Auto-dismiss** - Toasts disappear after 5 seconds
- **Manual close** - Click the X to dismiss immediately

### User Experience
- Loading spinner while sending
- Disabled form inputs during submission
- Clear error messages for validation
- Detailed success message showing recipient email
- Smooth animations (slide-in effect)
- Mobile-responsive toast positioning

## Customization

### Change Toast Duration
In `contact.ts`, find the `showToast` method and change:
```typescript
setTimeout(() => {
  this.removeToast(id);
}, 5000); // Change 5000 to desired milliseconds
```

### Change Recipient Email
Update `RECIPIENT_EMAIL` constant in `contact.ts`:
```typescript
private readonly RECIPIENT_EMAIL = 'your-email@example.com';
```

### Styling Toast Notifications
All toast styles are in `contact.css`:
- `.toast-success` - Green toast
- `.toast-error` - Red toast  
- `.toast-info` - Blue toast

## How It Works

1. **User submits form** → Component validates all fields
2. **Valid form** → Sends data to Formspree endpoint via CORS
3. **Formspree processes** → Sends email to configured recipient
4. **Success response** → Shows green toast, clears form
5. **Error response** → Shows red toast with error message

## Security Features

- ✅ No sensitive data stored in frontend
- ✅ Email validation before sending
- ✅ CORS-enabled safe endpoint
- ✅ Rate limiting via Formspree (prevents spam)
- ✅ No backend server required

## Troubleshooting

### Form not sending?
1. Check browser console for errors (F12 → Console tab)
2. Verify Formspree form ID is correct
3. Ensure your email is verified in Formspree
4. Check spam folder for acceptance email from Formspree

### Toast not appearing?
- Check `contact.css` for toast-related styles
- Verify `contact.ts` is imported in component
- Clear browser cache (Ctrl + Shift + Delete)

### Network errors?
- Check CORS settings in Formspree dashboard
- Ensure you're using HTTPS in production
- Verify your internet connection

## Production Deployment

1. Build for production: `npm run build:prod`
2. Deploy to Netlify using `netlify.toml`
3. Formspree handles email delivery automatically
4. No backend server required!

## Support

- **Formspree Docs**: https://formspree.io/docs/
- **Angular Forms**: https://angular.io/guide/forms
- **Toast Notifications**: Built-in CSS animations

---

**Created**: February 17, 2026
**Status**: Ready for production
