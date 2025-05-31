
import { CheckCircle, Circle, Clock } from "lucide-react";

interface ShipmentProgressProps {
  currentStatus: string;
}

const steps = [
  { key: 'arrived', label: 'Arrived', description: 'Shipment registered at port' },
  { key: 'cleared', label: 'Cleared', description: 'Customs clearance completed' },
  { key: 'in storage', label: 'In Storage', description: 'Warehouse assignment' },
  { key: 'in transit', label: 'In Transit', description: 'Out for delivery' },
  { key: 'delivered', label: 'Delivered', description: 'Delivered to customer' }
];

const ShipmentProgress = ({ currentStatus }: ShipmentProgressProps) => {
  const currentIndex = steps.findIndex(step => step.key === currentStatus.toLowerCase());

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div className="flex flex-col items-center">
                  {isCompleted ? (
                    <CheckCircle className={`w-8 h-8 ${isCurrent ? 'text-blue-600' : 'text-green-600'}`} />
                  ) : (
                    <Circle className="w-8 h-8 text-gray-300" />
                  )}
                  <div className="text-center mt-2">
                    <p className={`text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    <p className={`text-xs ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${index < currentIndex ? 'bg-green-600' : 'bg-gray-200'}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipmentProgress;
