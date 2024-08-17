import React from 'react';
import InputLabel from "@/Components/InputLabel";
import {labelNameRSt, ucwords} from "@/Library/Helper";
import InputError from "@/Components/InputError";
import Style from '../../Pages/Backend/TableView.module.css'

export const InputFormWithoutLabel = ({error, label, name, type,className="",col_name, ...props})=> {
    return (
        <>
            <div className={`${col_name} mb-3`}>
                <input
                    type={type}
                    id={name}
                    {...props}
                    className={`form-control ${Style.form_control}`}
                    placeholder={labelNameRSt(label)}
                />
                {error && <InputError message={error}/>}
            </div>
        </>
    );
}


