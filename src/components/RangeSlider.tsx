import Box from "@mui/material/Box";
import { FC, useState } from "react";
import Slider from "@mui/material/Slider";

type RangeSliderProps = {
  min: number;
  max: number;
  label: string;
  step?: number;
  val?: number[];
  onValueChange: (value: number[]) => void;
};

const RangeSlider: FC<RangeSliderProps> = ({
  min,
  max,
  label,
  step = 100,
  onValueChange,
}) => {
  const [value, setValue] = useState<number[]>([min, max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    event.preventDefault();
    setValue(newValue as number[]);
    onValueChange(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <div>
        {label}: {value[0]} - {value[1]}
      </div>
      <Slider
        getAriaLabel={() => "Label"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={step}
        min={min}
        max={max}
      />
    </Box>
  );
};

export default RangeSlider;
