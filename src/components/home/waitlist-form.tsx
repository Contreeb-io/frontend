import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import http from '@/lib/https';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const waitlistSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.'),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

export default function WaitlistForm() {
  const form = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  const joinWaitlist = useMutation({
    mutationFn: (values: WaitlistValues) =>
      http.post('join_waitlist', values),
    retry: false,
    onSuccess: () => {
      form.reset();
      toast.add({ title: "You're on the waitlist!", type: 'success' });
    },
  });

  function onSubmit(values: WaitlistValues) {
    if (joinWaitlist.isPending) return;
    joinWaitlist.mutate(values);
  }

  return (
    <form
      aria-label="Join the waitlist"
      aria-busy={joinWaitlist.isPending}
      onSubmit={form.handleSubmit(onSubmit)}
      className="font-inter mx-auto mt-5 w-full max-w-[440px] text-left"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              data-invalid={fieldState.invalid}
              className="min-w-0 flex-1 gap-2"
            >
              <FieldLabel htmlFor="waitlist-email" className="sr-only">
                Email address
              </FieldLabel>
              <Input
                {...field}
                id="waitlist-email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email..."
                disabled={joinWaitlist.isPending}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid ? 'waitlist-email-error' : undefined
                }
                onChange={(event) => {
                  field.onChange(event);
                  joinWaitlist.reset();
                }}
                className="h-12 rounded-full border-white/70 bg-white/10 px-4 text-base text-white placeholder:text-white/85 focus-visible:border-white focus-visible:ring-white/30 aria-invalid:border-red-200 sm:text-sm"
              />
              {fieldState.invalid && (
                <FieldError
                  id="waitlist-email-error"
                  errors={[fieldState.error]}
                  className="px-4 text-red-100"
                />
              )}
            </Field>
          )}
        />
        <Button
          type="submit"
          isLoading={joinWaitlist.isPending}
          aria-label={
            joinWaitlist.isPending
              ? 'Joining the waitlist'
              : 'Join the waitlist'
          }
          className="h-12 w-full shrink-0 rounded-full bg-white px-6 text-sm font-medium text-[#6360F0] hover:bg-white/90 focus-visible:ring-white/50 sm:w-auto"
        >
          {joinWaitlist.isPending ? 'Joining…' : 'Join the waitlist'}
        </Button>
      </div>
    </form>
  );
}
