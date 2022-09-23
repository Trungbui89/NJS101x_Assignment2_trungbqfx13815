import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Covid19 from './Covid19'
import { registerTemperature, vaccineRegister, infectionRegister } from '../../store/api/covidRequest'

export default function Covid19Controller() {

    const userData = useSelector((state) => state.authReducer.authData)
    
    const [temperature, setTemperature] = useState({date: null, temperature: 0})
    const [tempResData, setTempResData] = useState(null)

    const handleTemperature = (type, data) => {
        switch(type) {
            case 'date':
                setTemperature({...temperature, date: data})
                break
            case 'temp':
                setTemperature({...temperature, temperature: data})
                break
            default:
                break
        }
    }

    const getTemperature = (e) => {
        e.preventDefault()
        registerTemperature({...temperature, userId: userData._id})
        .then(result => {
            setTempResData(result.data.temperature)
        })
        .then(() => {
            setModalState(true)
        })
        .catch(err => console.log('err'))
    }

    // vaccine register state
    const [vaccineInputList, setVaccineInputList] = useState([{
        index: 1,
        date: null,
        type: 'AstraZeneca',
    }])
    const [vaccineResData, setVaccineResData] = useState(null)

    // handle vaccine input change
    const handleVaccineInputChange = (type, index, data) => {
        const newVacArr = [...vaccineInputList]
        switch(type) {
            case 'injectionDate':
                newVacArr[index] = {...newVacArr[index], date: data}
                setVaccineInputList(newVacArr)
                break
            case 'injectionType':
                newVacArr[index] = {...newVacArr[index], type: data}
                setVaccineInputList(newVacArr)
                break
            default:
                break
        }
    }

    // handle add/remove vaccine input
    const handleChangeVaccineQuantity = (type) => {
        if(type === 'add') {
            const newIndex = vaccineInputList[vaccineInputList.length - 1].index + 1
            setVaccineInputList([
                ...vaccineInputList,
                {
                    index: newIndex,
                    date: null,
                    type: 'AstraZeneca',
                }
            ])
        } else if(type === 'remove') {
            const newVaccineInputList = vaccineInputList.filter(item => {
                return item.index !== vaccineInputList.length || item.index === 1
            })
            setVaccineInputList(newVaccineInputList)
        }
    }

    // vaccine register submit
    const handleVaccineSubmit = () => {
        const vaccineSubmitData = {
            userId: userData._id,
            injectionList: vaccineInputList.map(ele => {
                return {
                    date: ele.date,
                    type: ele.type
                }
            })
        }
        vaccineRegister(vaccineSubmitData)
            .then(result => {
                setVaccineResData(result.data.vaccine)
            })
            .then(() => setModalState(true))
            .catch(err => console.log(err))
    }

    // infection state
    const [infectionState, setInfectionState] = useState('Dương tính')
    const [infectionData, setInfectionData] = useState(null)

    // handle infection submit
    const handleInfectionSubmit = () => {
        infectionRegister({
            userId: userData._id,
            state: infectionState
        })
        .then(result => {
            setInfectionData(result.data)
        })
        .then(() => {
            setModalState(true)
        })
        .catch(err => console.log(err))
    }

    // handle modalState
    const [modalState, setModalState] = useState(false)
    
    const handleModalClose = () => {
        setModalState(false)
        setTempResData(null)
        setVaccineResData(null)
        setInfectionData(null)
    }

    return (
        <Covid19 
            temperature={temperature}
            handleTemperature={handleTemperature}
            getTemperature={getTemperature}
            tempResData={tempResData}
            modalState={modalState}
            handleModalClose={handleModalClose}
            vaccineInputList={vaccineInputList}
            handleVaccineInputChange={handleVaccineInputChange}
            handleChangeVaccineQuantity={handleChangeVaccineQuantity}
            handleVaccineSubmit={handleVaccineSubmit}
            vaccineResData={vaccineResData}
            infectionState={infectionState}
            setInfectionState={setInfectionState}
            handleInfectionSubmit={handleInfectionSubmit}
            infectionData={infectionData}
        />
    )
}
