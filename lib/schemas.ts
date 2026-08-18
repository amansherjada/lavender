import { z } from "zod";

export const inquirySchema = z.object({
  inquiry_type: z.string().min(1, "Please select an inquiry type"),
  user_type: z.string().min(1, "Please select your role"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  mobile: z.string().min(7, "Please enter a valid mobile number"),
  location: z.string().min(1, "Please select a location"),
  property_type: z.string().min(1, "Please select a property type"),
  max_price: z.string().optional(),
  min_size: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional(),
  gdpr_consent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to continue" }),
  website: z.string().optional(), // honeypot — real users never fill this in
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export const contactSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Please enter a message (min 10 characters)"),
  gdpr_consent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to continue" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
