import React from "react";
import s from '../../App.module.scss';



interface IModalProps {
    setModal: React.Dispatch<boolean>
}


const ModalForm = ({ setModal }: IModalProps) => {



    const handler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setModal(false)
        }
    }

    return (
        <div className={s.modal} onClick={handler}>
            <div className={s.content} >
                <div>Форма отправлена успешно!</div>
                <button className={`${s.btn} ${s.full}`} onClick={() => setModal(false)}
                >Закрыть</button>
            </div>
        </div>
    )

}
export default ModalForm