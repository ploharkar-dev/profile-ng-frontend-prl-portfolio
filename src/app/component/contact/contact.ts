import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  // Form state
  formData = signal<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  isSubmitting = signal(false);
  toasts = signal<Toast[]>([]);
  private toastCounter = 0;

  // Recipient email
  private readonly RECIPIENT_EMAIL = 'ploharkar21@gmail.com';

  /**
   * Handle form submission
   */
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting.set(true);

    try {
      // Try Web3Forms API (free, no signup required)
      const success = await this.sendViaWeb3Forms();

      if (success) {
        this.showToast(
          `✅ Message sent successfully! I'll get back to you soon at ${this.formData().email}`,
          'success'
        );
        this.resetForm();
      } else {
        this.showFallbackOption();
      }
    } catch (error) {
      console.error('Email submission error:', error);
      this.showFallbackOption();
    } finally {
      this.isSubmitting.set(false);
    }
  }

  /**
   * Send email via Web3Forms (free API, no signup)
   */
  private async sendViaWeb3Forms(): Promise<boolean> {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '1e968afe-4e68-4e37-bbfb-f44d08da0b94',
          from_name: this.formData().name,
          from_email: this.formData().email,
          subject: `FROM WEBSITE: ${this.formData().subject}`,
          message: this.formData().message,
          redirect: false,
        }),
      });

      const result = await response.json();
      return result.success === true;
    } catch (error) {
      console.error('Web3Forms error:', error);
      return false;
    }
  }

  /**
   * Show fallback option when email service fails
   */
  private showFallbackOption(): void {
    const mailtoLink = `mailto:${this.RECIPIENT_EMAIL}?subject=${encodeURIComponent(
      `FROM WEBSITE: ${this.formData().subject}`
    )}&body=${encodeURIComponent(
      `From: ${this.formData().name}\nEmail: ${this.formData().email}\n\n${this.formData().message}`
    )}`;

    // Copy to clipboard for easy sharing
    const fullMessage = `From: ${this.formData().name}\nEmail: ${this.formData().email}\nSubject: FROM WEBSITE: ${this.formData().subject}\n\nMessage:\n${this.formData().message}`;

    navigator.clipboard.writeText(fullMessage).then(() => {
      this.showToast(
        `✉️ Email app opened! (Message copied to clipboard if needed)\nSend to: ${this.RECIPIENT_EMAIL}`,
        'info'
      );
    });

    // Open email client
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 500);
  }

  /**
   * Validate form fields
   */
  private validateForm(): boolean {
    const { name, email, subject, message } = this.formData();

    if (!name.trim()) {
      this.showToast('⚠️ Please enter your full name', 'error');
      return false;
    }

    if (!email.trim() || !this.isValidEmail(email)) {
      this.showToast('⚠️ Please enter a valid email address', 'error');
      return false;
    }

    if (!subject.trim()) {
      this.showToast('⚠️ Please enter a subject', 'error');
      return false;
    }

    if (!message.trim() || message.length < 10) {
      this.showToast('⚠️ Please enter a message (at least 10 characters)', 'error');
      return false;
    }

    return true;
  }

  /**
   * Check if email is valid
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Reset form
   */
  private resetForm(): void {
    this.formData.set({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  }

  /**
   * Show toast notification
   */
  private showToast(message: string, type: 'success' | 'error' | 'info'): void {
    const id = ++this.toastCounter;
    const toast: Toast = { id, message, type };

    this.toasts.update((current) => [...current, toast]);

    // Auto-remove toast after 6 seconds
    setTimeout(() => {
      this.removeToast(id);
    }, 6000);
  }

  /**
   * Remove toast by id
   */
  removeToast(id: number): void {
    this.toasts.update((current) => current.filter((toast) => toast.id !== id));
  }

  /**
   * Update form field
   */
  updateField(field: keyof FormData, value: string): void {
    this.formData.update((current) => ({
      ...current,
      [field]: value,
    }));
  }
}
