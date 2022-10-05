import React, { useState } from "react";
import s from '../../App.module.scss';
import { ErrorProps } from "../../model/ErrorProps";




const Phone = ({setError, error}: ErrorProps) => {


    const [tel, setTel] = useState<string[]>([])
    const [telErr, setTelErr] = useState<boolean>(false)



    const maskAdd = (e: React.MouseEvent<HTMLInputElement>): void => {
        if (tel.length === 0) {
            setTel(['+', '7', ' ', '('])
            setTelErr(false)
        }
    }



    const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement> ): void => {

        let regTel = /[^0-9]/
    

      if (e.target.value.length < 18 && e.target.value.length !== 3 
        && e.target.value.length !== 4 &&  !regTel.test(e.target.value.slice(-1))) {
        setTelErr(true)
        setError({...error, tel:true})
      }
      else if ( e.target.value.length === 3 
        || e.target.value.length === 4 ) {
        setTelErr(false) 
        setError({...error, tel:false})
      }
        


        if(e.target.value.length < tel.length && tel.length === 4) {
           return
        }
        else if (e.target.value.length < tel.length) {
            tel.pop()
            setTel([...tel])
        }
        else if (regTel.test(e.target.value.slice(-1))) {
            e.target.value = e.target.value.slice(-1).replace(regTel, '')
        }
        else if (e.target.value.length === 3 ) {
            setTel([...tel, ' ', '(', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 4 ) {
            setTel([...tel, '(', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 7 ) {
            setTel([...tel, e.target.value.slice(-1), ')', ' '])
        }
        else if (e.target.value.length === 8 ) {
            setTel([...tel, ')', ' ', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 12) {
            setTel([...tel, e.target.value.slice(-1), '-'])
        }
        else if (e.target.value.length === 13 ) {
            setTel([...tel, '-', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 15) {
            setTel([...tel, e.target.value.slice(-1), '-'])
        }
        else if (e.target.value.length === 16 ) {
            setTel([...tel, '-', e.target.value.slice(-1)])
        }
        else if (!regTel.test(e.target.value.slice(-1)) && e.target.value.length === 18) {
            setTel([...tel, e.target.value.slice(-1)])
            setTelErr(false) 
            setError({...error, tel:false})
        }
        else if (!regTel.test(e.target.value.slice(-1))) {
            setTel([...tel, e.target.value.slice(-1)])
        }
      
       
       
    }


    const offFocusTel = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (tel.length === 4) {
            setTel([])
        }
    }



    return (
        <>

            <div className={s.inputBox}>
                <input name="tel"
                    required
                    maxLength={18}
                    value={tel.join('')}
                    autoComplete='off'
                    type={'tel'}
                    onChange={handleChangeTel}
                    onClick={maskAdd}
                    onBlur={offFocusTel}
                />
                <span>Номер телефона</span>
                <i />
            </div>
            {telErr && <div className={s.messError}>Некоректный номер!</div>}
        </>
    )
}
export default Phone