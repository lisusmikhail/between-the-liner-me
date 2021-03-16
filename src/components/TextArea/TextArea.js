import React, {useState, useEffect} from 'react';
import './text-area.css';
import cn from 'classnames';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopyBtn from '../../images/copy.svg';

function TextArea(props) {
  const {
    analyzeText,
    resetStates,
    handleTypings,
    error,
  } = props;
  
  const [textToCheck, setTextToCheck] = useState('');
  const [isTextReadyToCheck, setIsTextReadyToCheck] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTextLength, setCurrentTextLength] = useState(0);
  const [isCopyToClipboard, setIsCopyToClipboard] = useState(false);
  const minTextLength = 15;
  
  const handleChange = e => {
    const {value} = e.target;
    setIsTyping(!isTyping);
    setTextToCheck(value);
    setCurrentTextLength(textToCheck.length);
  };
  
  const handleBlur = () => {
    handleTypings(false);
  };
  
  const handleClearTxtBtn = e => {
    e.preventDefault();
    setTextToCheck('');
    setCurrentTextLength(0);
    resetStates();
  };
  
  const handleOnCopy = () => {
    (currentTextLength !== 0) && setIsCopyToClipboard(true);
  };
  
  useEffect(() => {
    if (isTextReadyToCheck && isTyping) {
      const timeout = setTimeout(() => {
        analyzeText(textToCheck);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isTextReadyToCheck, isTyping]);
  
  useEffect(() => {
    setIsTyping(true);
    setCurrentTextLength(textToCheck.length);
    (currentTextLength > 1) ? handleTypings(true) : handleTypings(false);
    (!isTextReadyToCheck || error) && resetStates();
  }, [isTyping]);
  
  useEffect(() => {
    (currentTextLength > 1) && handleTypings(true);
    (currentTextLength > minTextLength) ?
        setIsTextReadyToCheck(true) :
        setIsTextReadyToCheck(false);
  }, [currentTextLength]);
  
  useEffect(() => {
    const copyMsgShown = setTimeout(() => {
      setIsCopyToClipboard(false);
    }, 3000);
    return () => clearTimeout(copyMsgShown);
  }, [isCopyToClipboard]);
  
  return (
      <form className='form' name='text-area-form' noValidate>
        <fieldset className='form__field'>
          <label className='form__label'>
            <textarea
                className='form__text-area'
                id='text-area'
                placeholder='Insert text here. 15 characters or more...'
                name='text-area'
                minLength='10'
                maxLength='1200'
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={textToCheck}
                autoComplete='off'
                disabled={false}
            />
          </label>
          <CopyToClipboard text={textToCheck} onCopy={handleOnCopy}>
            <img
                className={cn('copy-to-clipboard',
                    {'copy-to-clipboard_disabled': currentTextLength < 1})}
                src={CopyBtn}
                alt='Copy to clipboard'
            />
          </CopyToClipboard>
          <p
              className={cn('copy-to-clipboard__msg',
                  {'copy-to-clipboard__msg_success': isCopyToClipboard})}
          >copied</p>
          <p
              className={cn('form__hint-msg_disabled', {
                'form__hint-msg': (currentTextLength < minTextLength + 1 &&
                    currentTextLength > 1),
              })}
          >
            not enough characters
          </p>
        </fieldset>
        <button
            type='submit'
            className={cn('form__clear-text-btn',
                {'form__clear-text-btn_disabled': currentTextLength === 0})}
            onClick={handleClearTxtBtn}
            disabled={false}
            id='#btn'
        >
          Clear text
        </button>
      </form>
  );
}

export default TextArea;
