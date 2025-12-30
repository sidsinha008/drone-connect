
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CybersecurityBadgeProps {
  score: number;
  className?: string;
}

const CybersecurityBadge = ({ score, className }: CybersecurityBadgeProps) => {
  const getScoreStyle = () => {
    if (score >= 90) return { color: 'text-green-500', icon: <ShieldCheck className="w-4 h-4 mr-2" /> };
    if (score >= 70) return { color: 'text-yellow-500', icon: <ShieldAlert className="w-4 h-4 mr-2" /> };
    return { color: 'text-red-500', icon: <ShieldX className="w-4 h-4 mr-2" /> };
  };

  const { color, icon } = getScoreStyle();

  return (
    <div className={cn('flex items-center text-sm font-medium', color, className)}>
      {icon}
      <span>Cybersecurity Score: {score} / 100</span>
    </div>
  );
};

export default CybersecurityBadge;
