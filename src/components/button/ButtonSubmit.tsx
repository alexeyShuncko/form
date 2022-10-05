import React, { useEffect, useState } from "react";
import s from '../../App.module.scss';
import setting from '../../image/Settings.gif';
import { IProps } from "../../model/iprops";





const ButtonSubmit = ({ setValue, valueInp, error }: IProps) => {

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        let btn = document.querySelector('button')

        const check = (obj: any): boolean => {
            for (const key in obj) {
                if (obj[key].length === 0 
                    || (typeof obj[key] === 'object' &&  obj[key].join('') === '+7 (') 
                    ||  obj[key] === true) {
                  return  true
                }
            }
            return false  
        }
        
        if (check(valueInp) || check(error)) {
            btn!.disabled = true
            btn!.classList.contains(s.full) && btn!.classList.remove(s.full)
        }
        else {
            btn!.disabled = false
            btn!.classList.add(s.full)
        }

    })


    const handlerClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        let btn = e.target as HTMLButtonElement
        btn.disabled = true
        setLoading(true)
        setTimeout(() => {
            setValue({
                email: '',
                name: '',
                tel: [],
                date: ''
            })
            setLoading(false)
            console.log({ ...valueInp, tel: valueInp.tel.join('') })

        }, 2000)

    }

    return (
        <div className={s.btnContainer}>
            <button
                className={s.btn}
                onClick={handlerClick}
                type='button'
            >Отправить</button>
            {loading &&
                <img src={setting}
                    alt='settings'
                    width={'40px'}
                    style={{ marginLeft: '10px'}} />
            }

        </div>
    )
}
export default ButtonSubmit