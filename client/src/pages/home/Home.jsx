import React, { useRef } from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { TextField, Slide, Dialog, Button } from '@mui/material'
import moment from 'moment'
import './Home.scss'

// MODAL transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const HomeView = (props) => {
    const { 
        userData, 
        onImgChange, 
        imgData,
        modalStatus,
        setModalStatus,
        handleUploadImg
    } = props
    const imgRef = useRef()
    const coverImgRef = useRef()

    return (
        <div className="Home">
            <div className="card-info">

                <div className="profile-images">
                    <div className="cover-container" onClick={()=>{coverImgRef.current.click()}}>
                        <div className="cover">
                            <img src={userData.coverPicture} alt="" />
                        </div>
                        <div className="edit-cover-img-icon">
                            <i className="fa fa-pencil-square" aria-hidden="true"></i>
                        </div>
                    </div>
                    <input 
                        type='file' 
                        name='coverPicture' 
                        ref={coverImgRef}
                        style={{display: 'none'}}
                        onChange={onImgChange}
                    />
                    <div className="profile-container" onClick={()=>{imgRef.current.click()}}>
                        <div className="profile">
                            <img src={userData.profilePicture} alt="" />
                        </div>
                        <div className="edit-icon">
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </div>
                    </div>
                    <input 
                        type='file' 
                        name='profilePicture' 
                        ref={imgRef}
                        style={{display: 'none'}}
                        onChange={onImgChange}
                    />
                </div>

                <div className="profile-info">
                    <p className="name">{userData.name}</p>
                    <p className="department">{userData.department}</p>
                    <div className="profile-detail">
                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="id"
                                    value={userData._id}
                                    disabled
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid xs={6}>
                                <TextField 
                                    id="outlined-basic-2" 
                                    label="Ngày sinh"
                                    value={moment(userData.dob).format('DD/MM/YYYY')}
                                    disabled
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Thang lương"
                                    value={userData.salaryScale}
                                    disabled
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                            <Grid xs={6}>
                                <TextField 
                                    id="outlined-basic-2" 
                                    label="Ngày tham gia"
                                    value={moment(userData.startDate).format('DD/MM/YYYY')}
                                    disabled
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid xs={6}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Số ngày nghỉ"
                                    value={userData.annualLeave}
                                    disabled
                                    fullWidth
                                    margin="dense"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <Dialog
                open={modalStatus}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModalStatus(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <div className='cardBody'>
                    <div className='blur' style={{top: '-18%', right: '-45%', zIndex: -1}}/>
                    <div className='blur' style={{top: '35%', right: '75%', zIndex: -1}}/>
                    {imgData && imgData.imgType === 'profilePicture' && (
                        <div className='preview-avatar'>
                            <img src={imgData.data} alt='' />
                        </div>
                    )}
                    {imgData && imgData.imgType === 'coverPicture' && (
                        <div className="preview-cover">
                            <img src={imgData.data} alt='' />
                        </div>
                    )}
                    <h1 className='preview-avatar-text'>{imgData && imgData.imgMess}</h1>
                    <div className="preview-avatar-button-group">
                        <Button 
                            variant="contained" 
                            sx={{margin: '0 12px', padding: '6px 32px', textTransform: 'none'}}
                            onClick={(e) => handleUploadImg(e)}
                        >Đồng ý</Button>
                        <Button 
                            variant="contained" 
                            sx={{margin: '0 12px', padding: '6px 32px', textTransform: 'none'}}
                            onClick={() => {
                                if(imgData && imgData.imgType === 'profilePicture') {
                                    imgRef.current.click()
                                } else {
                                    coverImgRef.current.click()
                                }
                            }}
                        >Tải Lại</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default HomeView