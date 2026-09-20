import { BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type VerifiedCreatorCardProps = {
  name: string;
  age: number;
  avatarSrc?: string;
  className?: string;
};

export default function VerifiedCreatorCard({
  name,
  age,
  avatarSrc,
  className,
}: VerifiedCreatorCardProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <div
      className={cn(
        'font-inter flex items-center gap-[2.5cqw] rounded-full border border-[#7C83FF] bg-white p-[2.5cqw] text-[#454545]',
        className,
      )}
    >
      <div className="flex size-[9.5cqw] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E6DED0] text-[3cqw] font-semibold text-[#655847]">
        {avatarSrc ? (
          <img src={avatarSrc} alt="" className="size-full object-cover" loading="lazy" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div className="min-w-0 flex-1 text-[2.65cqw] leading-[1.6]">
        <p className="truncate font-medium">{name}</p>
        <p>{age}</p>
      </div>
      <BadgeCheck
        aria-label="Verified creator"
        role="img"
        className="size-[5.5cqw] shrink-0 fill-[#009D77] text-white"
        strokeWidth={1.8}
      />
    </div>
  );
}
