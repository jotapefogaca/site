'use client'
import { Input, Select, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Dispatch, SetStateAction, useState } from 'react';
import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';

type Props = {
    value: number,
    styles?: string
}

const PriceView = ({ value, styles }:Props) => {

    return (
        <FormControl>
            <CurrencyInput
                className={`bg-transparent text-white w-fit outline-none ${styles}`}
                required
                prefix="R$ "
                decimalsLimit={2}
                readOnly={true}
                defaultValue={value}
            />
        </FormControl>
    )
}

export default PriceView