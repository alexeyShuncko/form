import React, {useState} from 'react';
import s from './App.module.scss';
import ButtonSubmit from './components/button/ButtonSubmit';
import DateInput from './components/input/Date';
import Email from './components/input/Email';
import Phone from './components/input/Phone';
import UserName from './components/input/UserName';
import ModalForm from './components/modal/ModalForm';
import {ErrorInput, ValueInput} from './model/iprops';

const App: React.FC = props => {
  const [error, setError] = useState<ErrorInput>({
    email: false,
    name: false,
    tel: false,
    date: false,
  });
  const [valueInp, setValue] = useState<ValueInput>({
    email: '',
    name: '',
    tel: [],
    date: '',
  });
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className={s.container}>
      <div className={s.box}>
        <form name="my">
          <h2>Форма обратной связи</h2>
          <UserName
            setError={setError}
            error={error}
            setValue={setValue}
            valueInp={valueInp}
          />
          <Email
            error={error}
            setError={setError}
            setValue={setValue}
            valueInp={valueInp}
          />
          <Phone
            error={error}
            setError={setError}
            setValue={setValue}
            valueInp={valueInp}
          />
          <DateInput
            error={error}
            setError={setError}
            setValue={setValue}
            valueInp={valueInp}
          />
          <ButtonSubmit
            modal={modal}
            setModal={setModal}
            error={error}
            setError={setError}
            valueInp={valueInp}
            setValue={setValue}
          />
        </form>
      </div>
      {modal && <ModalForm setModal={setModal} />}
    </div>
  );
};
export default App;
