import React, { useState } from "react";
import s from '../App.module.scss';


interface DateInputProps {

}

const DateInput = ({ }: DateInputProps) => {


    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const child = e.target.nextSibling as HTMLElement
        child.classList.contains(s.messErrorReq) && child.remove()
        e.currentTarget.classList.contains(s.error) && e.currentTarget.classList.remove(s.error)
    }


    return (
        <>
            <div className={s.inputBox}>
                <input name="date"
                    className={s.dateInp}
                    type={'date'}
                    autoComplete='off'
                    onChange={handleChangeDate}

                />
                <span>Дата рождения</span>
                <i />
            </div>
        </>
    )
}
export default DateInput