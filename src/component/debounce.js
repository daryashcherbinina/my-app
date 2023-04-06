import React, { useEffect, useState } from 'react'

export const useDebounce =(inputValue, delay = 500)=> {
    const [debounceInput, setDebounceInput] = useState(inputValue)
    useEffect(() => {
        const timer = setTimeout(()=>setDebounceInput(inputValue), delay);
        return() => {
            clearTimeout(timer)
        }
        }, [inputValue,delay]);
        return debounceInput;
    
};