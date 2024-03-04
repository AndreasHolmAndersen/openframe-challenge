import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { FC } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type MultiSelectProps = {
  options: string[];
  onItemSelect: (options: string[]) => void;
  selected: string[];
  label: string;
};

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  onItemSelect,
  selected,
  label,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    onItemSelect(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="m-4">
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label" className="text-sm ">
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          className="bg-slate-50"
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              <Checkbox
                checked={selected.toString().indexOf(option.toString()) > -1}
              />
              <ListItemText primary={option} className="text-sm" />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelect;
