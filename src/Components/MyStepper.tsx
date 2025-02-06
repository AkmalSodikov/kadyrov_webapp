// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import {Button} from "framework7-react";

const MyStepper = ({cost, dose, stepperValue, onIncrement, onDecrement}) => {
    //window.Telegram.WebApp.HapticFeedback.selectionChanged()
    //window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid')}
    return (
        <div className='grid grid-cols-3 gap-x-2 md:gap-x-16 whitespace-nowrap mt-2 rounded-xl border border-[0.2px] border-color-primary bg-white mx-4 items-center py-0'>
            <p className='ml-2 md:ml-4 font-bold text-md md:text-lg'>{cost} <span className='text-[12px]'>UZS</span></p>
            <p className='font-bold text-center text-gray-500 text-sm md:text-base font-normal'>{dose}</p>
            <div className='flex justify-end mr-2 '>
                <div className='border border-[green] w-24 h-8 rounded-md flex items-center justify-between'>
                    <Button onClick={onDecrement} className='font-[green] ml-2'>-</Button>
                    <p className='text-[gray] text-md'>{stepperValue}</p>
                    <Button onClick={onIncrement} className='mr-2'>+</Button>

                </div>
            </div>
        </div>
    );
};

export default MyStepper;
