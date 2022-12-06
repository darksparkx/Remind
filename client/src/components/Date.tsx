import React, { MouseEvent, KeyboardEvent, ChangeEvent, useState } from "react";
import { useAddNoteState } from "../data/state";
import Calendar from "react-calendar";

const DatePicker = () => {
    const date = useAddNoteState((state) => state.date);
    const customDate = useAddNoteState((state) => state.customDate);

    let today: Date = new Date();

    const handleDate = (event: MouseEvent<HTMLElement>) => {
        let newDate;
        switch (event.currentTarget.id) {
            case "Day":
                newDate = new Date(today.setDate(today.getDate() + 1));
                useAddNoteState.setState({ date: newDate, customDate: false });
                break;
            case "Week":
                newDate = new Date(today.setDate(today.getDate() + 7));
                useAddNoteState.setState({ date: newDate, customDate: false });
                break;
            case "Month":
                newDate = new Date(today.setMonth(today.getMonth() + 1));
                useAddNoteState.setState({ date: newDate, customDate: false });
                break;
            case "Year":
                newDate = new Date(today.setFullYear(today.getFullYear() + 1));
                useAddNoteState.setState({ date: newDate, customDate: false });
                break;
            case "Custom":
                useAddNoteState.setState({
                    date: today,
                    customDate: !customDate,
                });
                break;
            default:
                useAddNoteState.setState({ date: today, customDate: false });
                break;
        }
    };
    return (
        <>
            {/* <Button id="Day" onClick={handleDate}>
                Day
            </Button>
            <Button id="Week" onClick={handleDate}>
                Week
            </Button>
            <Button id="Month" onClick={handleDate}>
                Month
            </Button>
            <Button id="Year" onClick={handleDate}>
                Year
            </Button>

            <Typography>
                {`${date.getDate()}/${
                    date.getMonth() + 1
                }/${date.getFullYear()}`}
                <Button id="Custom" onClick={handleDate}>
                    <DateRange />
                </Button>
            </Typography>
            {customDate && (
                <Calendar
                    defaultActiveStartDate={today}
                    minDate={today}
                    value={date}
                    onChange={(date: Date) =>
                        useAddNoteState.setState({
                            date: date,
                        })
                    }
                />
            )} */}
        </>
    );
};

export default DatePicker;
