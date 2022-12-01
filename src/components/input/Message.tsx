import React from 'react';
import s from '../App.module.scss';

interface MessageProps {
  setMessage: React.Dispatch<boolean>;
  message: boolean;
}

const Message = ({setMessage, message}: MessageProps) => {
  const handleChangeMessage = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const child = e.target.nextSibling as HTMLElement;
    child.classList.contains(s.messErrorReq) && child.remove();

    if (e.target.value.length < 10) {
      e.currentTarget.classList.add(s.error);
      setMessage(true);
    } else {
      e.currentTarget.classList.contains(s.error) &&
        e.currentTarget.classList.remove(s.error);
      setMessage(false);
    }
  };

  return (
    <>
      <div className={s.inputBox}>
        <textarea
          name="message"
          required
          className={s.inpMessage}
          maxLength={300}
          onChange={handleChangeMessage}
          autoComplete="off"
        />
        <span>Сообщение</span>
        <i />
      </div>
      {message && <div className={s.messError}>Минимум 10 символов!</div>}
    </>
  );
};
export default Message;
