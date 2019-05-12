import React, { useState } from 'react';

/** 
 * Simple wrapper for controlled inputs 
 * Will not be able to directly access value from outside
 * Can still use it by providing an onChange({value}) function
*/
const ControlledFormInput = (props) => {  
    const {onChange, render} = props;
    const [value, setValue] = useState();

    const defaultOnChange = event => {
        const {value} = event.target;

        setValue(value);
        onChange && onChange({value});
    };

    return render({...props, onChange: defaultOnChange, value});
}

module.exports = {
    ControlledFormInput
};