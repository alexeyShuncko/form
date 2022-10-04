import React, { useState } from "react";
import s from '../App.module.scss';


interface EmailProps {
    setError: React.Dispatch<boolean>
    setEmail: React.Dispatch<string>
    email: string
  
}

const Email = ({setEmail, email, setError }: EmailProps) => {


    const [edit, setEdit] = useState<boolean>(false)


    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {

        setEmail(e.target.value)

        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (  e.target.value === '' ||  reg.test(e.target.value)) {
            setEdit(false)
            setError(false)
        }
        else if (!reg.test(e.target.value) ) {
            setEdit(true)
            setError(true)
        }
    }

    return (
        <>
            <div className={s.inputBox}>
                <input name="email"
                    autoComplete='off'
                    required
                    onChange={handleChangeEmail}
                    value={email}
                />
                <span>E-mail</span>
                <i />
            </div>
            {edit && <div className={s.messError}>Некоректный E-mail!</div>}

        </>
    )
}
export default Email