import React from 'react'
import { Grid, MenuItem, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

export default function VaccineInput(props) {
    const {
        vaccineInputList,
        handleVaccineInputChange
    } = props

    const vaccines = [
        {
            value: 'AstraZeneca',
            label: 'AstraZeneca'
        },
        {
            value: 'SPUTNIK V',
            label: 'SPUTNIK V'
        },
        {
            value: 'Vero Cell',
            label: 'Vero Cell'
        },
        {
            value: 'Pfizer-BioNTech',
            label: 'Pfizer-BioNTech'
        },
        {
            value: 'Moderna',
            label: 'Moderna'
        },
        {
            value: 'Janssen Biologics',
            label: 'Janssen Biologics'
        },
        {
            value: 'Hayat - Vax',
            label: 'Hayat - Vax'
        },
        {
            value: 'Abdala',
            label: 'Abdala'
        }
    ]

    return (
        <>
            {vaccineInputList.map(ele =>
                <div className="vacccine-input-container" key={ele.index}>
                    <p>Mũi {ele.index}</p>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <DatePicker
                                label="Ngày Tiêm"
                                value={ele.date}
                                onChange={(newValue) => {
                                    handleVaccineInputChange('injectionDate', (ele.index - 1), newValue)
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        sx={{ width: '100%' }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField 
                                id="outlined-basic-2" 
                                label="Loại Vaccine"
                                margin="dense"
                                select
                                sx={{ width: '100%', marginTop: 0 }}
                                value={ele.type}
                                onChange={(e) => {
                                    handleVaccineInputChange('injectionType', (ele.index - 1), e.target.value)
                                }}
                            >
                                {vaccines.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
        
    )
}
