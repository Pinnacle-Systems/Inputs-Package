import React from "react";

export const handleOnChange = (event, setValue) => {
    const inputValue = event.target.value;
    const inputSelectionStart = event.target.selectionStart;
    const inputSelectionEnd = event.target.selectionEnd;

    const upperCaseValue = inputValue.toUpperCase();

    const valueBeforeCursor = upperCaseValue.slice(0, inputSelectionStart);
    const valueAfterCursor = upperCaseValue.slice(inputSelectionEnd);

    setValue(valueBeforeCursor + inputValue.slice(inputSelectionStart, inputSelectionEnd) + valueAfterCursor);

    setTimeout(() => {
        event.target.setSelectionRange(valueBeforeCursor.length + inputValue.slice(inputSelectionStart, inputSelectionEnd).length, valueBeforeCursor.length + inputValue.slice(inputSelectionStart, inputSelectionEnd).length);
    });
};


export const TextInput = ({ name, type, value, setValue, readOnly, className, required = false, disabled = false, tabIndex = null, onBlur = null, onKeyDown, min }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center md:my-0.5 md:px-1 data gap-1'>
            <label className={`md:text-start flex ${className}`}>{required ? <RequiredLabel name={name} /> : name}</label>
            <input min={min} onKeyDown={onKeyDown} onBlur={onBlur} tabIndex={tabIndex ? tabIndex : 0} type={type} disabled={disabled} required={required} className='input-field focus:outline-none md:col-span-2 border-gray-500 border rounded' value={value} onChange={(e) => { type === "number" ? setValue(e.target.value) : handleOnChange(e, setValue) }} readOnly={readOnly} />
        </div>
    )
}

export const LongTextInput = ({ name, type, value, setValue, className, readOnly, required = false, disabled = false, tabIndex = null }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 items-center md:my-0.5 md:px-1 data gap-1'>
            <label className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : name}</label>
            <input tabIndex={tabIndex ? tabIndex : undefined} type={type} disabled={disabled} required={required} className={className} value={value} onChange={(e) => { type === "number" ? setValue(e.target.value) : handleOnChange(e, setValue) }} readOnly={readOnly} />
        </div>
    )
}

