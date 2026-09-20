import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const waitlistSchema = z.object({
  email: z.string().trim().min(1, 'Enter your email address.').email('Enter a valid email address.'),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

export default function WaitlistForm() {
  const [joined, setJoined] = useState(false);
  const form = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  async function onJoin(values: WaitlistValues): Promise<void> {
    // Replace this placeholder with the waitlist API request.
    void values;
    throw new Error('Waitlist signups aren’t open yet. Please try again later.');
  }

  async function onSubmit(values: WaitlistValues) {
    setJoined(false);
    try {
      await onJoin(values);
      form.reset();
      setJoined(true);
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error
          ? error.message
          : 'We couldn’t add you to the waitlist. Please try again.',
      });
    }
  }

  return (
    <form
      aria-label="Join the waitlist"
      onSubmit={form.handleSubmit(onSubmit)}
      className="font-inter mx-auto mt-5 w-full max-w-[440px] text-left"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="min-w-0 flex-1 gap-2">
              <FieldLabel htmlFor="waitlist-email" className="sr-only">Email address</FieldLabel>
              <Input
                {...field}
                id="waitlist-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email..."
                disabled={form.formState.isSubmitting}
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? 'waitlist-email-error' : undefined}
                onChange={(event) => {
                  field.onChange(event);
                  form.clearErrors('root');
                  setJoined(false);
                }}
                className="h-12 rounded-full border-white/70 bg-white/10 px-4 text-base text-white placeholder:text-white/85 focus-visible:border-white focus-visible:ring-white/30 aria-invalid:border-red-200 sm:text-sm"
              />
              {fieldState.invalid && (
                <FieldError id="waitlist-email-error" errors={[fieldState.error]} className="px-4 text-red-100" />
              )}
            </Field>
          )}
        />
        <Button
          type="submit"
          isLoading={form.formState.isSubmitting}
          className="h-12 w-full shrink-0 rounded-full bg-white px-6 text-sm font-medium text-[#6360F0] hover:bg-white/90 focus-visible:ring-white/50 sm:w-auto"
        >
          {form.formState.isSubmitting ? 'Joining…' : 'Join the waitlist'}
        </Button>
      </div>
      {form.formState.errors.root && (
        <p role="alert" className="mt-3 text-center text-sm text-red-100">{form.formState.errors.root.message}</p>
      )}
      <p role="status" className="mt-3 text-center text-sm text-white">
        {joined ? 'You’re on the waitlist! We’ll be in touch.' : ''}
      </p>
    </form>
  );
}
