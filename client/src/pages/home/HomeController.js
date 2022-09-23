import React from "react"
import { useDispatch, useSelector } from "react-redux"
import HomeView from './Home'
import { updateImage } from '../../store/action/fileAction'
import { editUser } from "../../store/action/authAction"

const Home = () => {
    const userData = useSelector((state) => state.authReducer.authData)
    const imgData = useSelector((state) => state.fileReducer.imgData)
    const dispatch = useDispatch()
    const [modalStatus, setModalStatus] = React.useState(false)

    const onImgChange = async (e) => {
        if(e.target.files && e.target.files[0]) {
            const data = new FormData() 
            data.append('file', e.target.files[0])
            await dispatch(updateImage(data, e.target.name))
            setModalStatus(true)
        }
    }

    const handleUploadImg = async (e) => {
        e.preventDefault()
        const ReqImgData = imgData.data
        const user = 
            imgData.imgType === 'profilePicture' 
            ? 
                {...userData, profilePicture: ReqImgData}
            :
                {...userData, coverPicture: ReqImgData}
        await dispatch(editUser(user))
        setModalStatus(false)
    }

    return (
        <HomeView 
            userData={userData}
            modalStatus={modalStatus}
            onImgChange={onImgChange}
            setModalStatus={setModalStatus}
            handleUploadImg={handleUploadImg}
            imgData={imgData}
        />
    )
}

export default Home