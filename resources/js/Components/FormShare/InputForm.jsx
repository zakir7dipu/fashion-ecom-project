import React from 'react';
import InputLabel from "@/Components/InputLabel";
import {labelNameRSt, ucwords} from "@/Library/Helper";
import InputError from "@/Components/InputError";

export const InputForm = ({error, label, name, type,className="",col_name, ...props})=> {
    return (
        <>
            <div className={`${col_name} mb-3`}>
                <InputLabel htmlFor={name} value={labelNameRSt(label)}/><span
                className={className}>&nbsp;*</span>
                <input
                    type={type}
                    id={name}
                    {...props}
                    className="form-control"
                    placeholder={labelNameRSt(label)}
                />
                {error && <InputError message={error}/>}
            </div>
        </>
    );
}


