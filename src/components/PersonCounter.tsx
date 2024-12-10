import { Button } from "./ui/button";

interface PersonCounterProps {
  label: string;
  ageRange: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const PersonCounter = ({ label, ageRange, count, onIncrement, onDecrement }: PersonCounterProps) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h3 className="font-semibold">{label}</h3>
        <p className="text-sm text-gray-500">Age {ageRange}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onDecrement}
          disabled={count === 0}
        >
          -
        </Button>
        <span className="w-8 text-center">{count}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={onIncrement}
        >
          +
        </Button>
      </div>
    </div>
  );
};