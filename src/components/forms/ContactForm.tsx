import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import { Loader2 } from "lucide-react";

/**
 * ContactForm Component
 * 
 * Contact form with real-time validation, loading states, and toast notifications.
 * Features:
 * - Real-time validation using react-hook-form + zod
 * - Loading spinner during submission
 * - Success/error toast notifications via Sonner
 * - Black focus rings matching design spec
 * - Proper input sanitization and length limits
 * 
 * Security:
 * - Client-side validation with a shared zod schema
 * - Server-side validation in the Vercel Function
 * - Input length limits and trimming
 */
export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      // UI-only: Show success toast
      toast.success("Thank you for contacting me!", {
        description: "Your message has been sent. I'll get back to you soon.",
      });

      // Reset form after successful submission
      reset();
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later or contact me directly via email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
        {...register("website")}
      />
      {/* Full Name Field */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-neutral-950"
        >
          Full Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
          disabled={isSubmitting}
          className="focus-visible:ring-neutral-950"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && (
          <p className="text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-neutral-950"
        >
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          disabled={isSubmitting}
          className="focus-visible:ring-neutral-950"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p className="text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-neutral-950"
        >
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Your message..."
          rows={6}
          {...register("message")}
          disabled={isSubmitting}
          className="focus-visible:ring-neutral-950 resize-none"
          aria-invalid={errors.message ? "true" : "false"}
        />
        {errors.message && (
          <p className="text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
};
