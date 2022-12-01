import React, {useState} from 'react';
import s from '../../App.module.scss';
import {IProps} from '../../model/iprops';

const Phone = ({setError, error, setValue, valueInp}: IProps) => {
  const [telErr, setTelErr] = useState<boolean>(false);

  const maskAdd = (e: React.MouseEvent<HTMLInputElement>): void => {
    if (valueInp.tel.length === 0) {
      setValue({...valueInp, tel: ['+', '7', ' ', '(']});
      setTelErr(false);
    }
  };

  const handleChangeTel = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let regTel = /[^0-9]/;

    if (
      e.target.value.length < 18 &&
      e.target.value.length !== 3 &&
      e.target.value.length !== 4 &&
      !regTel.test(e.target.value.slice(-1))
    ) {
      setTelErr(true);
      setError({...error, tel: true});
    } else if (e.target.value.length === 3 || e.target.value.length === 4) {
      setTelErr(false);
      setError({...error, tel: false});
    }

    if (
      e.target.value.length < valueInp.tel.length &&
      valueInp.tel.length === 4
    ) {
      return;
    } else if (e.target.value.length < valueInp.tel.length) {
      valueInp.tel.pop();
      setValue({...valueInp, tel: [...valueInp.tel]});
    } else if (regTel.test(e.target.value.slice(-1))) {
      e.target.value = e.target.value.slice(-1).replace(regTel, '');
    }
    // else if (e.target.value.length === 3 ) {
    //     setTel([...tel, ' ', '(', e.target.value.slice(-1)])
    // }
    // else if (e.target.value.length === 4 ) {
    //     setTel([...tel, '(', e.target.value.slice(-1)])
    // }
    else if (e.target.value.length === 7) {
      setValue({
        ...valueInp,
        tel: [...valueInp.tel, e.target.value.slice(-1), ')', ' '],
      });
    } else if (e.target.value.length === 8) {
      setValue({
        ...valueInp,
        tel: [...valueInp.tel, ')', ' ', e.target.value.slice(-1)],
      });
    } else if (e.target.value.length === 12) {
      setValue({
        ...valueInp,
        tel: [...valueInp.tel, e.target.value.slice(-1), '-'],
      });
    } else if (e.target.value.length === 13) {
      setValue({
        ...valueInp,
        tel: [...valueInp.tel, '-', e.target.value.slice(-1)],
      });
    } else if (e.target.value.length === 15) {
      setValue({
        ...valueInp,
        tel: [...valueInp.tel, e.target.value.slice(-1), '-'],
      });
    } else if (e.target.value.length === 16) {
      setValue({
        ...valueInp,
        tel: [...valueInp.tel, '-', e.target.value.slice(-1)],
      });
    } else if (
      !regTel.test(e.target.value.slice(-1)) &&
      e.target.value.length === 18
    ) {
      setValue({...valueInp, tel: [...valueInp.tel, e.target.value.slice(-1)]});
      setTelErr(false);
      setError({...error, tel: false});
    } else if (!regTel.test(e.target.value.slice(-1))) {
      setValue({...valueInp, tel: [...valueInp.tel, e.target.value.slice(-1)]});
    }
  };

  const offFocusTel = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (valueInp.tel.length === 4) {
      setValue({...valueInp, tel: []});
    }
  };

  return (
    <>
      <div className={s.inputBox}>
        <input
          name="tel"
          required
          maxLength={18}
          value={valueInp.tel.join('')}
          autoComplete="off"
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
  );
};
export default Phone;
