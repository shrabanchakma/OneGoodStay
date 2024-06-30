import { useState } from "react";
import { DateRange } from "react-date-range";
const Calender = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleDateChange = (ranges) => {
    console.log(ranges);
    setValue({
      startDate: ranges.startDate,
      endDate: ranges.endDate,
      key: "selection",
    });
  };
  return (
    <DateRange
      ranges={[value]}
      onChange={(item) => handleDateChange(item.selection)}
      rangeColors={["red"]}
      months={2}
      direction="horizontal"
      showSelectionPreview={true}
    />
  );
};

export default Calender;
