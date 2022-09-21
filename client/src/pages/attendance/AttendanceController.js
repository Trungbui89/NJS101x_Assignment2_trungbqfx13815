import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import Attendance from './Attendance'
import { addAttendance, getAttendanceInfo, endAttendance } from '../../store/action/attendanceAction'
import { editUser } from '../../store/action/authAction'
import { workTime_DMY } from '../../common/helper/workTime_DMY'

const AttendanceController = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.authReducer.authData.user)
    const attendanceData = useSelector(state => state.attendanceReducer)
    const endAttendanceData = useSelector(state => state.endAttendanceReducer.endAttendanceData)

    const selectItem = ['Nhà', 'Công ty', 'Khách hàng']
    const [workplace, setWorkplace] = useState(selectItem[1])
    const [modal, setModal] = useState(false)
    const [annualState, setAnnualState] = useState(false)
    const [annualData, setAnnualData] = useState({
        reason: '',
        annualLeaveDateList: [{
            index: 1,
            annualDate: null,
            annualTime: 0
        }]
    })

    // handle workplace input
    const handleWorkplaceChange = (e) => {
        setWorkplace(e.target.value)
    }

    // get attendance
    const handleGetAttendance = () => {
        if(userData.attendanceId) {
            dispatch(getAttendanceInfo({attendanceId: userData.attendanceId}))
        } else {
            return undefined
        }
    }

    React.useEffect(() => {
        handleGetAttendance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    // attendance up/down
    const handleAttendanceUp = (e) => {
        dispatch(addAttendance({
            workplace: workplace,
            _id: userData._id,
            name: userData.name
        }, userData))
    }

    const handleAttendanceDown = () => {
        dispatch(endAttendance({
            attendanceId: attendanceData.attendanceData._id
        }, userData._id))
        setModal(true)
    }

    // work time format
    const workTime = endAttendanceData?.reduce((total, currentValue) => {
        const endTime = moment(currentValue.endTime)
        const startTime = moment(currentValue.startTime)
        const currentTime = endTime.diff(startTime)
        return (
            total + currentTime
        )
    }, 0)
    const workTimeFomated = workTime_DMY(workTime)


    // handle add/remove annualLeave input
    const handleChangeAnnualQuantity = (type) => {
        if(type === 'add') {
            const newIndex = annualData.annualLeaveDateList[annualData.annualLeaveDateList.length - 1].index + 1
            setAnnualData({
                ...annualData, 
                annualLeaveDateList: [
                    ...annualData.annualLeaveDateList, 
                    {index: newIndex, annualDate: null, annualTime: 0}
                ]
            })
        } else if(type === 'remove') {
            const newAnnualDateList = annualData.annualLeaveDateList.filter(item => {
                return item.index !== annualData.annualLeaveDateList.length || item.index === 1
            })
            setAnnualData({...annualData, annualLeaveDateList: newAnnualDateList})
        }
    }

    // handle annualLeave data
    const handleAnnualData = (type, index, data) => {
        const newAnnualArr = [...annualData.annualLeaveDateList]
        switch(type) {
            case 'dateData':
                newAnnualArr[index] = {...annualData.annualLeaveDateList[index], annualDate: data}
                setAnnualData({...annualData, annualLeaveDateList: newAnnualArr})
                break
            case 'timeData':
                let newData = 0
                if(data < 0) {
                    newData = 0
                } else if (data > 8) {
                    newData = 8
                } else {
                    newData = data
                }
                newAnnualArr[index] = {...annualData.annualLeaveDateList[index], annualTime: newData}
                setAnnualData({...annualData, annualLeaveDateList: newAnnualArr})
                break
            case 'reason':
                const newArr = {...annualData}
                newArr.reason = data
                setAnnualData(newArr)
                break
            default:
                break
        }
    }

    const handleSubmitAnnual = () => {
        const newAnnualLeaveDateList = [
            ...annualData.annualLeaveDateList.map(item => {
                return ({
                    annualDate: item.annualDate,
                    annualTime: item.annualTime
                })
            })
            
        ]
        const newAnnualLeave = 
            annualData.annualLeaveDateList.reduce((total, current) => {
                const currentValue = current.annualTime
                return total + +currentValue
            }, 0) / 8
        const newUserData = {
            ...userData, 
            annualLeave: userData.annualLeave - newAnnualLeave,
            annualLeaveList: [
                ...userData.annualLeaveList,
                {
                    reason: annualData.reason,
                    annualLeaveDateList: newAnnualLeaveDateList
                }
            ]
        }
        // console.log(newUserData)
        dispatch(editUser(newUserData))
        // setAnnualState(false)
    }

    return (
        <Attendance 
            userData={userData}
            selectItem={selectItem}
            workTimeFomated={workTimeFomated}
            attendanceData={attendanceData}
            handleAttendanceUp={handleAttendanceUp}
            endAttendanceData={endAttendanceData}
            handleAttendanceDown={handleAttendanceDown}
            handleChangeAnnualQuantity={handleChangeAnnualQuantity}
            modal={modal}
            setModal={setModal}
            workplace={workplace}
            handleWorkplaceChange={handleWorkplaceChange}
            annualState={annualState}
            setAnnualState={setAnnualState}
            annualData={annualData}
            handleAnnualData={handleAnnualData}
            handleSubmitAnnual={handleSubmitAnnual}
        />
    )
}

export default AttendanceController
