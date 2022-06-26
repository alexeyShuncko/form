import React, { useState } from "react";
import s from './App.module.scss';


const App = (props) => {

  const [edit, setEdit] = useState(false)
  const [text, setText] = useState('')
  const [message, setMessage] = useState(false)
  const [email, setEmail] = useState(false)

  const [tel, setTel] = useState(['+', '7', ' ', '('])
  const [telErr, setTelErr] = useState(false)
  const [telMess, setTelMess] = useState('')



  const active = (e) => {
    let list = [...document.querySelectorAll('input,textarea')]
    list.map(a => a.classList.contains && a.classList.remove(s.active))
    if (list.includes(e.target)) {
      e.target.classList.add(s.active)
    }
  }

  const removeActive = () => {
    let list = [...document.querySelectorAll('input, textarea')]
    list.map(a => a.classList.contains(s.active) && a.classList.remove(s.active))
  }


  const handleChange = (e) => {
    // Удаление сообщения об ошибке
    e.target.nextSibling.classList.contains(s.messErrorReq) && e.target.nextSibling.remove()


    e.target.value = e.target.value.toUpperCase()


    let regName = /[^a-zA-Z ]/


    if (e.target.value.length < 3 
      ||(e.target.value.includes(' ') && e.target.value.slice( 0, e.target.value.indexOf(' ')).length < 3)) {
      e.currentTarget.classList.add(s.error)
      setEdit(true)
      setText("Длина имени минимум 3 символа!")
    }
    else if (e.target.value.length >= 30 && !e.target.value.includes(' ')) {
      e.currentTarget.classList.add(s.error)
      setEdit(true)
      setText("Максимальная длина имени 30 символов!")
    }
    else if (e.target.value.indexOf(' ') > 0
      && e.target.value.slice(e.target.value.indexOf(' ') + 1, e.target.value.length + 1).length < 3) {
      e.currentTarget.classList.add(s.error)
      setEdit(true)
      setText("Длина фамилии минимум 3 символа!")
    }
    else if (e.target.value.indexOf(' ') > 0
      && e.target.value.slice(e.target.value.indexOf(' ') + 1, e.target.value.length + 1).length >= 30) {
      e.currentTarget.classList.add(s.error)
      setEdit(true)
      setText("Максимальная длина фамилии 30 символов!")
    }
    else if (regName.test(e.target.value)) {
      e.currentTarget.classList.add(s.error)
      setEdit(true)
      setText("Только буквы латинского алфавита!")
    }

    else {
      e.currentTarget.classList.contains(s.error) && e.currentTarget.classList.remove(s.error)
      setEdit(false)
    }

  }

  const handleChangeEmail = (e) => {
    e.target.nextSibling.classList.contains(s.messErrorReq) && e.target.nextSibling.remove()
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (e.target.value === '' || reg.test(e.target.value)) {
      e.currentTarget.classList.contains(s.error) && e.currentTarget.classList.remove(s.error)
      setEmail(false)
    }
    else if (!reg.test(e.target.value)) {
      e.currentTarget.classList.add(s.error)
      setEmail(true)
    }
  }



  const maskAdd = (e) => {
    if (tel.length === 0) {
      setTel(['+', '7', ' ', '('])
      e.currentTarget.classList.remove(s.error)
      setTelErr(false)
      setTelMess('')
    }
  }
  const handleChangeTel = (e) => {
    if (e.target.nextSibling.classList.contains(s.messErrorReq)) {
      e.target.nextSibling.remove()
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
  const offFocusTel = (e) => {
    if (tel[0] === '+' && e.target.value.length < 18) {
      e.currentTarget.classList.add(s.error)
      setTelErr(true)
      setTelMess('Некоректный номер!')
    }
  }


  const handleChangeDate = (e) => {
    e.target.nextSibling.classList.contains(s.messErrorReq) && e.target.nextSibling.remove()
    e.currentTarget.classList.contains(s.error) && e.currentTarget.classList.remove(s.error)
  }


  const handleChangeMessage = (e) => {

    e.target.nextSibling.classList.contains(s.messErrorReq) && e.target.nextSibling.remove()

    if (e.target.value.length < 10) {
      e.currentTarget.classList.add(s.error)
      setMessage(true)
    }
    else {
      e.currentTarget.classList.contains(s.error) && e.currentTarget.classList.remove(s.error)
      setMessage(false)
    }
  }



  const submit = () => {

    let form = document.forms.my.elements

    if (!/[a-zA-Z]+\s{1}[a-zA-Z]+$/.test(form.username.value)
      && !form.username.nextSibling.classList.contains(s.messErrorReq)) {
      const mess = document.createElement('div')
      mess.appendChild(document.createTextNode(`Поле  может состоять только из 2-х слов
       латинского алфавита. Минимальная длина  3 символа, максимальная 30. 
      Между словами  1 пробел`))
      mess.classList.add(s.messErrorReq)
      form.username.classList.add(s.error)
      form.username.after(mess)
    }

   else if (form.username.value === '' || form.email.value === ''
      || form.tel.value === '' || form.date.value === '' || form.message.value === '') {
      for (const item of form) {
        if (item.value === '' && item.type !== 'button'
          && !item.nextSibling.classList.contains(s.messErrorReq)) {
          const mess = document.createElement('div')
          mess.appendChild(document.createTextNode('Поле не должно быть пустым!'))
          mess.classList.add(s.messErrorReq)
          item.classList.add(s.error)
          item.after(mess)
        }

      }
    }
   else if (form.tel.value.length === 4) {
      const mess = document.createElement('div')
      mess.appendChild(document.createTextNode(`Введите номер телефона!`))
      mess.classList.add(s.messErrorReq)
      form.tel.classList.add(s.error)
      form.tel.after(mess)
    }
    else {
      let formObj = document.forms.my
      formObj.nextSibling && formObj.nextSibling.remove()

      let btn = document.querySelector('button')
      btn.disabled = true

      // Данные полей формы в виде объекта для отправки на сервер
      let data = {}
      for (const item of form) {
        if (item.type !== 'button') {
          data[item.name] = item.value
        }
      }

      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {

      // Якобы данные с сервера
      let statusJSON = form.message.value
      let textJSON = `Форма отправлена успешно!`
      let textJSONError = `Произошла ошибка при отправке формы!`

          setTimeout(() => {
            btn.disabled = false
            if (statusJSON !== 'errorerror') {
              formObj.reset()
              setTel([])
              const mess = document.createElement('div')
              mess.appendChild(document.createTextNode(textJSON))
              mess.classList.add(s.success)
              mess.addEventListener('click', ()=>{
                formObj.nextSibling && formObj.nextSibling.remove()
              })
              formObj.after(mess)
            }
            else {
              const mess = document.createElement('div')
              mess.appendChild(document.createTextNode(textJSONError))
              mess.classList.add(s.messError)
               mess.addEventListener('click', ()=>{
                formObj.nextSibling && formObj.nextSibling.remove()
              })
              formObj.after(mess)
            }
          }, 2000)
        })
    }

  }


  return (
    <div className={s.container}>
      <div>Форма обратной связи</div>
      <form name="my" onClick={active} onBlur={removeActive} >

        <div className={s.label}>Имя Фамилия</div>
        <input onChange={handleChange}
          name="username"
          pattern='^[a-zA-Z]+\s{1}[a-zA-Z]+$'
          autoComplete='off'
          title="Поле “Имя Фамилия” может состоять только из 2-х слов (имя и фамилия) латинского алфавита. 
        Минимальная длина каждого слова 3 символа, максимальная 30. 
        Между словами может быть только 1 пробел"
        />
        {edit && <div className={s.messError}>{text}</div>}


        <div className={s.label}>E-mail</div>
        <input name="email" 
        autoComplete='off' 
        onChange={handleChangeEmail}
        />
        {email && <div className={s.messError}>Некоректный E-mail!</div>}


        <div className={s.label}>Номер телефона</div>
        <input name="tel"
          maxLength={18}
          value={tel.join('')}
          autoComplete='off'
          type={'tel'}
          onChange={handleChangeTel}
          onClick={maskAdd}
          onBlur={offFocusTel}
        />
        {telErr && <div className={s.messError}>{telMess}</div>}


        <div className={s.label}>Дата рождения</div>
        <input name="date"
        className={s.dateInp} 
        type={'date'} 
        autoComplete='off' 
        onChange={handleChangeDate}
        />


        <div className={s.label}>Сообщение</div>
        <textarea
          name="message"
          className={s.inpMessage}
          maxLength='300'
          onChange={handleChangeMessage}
          autoComplete='off'
        />
        {message && <div className={s.messError}>Минимум 10 символов!</div>}


        <div className={s.btn}>
          <button onClick={submit} type='button' disabled={edit || message || email || telErr}>Отправить</button>
        </div>
      </form>

    </div>
  )
}
export default App