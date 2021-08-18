import { useState } from 'react'

const useInput = (validateValue) => {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);
    const validValue = validateValue(value);
    const hasError = !validValue && touched;
    const valueChangeHandler = (e) => {
        setValue(e.target.value)
    };
    const touchedHandler = () => {
        setTouched(true)
    };
    return {
        value:value,
        error: hasError,
        validValue:validValue,
        valueChangeHandler,
        touchedHandler
    }
}

export default useInput
