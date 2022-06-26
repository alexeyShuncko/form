import React, { useState } from "react";
import s from './FormApp.module.css';
import { ReactComponent as Eye } from "../../image/eye.svg";


const FormApp = (props) => {

    const [err, setErr] = useState(false)
    const [textErr, setTextErr] = useState('')

    const [val, setVal] = useState([])
    const [edit, setEdit] = useState(false)


    const focus = () => {
        document.getElementById('namePlas').classList.add(s.anim)
        document.getElementById('container').classList.add(s.activeInput)
        document.getElementById('inp').focus()
    }


    const addClass = (e) => {

        document.getElementById('namePlas').classList.add(s.anim)
        document.getElementById('container').classList.add(s.activeInput)
        if (document.getElementById('passApp').style.color !== 'var(--second-red)') {
            document.getElementById('passApp').style.color = 'var(--primary-blue)'
        }
    }

    const removeClass = (e) => {
        if (!e.target.value) {
            document.getElementById('namePlas').classList.remove(s.anim)
        }
        document.getElementById('container').classList.remove(s.activeInput)
        if (document.getElementById('passApp').style.color !== 'var(--second-red)') {
            document.getElementById('passApp').style.color = ''
        }
    }


    const handleChange = (e) => {

        // Если удалили всё 
        if (e.target.value.length === 0) {
            setEdit(false)
            setVal([])
        }
        // "Backspace"
        if (e.target.value.length < val.length) {
            val.pop()
        }
        else {
            val.push(e.target.value.slice(-1))
            setEdit(true)
        }
        // Каждый символ заменяем на звёздочку
        e.target.value = e.target.value.replace(/[\s\S]/g, "*")

        // Валидация
        if (e.target.value.length === 2) {
            setErr(true)
            setTextErr('Недостаточная длинна!')
            document.getElementById('passApp').style.color = 'var(--second-red)'
            document.getElementById('container').classList.add(s.errInput)
            e.target.style.color = 'var(--second-red)'
        }
        else {
            setErr(false)
            document.getElementById('passApp').style.color = 'var(--primary-blue)'
            document.getElementById('container').classList.remove(s.errInput)
            e.target.style.color = ''
        }

    }



    const visibl = () => {
        if (document.getElementById('passApp').style.color === '') {
            document.getElementById('passApp').style.color = 'var(--primary-blue)'
        }
        if (document.getElementById('inp').value.includes('*')) {
            document.getElementById('inp').value = val.join('')
        }
        else {
            document.getElementById('inp').value = document.getElementById('inp').value.replace(/[\s\S]/g, "*")
        }
        document.getElementById('container').classList.toggle(s.activeInput)
    }

    const subClick = (e) => {
      
        if (val.length === 3) {
            setErr(true)
            setTextErr('3 символа мало!')
            document.getElementById('passApp').style.color = 'var(--second-red)'
            document.getElementById('container').classList.add(s.errInput)
            document.getElementById('inp').style.color = 'var(--second-red)'
        }
        else  
   
        window.location.reload()
    }



    return (
        <div className={s.formApp}>
            <div>

                <div id='passApp'>Пароль:</div>
                <div className={s.container} id='container'
                    onClick={focus}
                >
                    <span
                        className={s.plaseholder} id='namePlas'>Пароль</span>
                    <input
                        maxLength={8}
                        id='inp'
                        onChange={handleChange}
                        onClick={addClass}
                        className={s.passApp}
                        onBlur={removeClass}></input>
                    {edit
                        ? <Eye onClick={visibl} className={s.eye} />
                        : null
                    }

                </div>
                {err
                    ? <div className={s.errMess}>{textErr}</div>
                    : null
                }
            </div>
            <button className={s.formBut} onClick={subClick}>Отправить</button>

        </div>
    )
}


export default FormApp