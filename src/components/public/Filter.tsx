import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";

const RadioComponent = ({ value, name }: { value: string; name: string }) => {
  return (
    <div className="flex items-center space-x-3">
      <RadioGroupItem value={value} id={value} className="text-blue-600" />
      <Label htmlFor={value}>{name}</Label>
    </div>
  );
};

const Filter = () => {
  return (
    <div className=" border-[1px] p-8 rounded">
      <h2 className="font-bold  text-2xl mb-5">Filter by</h2>
      <div className="space-y-4">
        <div className="border-b-2 pb-4">
          <h2 className="mb-3">Location</h2>
          <p>View All</p>
          <ul>
            <li>Greater Accra</li>
            <li>Greater Accra</li>
            <li>Greater Accra</li>
            <li>Greater Accra</li>
          </ul>
        </div>
        <div className="border-b-2 pb-4">
          <h2 className="mb-4 font-bold text-xs">Accomodation</h2>
          <RadioGroup
            defaultValue="all"
            onValueChange={(e) => console.log(e)}
            className="space-y-3"
          >
            <RadioComponent value="all" name="View All" />
            <RadioComponent value="inclusive" name="Inclusive" />
            <RadioComponent value="non-inclusive" name="Non-inclusive" />
          </RadioGroup>
        </div>
        <div className="border-b-2 pb-4">
          <h2 className="mb-4 font-bold text-xs">Transport</h2>
          <RadioGroup
            defaultValue="all"
            onValueChange={(e) => console.log(e)}
            className="space-y-3"
          >
            <RadioComponent value="all" name="View All" />
            <RadioComponent value="inclusive" name="Inclusive" />
            <RadioComponent value="non-inclusive" name="Non-inclusive" />
          </RadioGroup>
        </div>
        <div className="border-b-2 pb-4">
          <h2 className="mb-4 font-bold text-xs">Feeding</h2>
          <RadioGroup
            defaultValue="all"
            onValueChange={(e) => console.log(e)}
            className="space-y-3"
          >
            <RadioComponent value="all" name="View All" />
            <RadioComponent value="inclusive" name="Inclusive" />
            <RadioComponent value="non-inclusive" name="Non-inclusive" />
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default Filter;
