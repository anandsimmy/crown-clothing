import React from 'react'

import './form-input-styles.scss'

const FormInput=({ label, handleChange, ...props }) => {
    return (
        <div className='group'>
            <input className='form-input' onChange={handleChange} {...props}/>
            {
                label ?
                //put null in shrinks place (second shrink) if label upword movement effect needs to work on input focus
                <label className={`${props.value.length ? 'shrink' : 'shrink'} form-input-label`}> 
                    {label}
                </label>
                : null
            }
        </div>
    )
}

export default FormInput