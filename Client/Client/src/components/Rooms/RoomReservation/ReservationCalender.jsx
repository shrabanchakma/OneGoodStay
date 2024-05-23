import { useState } from "react";
import { DateRange } from "react-date-range";

const ReservationCalender = ({ room: { startDate, endDate } }) => {
  const [value, setValue] = useState({
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  });
  const handleDateChange = () => {
    setValue(value);
  };
  return (
    <DateRange
      ranges={[value]}
      onChange={handleDateChange}
      rangeColors={["rgb(2 132 199)"]}
      direction="horizontal"
      showSelectionPreview={false}
      showDateDisplay={false}
    />
  );
};

export default ReservationCalender;
