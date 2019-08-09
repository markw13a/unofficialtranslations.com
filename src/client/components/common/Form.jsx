import React, { useState } from 'react';

/** 
 * Simple wrapper for controlled inputs 
 * Will not be able to directly access value from outside
 * Can still use it by providing an onChange({value}) function
*/
const ControlledFormInput = (props) => {  
    const {onChange, render, initialValue} = props;
    const [value, setValue] = useState(initialValue);

    const onChangeBase = event => {
        const {value} = event.target;

        setValue(value);
        onChange && onChange({value});
    };

    return render({...props, onChange: onChangeBase, value});
}

module.exports = {
    ControlledFormInput
};
