'use client'
import { Input, Select, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Dispatch, SetStateAction, useState } from 'react';
import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';

type Props = {
    muiStyle?: boolean,
    label: string,
    name: string,
    edit: boolean,
    fn: Dispatch<SetStateAction<number>>
    placeholder?: string,
    value?: number
}

const Price = ({ label, name, fn, muiStyle, edit, placeholder, value }:Props) => {
    
    const [ativo, setAtivo] = useState(true)

    return (
        <FormControl sx={{ flex: 1, width: '100%' }}>
            {muiStyle &&
                <InputLabel shrink={ativo} sx={{ backgroundColor: 'white', px: 1}}>{label}</InputLabel>
            }
            <CurrencyInput
                required
                name={name}
                className={muiStyle ? "p-[15.3px] focus:p-[14px] border focus:border-2 border-gray-400 focus:border-[#1976d2] rounded-[4.5px] outline-none" : 'outline-none w-full'}
                prefix="R$ "
                decimalsLimit={2}
                onValueChange={(value, name, values) => fn((values && values.float) ? values.float : 0)}
                onFocus={()=>setAtivo(true)}
                readOnly={!edit}
                placeholder={placeholder}
                defaultValue={value}
                width={'100%'}
            />
        </FormControl>
    )
}

export default Price