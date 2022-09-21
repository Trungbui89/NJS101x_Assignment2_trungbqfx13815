import React from 'react'
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableRow,
         TableHead, Paper, Slide, Dialog, DialogTitle, DialogContent, TextField, 
         InputAdornment, FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import CloseIcon from '@mui/icons-material/Close'
import { convertToDMY, convertToDMYT } from '../../common/helper/workTime_DMY'
import './style.scss'
import preview from '../../assets/icons/preview.jpg'

// MODAL transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function Search(props) {
    const {
        attendanceData,
        attendanceDateTitleList,
        attendanceDetail,
        datePickerValue,
        dateModalState,
        setDateModalState,
        handleDateChange,
        salaryData
    } = props
        
    function Row(props) {
        const { row, att } = props
        const [open, setOpen] = React.useState(false)

        return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 700 }}>Ngày</TableCell>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 700 }} align="right">Tổng thời gian</TableCell>
                <TableCell sx={{ fontSize: '1rem', fontWeight: 700 }} align="right">Annual Leave</TableCell>
            </TableRow>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row" sx={{ fontSize: '1rem', fontWeight: 700 }}></TableCell>
                <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>{row.date}</TableCell>
                <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }} align="right">{row.time}</TableCell>
                <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }} align="right">{row.annualTime}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Table size="small" aria-label="purchases" sx={{ margin: '2rem 0 3rem'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 500 }}>Địa điểm</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 500 }}>Giờ bắt đầu</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 500 }} align="right">Giờ kết thúc</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem', fontWeight: 500 }} align="right">Thời gian làm</TableCell>
                                </TableRow>
                            </TableHead>
                        <TableBody>
                            {att.map((detailRow) => {
                                return (
                                    convertToDMY(detailRow.startTime) === row.date
                                    ?
                                        <TableRow key={detailRow._id}>
                                            <TableCell component="th" scope="row" sx={{ color: '#848484' }}>
                                            {detailRow.workplace}
                                            </TableCell>
                                            <TableCell sx={{ color: '#848484' }}>{convertToDMYT(detailRow.startTime)}</TableCell>
                                            <TableCell sx={{ color: '#848484' }} align="right">{convertToDMYT(detailRow.endTime)}</TableCell>
                                            <TableCell sx={{ color: '#848484' }} align="right">{detailRow.workingTime}</TableCell>
                                        </TableRow>
                                    :
                                        null
                                )
                            })}
                        </TableBody>
                        </Table>
                    </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
        )
    }
    
    return (
        <>
            <div className="search-compoment">
                <div className="card-info">
                    <div className="salary-icon-container">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Custom input"
                                    value={datePickerValue}
                                    views={['month']}
                                    components={{
                                        OpenPickerIcon: EqualizerIcon
                                    }}
                                    onChange={(newValue) => {
                                        handleDateChange(newValue)
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <input ref={inputRef} {...inputProps} style={{width: 0, visibility: 'hidden'}}/>
                                        {InputProps?.endAdornment}
                                    </Box>
                                    )}
                                />
                        </LocalizationProvider>
                    </div>
                    <div className="search-compoment-header">
                        <p>Thông tin giờ làm</p>
                    </div>
                    <div className="content">
                        {
                            attendanceData 
                            ?
                                <div>
                                    <TableContainer 
                                        component={Paper} 
                                        sx={{
                                            background: '#f8f8f8', 
                                            width: '95%',
                                            marginRight: 'auto',
                                            marginLeft: 'auto',
                                            boxShadow: 'none',
                                            marginBottom: '1.5rem',
                                            whiteSpace: 'nowrap' 
                                        }}
                                    >
                                        <Table aria-label="collapsible table">
                                            <TableBody>
                                            {attendanceDateTitleList.map((row) => (
                                                <Row 
                                                    key={row.date} 
                                                    row={row}
                                                    att={attendanceDetail}
                                                />
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            :
                                <div>
                                    <img src={preview} alt='' />
                                </div>
                        }
                    </div>
                </div>
            </div>
            <Dialog
                open={dateModalState}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setDateModalState(false)}
                aria-describedby="alert-dialog-slide-description"
                className='annual-leave-dialog'
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    Lương theo tháng
                    <IconButton
                        aria-label="close"
                        onClick={() => setDateModalState(false)}
                        sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    {
                        salaryData
                        ?
                            <>
                                <TextField
                                    variant="outlined" 
                                    label="Làm thêm giờ"
                                    value={salaryData.overTime}
                                    disabled
                                    margin="dense"
                                    sx={{width: '100%', paddingRight: '1rem'}}
                                />
                                <TextField
                                    variant="outlined" 
                                    label="Làm thiếu giờ"
                                    value={salaryData.missingTime}
                                    disabled
                                    margin="dense"
                                    sx={{width: '100%', paddingRight: '1rem'}}
                                />
                                <FormControl fullWidth sx={{width: '100%', paddingRight: '1rem', marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                                    <InputLabel htmlFor="salary">Lương hiện tại</InputLabel>
                                    <OutlinedInput
                                        id="salary"
                                        disabled
                                        value={salaryData.salary}
                                        startAdornment={<InputAdornment position="start">VND</InputAdornment>}
                                        label="Lương hiện tại"
                                    />
                                </FormControl>
                            </>
                        :
                            null
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}
