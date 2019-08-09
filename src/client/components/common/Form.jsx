import React, { useState } from 'react';

/** 
 * Simple wrapper for controlled inputs 
 * Will not be able to directly access value from outside
 * Can still use it by providing an onChange({value}) function
*/
const ControlledFormInput = ({onChange, render, initialValue, ...otherProps}) => {  
    const [value, setValue] = useState(initialValue);

    const onChangeBase = event => {
        const {value} = event.target;

        setValue(value);
        onChange && onChange({value});
    };

    return render({...otherProps, onChange: onChangeBase, value});
}

module.exports = {
    ControlledFormInput
};
