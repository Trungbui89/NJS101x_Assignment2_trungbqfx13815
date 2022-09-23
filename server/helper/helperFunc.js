exports.checkAnnualList = (req, res, next) => {
    const annualLeaveList = req.body.annualLeaveList

    if(!annualLeaveList || annualLeaveList.length <= 0) {
        return next()
    } else {
        annualLeaveList.forEach(element => {
            element.annualLeaveDateList.forEach(ele => {
                if(!ele.annualDate) 
                    return res.status(422).json({ message: 'Ngày nghỉ không được trống' })
                else if(!ele.annualTime || ele.annualTime < 0 || ele.annualTime > 8) 
                    return res.status(422).json({ message: 'Giới hạn thời gian nghỉ phép trong ngày: từ 0 đến 8 tiếng' })
                else 
                    return next()
            })
        })
    }
}