import { forwardRef } from "react";
import { DateRange } from "react-date-range";
const Calendar = forwardRef(({ value, handleDateChange, months }, ref) => {
  return (
    <DateRange
      // className="w-full"
      ref={ref}
      ranges={[value]}
      onChange={(item) => handleDateChange(item.selection)}
      rangeColors={["red"]}
      months={months}
      direction="horizontal"
      showSelectionPreview={true}
    />
  );
});
Calendar.displayName = "Calendar";
export default Calendar;
