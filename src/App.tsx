import React, { useEffect, useState } from "react";
import s from './App.module.scss';
import ButtonSubmit from "./components/button/ButtonSubmit";
import DateInput from "./components/input/Date";
import Email from "./components/input/Email";
import Phone from "./components/input/Phone";
import UserName from "./components/input/UserName";
import { ErrorInput } from "./model/ErrorProps";



interface dataForm {
  [index: string]: any
}



const App: React.FC = (props) => {

  const [error, setError] = useState<ErrorInput>({
    email: false,
    name: false,
    tel: false,
    date: false
  })
  



  useEffect(() => {

    let form =  document.querySelectorAll('input')
    let arrRes: string[] = []
    form.forEach(a => arrRes.push(a.value))

    let btn = document.querySelector('button')

    
    
    if (error.email || error.name ||  error.tel || error.date || arrRes.includes('')|| arrRes.includes('+7 (')) {
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


    


   
      // setLoading(true)
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
            // setLoading(false)
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


  return (
    <div className={s.container}>
      <div className={s.box}>

        <form name="my">
          <h2>Форма обратной связи</h2>

          <UserName setError={setError} error={error}/>
          <Email error={error} setError={setError} />
          <Phone error={error} setError={setError}/>
          <DateInput error={error} setError={setError}/>


          <ButtonSubmit submitForm={submit}/>

          
        </form>
      </div>



    </div>
  )
}
export default App