import React from 'react';
import InputLabel from "@/Components/InputLabel";
import {labelNameRSt, ucwords} from "@/Library/Helper";
import InputError from "@/Components/InputError";

export const InputFormUser = ({error, label, name, type,className="",col_name, ...props})=> {
    return (
        <>
            <div className={`${col_name} mb-3`}>
                <InputLabel htmlFor={name} value={labelNameRSt(label)} style={{fontSize:'14px',lineHeight:'16.8px',marginBottom:'5px', fontFamily: '"Poppins", sans-serif'}}/><span
                className={className}>&nbsp;{className?'*':""}</span>
                <input
                    style={{borderRadius:'unset', padding:"10px 15px 10px 15px",gap:'10px',fontSize:'14px'}}
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


