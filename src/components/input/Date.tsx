import React, { useState } from "react";
import s from '../../App.module.scss';
import { ErrorProps } from "../../model/ErrorProps";


const DateInput = ({setError, error}: ErrorProps) => {

    
    const [dateValue, setDateValue] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)


    let min = '1900-10-01'
    
   

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {

        if (new Date(e.target.value) > new Date() || new Date(e.target.value) < new Date(min)) {
            setDateValue(e.target.value)
            setEdit(true)
            setError({...error, date: true})
        }
        else {
            setEdit(false)
            setError({...error, date: false})
            setDateValue(e.target.value)
        }
      
       
    }


    return (
        <>
            <div className={s.inputBox}>
                <input 
                    name="date"
                    className={s.dateInp}
                    type={'date'}
                    autoComplete='off'
                    onChange={handleChangeDate}
                    value={dateValue}
                    required
                />
                <span>Дата рождения</span>
                <i />
            </div>
            {edit && <div className={s.messError}>Некоректная дата!</div> }
        </>
    )
}
export default DateInput