import { useState } from "react";

export default function Square() {

    const [value, setValue] = useState(null)

    function handleClick() {
        setValue('x')
    }

    return (
        <button 
            className="square"
            onClick={handleClick}
        >
            { value }
        </button>)
}