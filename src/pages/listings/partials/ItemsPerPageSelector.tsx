import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FC, useState } from "react";

type ItemsPerPageSelectorProps = {
  options: number[];
  onItemSelect: (items: number) => void;
  selected: number;
};

const ItemsPerPageSelector: FC<ItemsPerPageSelectorProps> = ({
  options,
  onItemSelect,
  selected,
}) => {
  const [itemsPrPage, setItemsPrPage] = useState<number>(selected);

  const handleChange = (event: SelectChangeEvent) => {
    setItemsPrPage(+event.target.value);
    onItemSelect(+event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Items per page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemsPrPage.toString()}
          label="Items per page"
          className=" bg-slate-50"
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ItemsPerPageSelector;
