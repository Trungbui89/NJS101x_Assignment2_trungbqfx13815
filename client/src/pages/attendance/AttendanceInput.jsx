import React from 'react'
import { TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

export default function AttendanceInput(props) {
    const {
        annualData,
        handleAnnualData
    } = props

    return (
        <>
            {annualData.annualLeaveDateList.map(ele =>
                <div className="annual-leave-input-group" key={ele.index}>

                    <DatePicker
                        label="Ngày nghỉ"
                        value={annualData.annualLeaveDateList[ele.index - 1].annualDate}
                        onChange={(newValue) => {
                            handleAnnualData('dateData', (ele.index - 1), newValue)
                        }}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        }
                    />
                    <TextField 
                        id="outlined-basic-2" 
                        label="Số giờ nghỉ"
                        margin="dense"
                        type="number"
                        value={
                            annualData.annualLeaveDateList[ele.index - 1].annualTime
                            // annualData.annualLeaveDateList[ele.index - 1].annualTime === 0
                            // ?
                            //     0
                            // :
                            //     annualData.annualLeaveDateList[ele.index - 1].annualTime.replace(/^0+/, '')
                        }
                        onChange={(e) => {
                            handleAnnualData('timeData', (ele.index - 1), e.target.value)
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
            )}
        </>
        
    )
}
