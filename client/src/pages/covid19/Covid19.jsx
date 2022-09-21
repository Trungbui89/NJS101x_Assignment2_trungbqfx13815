import React from 'react'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Button, Dialog, DialogContent, Grid, MenuItem, Slide, TextField } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import SendIcon from '@mui/icons-material/Send'
import { convertToDMYT, convertToDMY } from '../../common/helper/workTime_DMY'
import VaccineInput from './VaccineInput'
import './style.scss'

// MODAL transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

export default function Covid19(props) {

    const {
        temperature,
        handleTemperature,
        getTemperature,
        tempResData,
        modalState,
        handleModalClose,
        vaccineInputList,
        handleVaccineInputChange,
        handleChangeVaccineQuantity,
        handleVaccineSubmit,
        vaccineResData,
        infectionState,
        setInfectionState,
        handleInfectionSubmit,
        infectionData
    } = props

    const covidOptionList = [
        {
            value: 'Dương tính',
            label: 'Dương tính'
        },
        {
            value: 'Âm tính',
            label: 'Âm tính'
        }
    ]

    return (
        <>
        <div className="covid-compoment">
            <div className="card-info">
                <div className="covid-compoment-header">
                    <p>Đăng ký thông tin Covid-19</p>
                </div>
                <div className="content">
                    <p>Đăng ký thông tin thân nhiệt</p>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div className="covid-input-group">
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <DateTimePicker
                                        label="Ngày đăng ký"
                                        value={temperature.date}
                                        onChange={(newValue) => {
                                            handleTemperature('date', newValue)
                                        }}
                                        renderInput={(params) => 
                                            <TextField 
                                                sx={{ width: '100%' }}
                                                {...params} 
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField 
                                        id="outlined-basic-2" 
                                        label="Thân nhiệt"
                                        margin="dense"
                                        type="number"
                                        value={temperature.temp}
                                        onChange={(e) => {
                                            handleTemperature('temp', e.target.value)
                                        }}
                                        sx={{ marginTop: 0, width: '100%' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Button 
                                variant="contained" 
                                onClick={e => getTemperature(e)}
                                sx={{ paddingRight: '2rem', paddingLeft: '2rem', marginTop: '0.5rem', marginBottom: '1rem' }}
                            >
                                Đăng ký thân nhiệt
                            </Button>
                        </div>
                        <hr style={{ margin: '1.5rem 0 2rem' }}/>
                        <p>Đăng ký thông tin tiêm vaccine</p>
                        <VaccineInput 
                            vaccineInputList={vaccineInputList}
                            handleVaccineInputChange={handleVaccineInputChange}
                        />
                        <div className="date-btn-group">
                            <div className="left-group">
                                <Button 
                                    variant="contained" 
                                    startIcon={<BookmarkAddIcon />}
                                    onClick={() => handleChangeVaccineQuantity('add')}
                                    sx={{ margin: '0 0.5rem' }}
                                >
                                    Thêm
                                </Button>
                                <Button 
                                    variant="contained" 
                                    startIcon={<BookmarkRemoveIcon />}
                                    onClick={() => handleChangeVaccineQuantity('remove')}
                                    sx={{ margin: '0 0.5rem' }}
                                >
                                    Bớt
                                </Button>
                            </div>
                            <div className="right-group">
                                <Button 
                                    variant="contained"
                                    startIcon={<SendIcon />}
                                    onClick={() => handleVaccineSubmit()}
                                    sx={{ paddingRight: '2rem', paddingLeft: '2rem' }}
                                >
                                    Gửi thông tin
                                </Button>
                            </div>
                        </div>
                    </LocalizationProvider>
                    <hr style={{ margin: '1.5rem 0 2rem' }}/>
                    <p>Đăng ký thông tin dương tính với covid</p>
                    <TextField 
                        id="outlined-basic-2" 
                        label="Trạng thái"
                        margin="dense"
                        select
                        sx={{ width: '100%', marginTop: 0 }}
                        value={infectionState}
                        onChange={(e) => {
                            setInfectionState(e.target.value)
                        }}
                    >
                        {covidOptionList.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button 
                        variant="contained"
                        startIcon={<SendIcon />}
                        onClick={() => handleInfectionSubmit()}
                        sx={{ width: '100%', marginTop: '1rem', marginBottom: '3rem' }}
                    >
                        Gửi tình trạng lây nhiễm
                    </Button>
                </div>
            </div>
        </div>
        <Dialog
            open={modalState}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleModalClose()}
            aria-describedby="alert-dialog-slide-description"
            className='annual-leave-dialog'
        >
            <DialogContent dividers>
                {
                    tempResData 
                    ? 
                        <p>Bạn đã đăng ký báo cáo thân nhiệt vào lúc {convertToDMYT(tempResData.date)} với mức nhiệt {tempResData.temperature} độ</p> 
                    : 
                        null
                }
                {
                    vaccineResData
                    ?
                        <div>
                            <h2>Thông tin tiêm chủng đã đăng ký:</h2>
                                {
                                    vaccineResData.injectionList.map((ele, index) => 
                                        <div key={index}>
                                            <p>Ngày: {convertToDMY(ele.date)}</p>
                                            <p>Loại vaccine: {ele.type}</p>
                                        </div>
                                    )
                                }
                        </div>
                    :
                        null
                }
                {
                    infectionData
                    ?
                        <div>
                            <h2>Thông tin trạng thái lây nhiễm Covid-19</h2>
                            <p>Trạng thái: {infectionData.state}</p>
                            <p>Ngày thông báo: {convertToDMY(infectionData.date)}</p>
                        </div>
                    :
                        null
                }
            </DialogContent>
        </Dialog>
        </>
    )
}