export const DisabledInput = ({ name, type, value, className = "", textClassName = "", tabIndex = null }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 items-center md:my-0.5 md:px-1 data  ${className}`}>
            <label className={`md:text-start flex ${className} `}>{name}</label>
            <input tabIndex={tabIndex ? tabIndex : undefined} type={type} className={`input-field ${textClassName} focus:outline-none md:col-span-2 border border-gray-500 rounded`} value={value} disabled />
        </div>
    )
}

export const LongDisabledInput = ({ name, type, value, className, tabIndex = null }) => {
    return (
        <div className={`grid grid-flow-col  items-center md:my-0.5 md:px-1 data ${className}`}>
            <label className={`md:text-start flex ${className} `}>{name}</label>
            <input type={type} className={`h-6 border border-gray-500 rounded`} value={value} disabled />
        </div>
    )
}

export const TextArea = ({ name, value, setValue, readOnly, required = false, disabled = false, rows = 2, cols = 30, tabIndex = null }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 md:my-1 md:px-1 data'>
            <label className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <textarea tabIndex={tabIndex ? tabIndex : undefined} name={name} disabled={disabled} required={required} className='focus:outline-none md:col-span-2 border border-gray-500 rounded' cols={cols} rows={rows} value={value} onChange={(e) => { handleOnChange(e, setValue); }} readOnly={readOnly}></textarea>
        </div>
    )
}

export const DropdownInput = ({ name, beforeChange = () => { }, onBlur = null, options, value, setValue, defaultValue, className, readOnly, required = false, disabled = false, clear = false, tabIndex = null, autoFocus = false }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-cols-3 items-center md:my-1 md:px-1 data'>
            <label className={`md:text-start flex ${className}`}>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <select
                onBlur={onBlur}
                autoFocus={autoFocus} tabIndex={tabIndex ? tabIndex : undefined} defaultValue={defaultValue} id='dd'
                required={required} name="name" className='input-field border border-gray-500 md:col-span-2 col-span-1 rounded'
                value={value} onChange={(e) => { beforeChange(); handleOnChange(e); }} disabled={readOnly}>
                <option value="" hidden={!clear}>Select</option>
                {options.map((option, index) => <option key={index} value={option.value} >
                    {option.show}
                </option>)}
            </select>
        </div>
    )
}

export const LongDropdownInput = ({ name, options, value, setValue, defaultValue, className, readOnly, required = false,
    disabled = false, clear = false, tabIndex = null }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-cols-12 items-center md:my-1 md:px-1 data'>
            <label className={`text-start col-span-2 `}>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <select tabIndex={tabIndex ? tabIndex : undefined} defaultValue={defaultValue} id='dd' required={required} name="name"
                className={`border border-gray-500 h-6 rounded ${className} col-span-10`} value={value} onChange={(e) => { handleOnChange(e); }} disabled={readOnly}>
                <option value="">Select</option>
                {options.map((option, index) => <option key={index} value={option.value} >
                    {option.show}
                </option>)}
            </select>
        </div>
    )
}

export const RadioButton = ({ label, value, onChange, readOnly, className, tabIndex = null }) => {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            <input type="radio" tabIndex={tabIndex ? tabIndex : undefined} checked={value} onChange={onChange} />
            <label>
                {label}
            </label>
        </div>
    );
};


export const DropdownInputWithoutLabel = ({ options, value, setValue, readOnly, required = false, disabled = false, tabIndex = null }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center md:my-1 md:px-1 data'>
            <select tabIndex={tabIndex ? tabIndex : undefined} required={required} name="name" className='input-field md:col-span-2 border col-span-1 rounded' value={value} onChange={(e) => { handleOnChange(e); }} disabled={readOnly}>
                <option value="" hidden>Select</option>
                {options.map((option, index) => <option key={index} value={option.value} >{option.show}</option>)}
            </select>
        </div>
    )
}


export const CurrencyInput = ({ name, value, setValue, readOnly, required = false, disabled = false, tabIndex = null }) => {
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center md:my-1 md:px-1 data'>
            <label htmlFor="id" className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input tabIndex={tabIndex ? tabIndex : undefined} type="number" disabled={disabled} required={required} className='input-field focus:outline-none md:col-span-2 border rounded' min="1" step="any" id='id' value={value} onChange={(e) => { handleOnChange(e); }} readOnly={readOnly} />
        </div>
    )
}

const RequiredLabel = ({ name }) => <p>{`${name}`}<span className="text-red-500">*</span> </p>



export const DateInput = ({ name, value, setValue, readOnly, required = false, type = "date", disabled = false, tabIndex = null, inputClass }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 items-center md:my-1 md:px-1 data w-full'>
            <label htmlFor="id" className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input tabIndex={tabIndex ? tabIndex : undefined} type={type} disabled={disabled} required={required}
                className={`input-field focus:outline-none md:col-span-2 border border-gray-500 rounded w-full ${inputClass}`} id='id' value={value} onChange={(e) => { setValue(e.target.value); }} readOnly={readOnly} />
        </div>
    )
}

export const LongDateInput = ({ name, value, setValue, readOnly, className, required = false, type = "date", disabled = false, tabIndex = null }) => {

    return (
        <div className='grid grid-flow-col item-center justify-center gap-12 w-56 items-center md:px-1 data'>
            <label htmlFor="id" className='md:text-start flex'>{required ? <RequiredLabel name={name} /> : `${name}`}</label>
            <input tabIndex={tabIndex ? tabIndex : undefined} type={type} disabled={disabled} required={required} className={`${className} focus:outline-none border border-gray-500 form-border-color rounded h-6`} id='id' value={value} onChange={(e) => { setValue(e.target.value); }} readOnly={readOnly} />
        </div>
    )
}

export const CheckBox = ({ name, value, setValue, readOnly = false, className, required = false, disabled = false, tabIndex = null }) => {
    const handleOnChange = (e) => {
        setValue(!value);
    }
    return (
        <div className='items-center md:my-1 md:px-1 data'>
            <label htmlFor="id" className={`md:text-start items-center ${className}`}>
                <input tabIndex={tabIndex ? tabIndex : undefined} type="checkbox" required={required} className='mx-2 py-2' checked={value} onChange={(e) => { handleOnChange(e); }} disabled={readOnly} />
                {name}
            </label>
        </div>
    )
}


