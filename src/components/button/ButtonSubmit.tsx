import React, { useState } from "react";
import s from '../../App.module.scss';
import setting from '../../image/Settings.gif';

interface ButtonSubmitProps {
    submitForm: ()=> void
}



const ButtonSubmit = ({submitForm}:ButtonSubmitProps) => {

    const [loading, setLoading] = useState<boolean>(false)


    return (
        <div >
            <button
                className={s.btn}
                onClick={submitForm}
                type='button'
            >Отправить</button>
            {loading &&
                <img src={setting}
                    alt='settings'
                    width={'45px'}
                    style={{ marginLeft: '10px' }} />
            }

        </div>
    )
}
export default ButtonSubmit