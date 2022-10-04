import React, { useEffect, useState } from "react";
import s from './App.module.scss';
import DateInput from "./components/Date";
import Email from "./components/Email";
import Phone from "./components/Phone";
import UserName from "./components/UserName";
import setting from './image/Settings.gif';



interface dataForm {
  [index: string]: any
}


const App: React.FC = (props) => {

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')


  const [error, setError] = useState<boolean>(false)
  

  const [message, setMessage] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {

   
    let btn = document.querySelector('button')

    
    
    if (error || !name || !email) {
      btn!.disabled = true
      btn!.classList.contains(s.full)  && btn!.classList.remove(s.full)
    }
    else {
      btn!.disabled = false
      btn!.classList.add(s.full)
  }

  })


  const submit = (): void => {


    let form = [...document.forms[0].elements]
    const username = form[0] as HTMLInputElement
    const email = form[1] as HTMLInputElement
    const tel = form[2] as HTMLInputElement
    const date = form[3] as HTMLInputElement
    const message = form[4] as HTMLTextAreaElement

    const childUsername = username.nextSibling as HTMLElement


    if (!/[a-zA-Z]+\s{1}[a-zA-Z]+$/.test(username.value)
      && !childUsername.classList.contains(s.messErrorReq)) {
      const mess = document.createElement('div')
      mess.appendChild(document.createTextNode(`Поле  может состоять только из 2-х слов
       латинского алфавита. Минимальная длина  3 символа, максимальная 30. 
      Между словами  1 пробел`))
      mess.classList.add(s.messErrorReq)
      username.classList.add(s.error)
      username.after(mess)
    }

    else if (username.value === '' || email.value === ''
      || tel.value === '' || date.value === '' || message.value === '') {
      for (const item of form) {
        const el = item as HTMLInputElement
        const child = el.nextSibling as HTMLElement
        if (el.value === '' && el.type !== 'button'
          && !child.classList.contains(s.messErrorReq)) {
          const mess = document.createElement('div')
          mess.appendChild(document.createTextNode('Поле не должно быть пустым!'))
          mess.classList.add(s.messErrorReq)
          item.classList.add(s.error)
          item.after(mess)
        }

      }
    }
    else if (tel.value.length === 4) {
      const mess = document.createElement('div')
      mess.appendChild(document.createTextNode(`Введите номер телефона!`))
      mess.classList.add(s.messErrorReq)
      tel.classList.add(s.error)
      tel.after(mess)
    }
    else {
      setLoading(true)
      let formObj = document.forms[0]
      formObj.nextSibling && formObj.nextSibling.remove()

      let btn = document.querySelector('button') as HTMLButtonElement
      btn.disabled = true

      // Данные полей формы в виде объекта для отправки на сервер

      let data = {} as dataForm
      for (const item of form) {
        const el = item as HTMLFormElement
        if (el.type !== 'button') {
          data[el.name] = el.value
        }
      }

      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => {

          // Якобы данные с сервера
          let statusJSON = message.value
          let textJSON = `Форма отправлена успешно!`
          let textJSONError = `Произошла ошибка при отправке формы!`

          setTimeout(() => {
            setLoading(false)
            btn!.disabled = false
            if (statusJSON !== 'errorerror') {
              formObj.reset()
              // setTel([])
              const mess = document.createElement('div')
              mess.appendChild(document.createTextNode(textJSON))
              mess.classList.add(s.success)
              mess.addEventListener('click', () => {
                formObj.nextSibling && formObj.nextSibling.remove()
              })
              formObj.after(mess)
            }
            else {
              const mess = document.createElement('div')
              mess.appendChild(document.createTextNode(textJSONError))
              mess.classList.add(s.messError)
              mess.addEventListener('click', () => {
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
      <div className={s.box}>

        <form name="my">
          <h2>Форма обратной связи</h2>

          <UserName name={name} setName={setName} setError={setError}/>
          <Email  email={email} setEmail={setEmail} setError={setError} />
          <Phone />
          <DateInput />

          <div >
            <button
              className={s.btn}
              onClick={submit}
              type='button'
             >Отправить</button>
            {loading &&
              <img src={setting}
                alt='settings'
                width={'45px'}
                style={{ marginLeft: '10px' }} />
            }

          </div>
        </form>
      </div>



    </div>
  )
}
export default App