
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'arrived':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'cleared':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'flagged':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'in storage':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'in transit':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'delivered':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge className={`${getStatusColor(status)} border`}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
