import React, { useState } from "react";
import s from '../App.module.scss';


interface  PhoneProps  {

}

const Phone =({}: PhoneProps)=> {


    const [tel, setTel] = useState<string[]>([])
    const [telErr, setTelErr] = useState<boolean>(false)
    const [telMess, setTelMess] = useState<string>('')


    const maskAdd = (e: React.MouseEvent<HTMLInputElement>): void => {
        if (tel.length === 0) {
          setTel(['+', '7', ' ', '('])
          e.currentTarget.classList.remove(s.error)
          setTelErr(false)
          setTelMess('')
        }
      }
      const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const child = e.target.nextSibling as HTMLElement
        if (child.classList.contains(s.messErrorReq)) {
          child.remove()
          e.currentTarget.classList.remove(s.error)
        }
    
        let regTel = /[^0-9 \-)(+]/
    
        if (e.target.value.length < tel.length) {
          tel.pop()
          setTel([...tel])
        }
        else if (e.target.value.length === 3 && tel[0] === '+') {
          setTel([...tel, ' ', '(', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 4 && tel[0] === '+') {
          setTel([...tel, '(', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 7 && tel[0] === '+') {
          setTel([...tel, e.target.value.slice(-1), ')', ' '])
        }
        else if (e.target.value.length === 8 && tel[0] === '+') {
          setTel([...tel, ')', ' ', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 12) {
          setTel([...tel, e.target.value.slice(-1), '-'])
        }
        else if (e.target.value.length === 13 && tel[0] === '+') {
          setTel([...tel, '-', e.target.value.slice(-1)])
        }
        else if (e.target.value.length === 15) {
          setTel([...tel, e.target.value.slice(-1), '-'])
        }
        else if (e.target.value.length === 16 && tel[0] === '+') {
          setTel([...tel, '-', e.target.value.slice(-1)])
        }
        else if (tel[0] !== '+' && e.target.value.length === 10) {
          setTelErr(false)
          setTelMess('')
          e.currentTarget.classList.remove(s.error)
          setTel(['+', '7', ' ', '(', e.target.value.charAt(0), e.target.value.charAt(1), e.target.value.charAt(2),
            ')', ' ', e.target.value.charAt(3), e.target.value.charAt(4), e.target.value.charAt(5), '-',
            e.target.value.charAt(6), e.target.value.charAt(7), '-', e.target.value.charAt(8), e.target.value.charAt(9)])
        }
        else if (tel[0] === '+' && e.target.value.length === 18) {
          setTelErr(false)
          setTelMess('')
          setTel([...tel, e.target.value.slice(-1)])
          e.currentTarget.classList.remove(s.error)
        }
    
        else if (!regTel.test(e.target.value)) {
          setTel([...tel, e.target.value.slice(-1)])
        }
    
        e.target.value = e.target.value.replace(regTel, '')
    
        if (tel[0] !== '+' && e.target.value.length < 10) {
          e.currentTarget.classList.add(s.error)
          setTelErr(true)
          setTelMess('Минимум 10 цифр!')
        }
      }
      const offFocusTel = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (tel.length === 4) {
    setTel([])
        }
        else if (tel[0] === '+' && e.target.value.length < 18) {
          e.currentTarget.classList.add(s.error)
          setTelErr(true)
          setTelMess('Некоректный номер!')
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
          {telErr && <div className={s.messError}>{telMess}</div>}
</>
    )
}
export default Phone