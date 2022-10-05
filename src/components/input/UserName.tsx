import React, { useState } from "react";
import s from '../../App.module.scss';
import { IProps } from "../../model/iprops";





const UserName = ({setError, error, setValue, valueInp}: IProps) => {

  const [text, setText] = useState<string>('')
  const [edit, setEdit] = useState<boolean>(false)



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

    setError({...error, name: true})

    e.target.value = e.target.value.toUpperCase()
    
    setValue({...valueInp, name: e.target.value})

    let regName = /[^a-zA-Z ]/

    if (e.target.value[0] === ' ') {
      setEdit(true)
      setText("Имя не может начинаться с пробела!")
    }
    else if (regName.test(e.target.value)) {
      setEdit(true)
      setText("Только буквы латинского алфавита!")
    }
    else if ( (e.target.value.length < 3 && e.target.value.length !== 0)
      || (e.target.value.includes(' ') && e.target.value.slice(0, e.target.value.indexOf(' ')).length < 3)) {
      setEdit(true)
      setText("Длина имени минимум 3 символа!")
    }
    else if (e.target.value.length >= 30 && !e.target.value.includes(' ')) {
      setEdit(true)
      setText("Максимальная длина имени 30 символов!")
    }
    else if (e.target.value.indexOf(' ') > 0
      && e.target.value.slice(e.target.value.indexOf(' ') + 1, e.target.value.length + 1).length < 3) {
      setEdit(true)
      setText("Длина фамилии минимум 3 символа!")
    }
    else if (e.target.value.indexOf(' ') > 0
      && e.target.value.slice(e.target.value.indexOf(' ') + 1, e.target.value.length + 1).length >= 30) {
      setEdit(true)
      setText("Максимальная длина фамилии 30 символов!")
    }
    else if (!/[a-zA-Z]\s{1}[a-zA-Z]/.test(e.target.value) && e.target.value.length !== 0) {
      setEdit(true)
      setText("Некоректные имя и фамилия!")
    }
    else if (e.target.value.slice(e.target.value.indexOf(' ') + 1,e.target.value.length).includes(' ')) {
      setEdit(true)
      setText("Имя и фамилия уже введены!")
    }
    else {
      setEdit(false)
      setError({...error, name: false})
    }
  }


    return (
        <>
        <div className={s.inputBox}>
            <input onChange={handleChange}
                name="username"
                required
                autoComplete='off'
                value={valueInp.name}
            />
            <span>Имя Фамилия</span>
            <i />
        </div>
  {edit && <div className={s.messError}>{text}</div> }
        </>
        
)
}
export default UserName