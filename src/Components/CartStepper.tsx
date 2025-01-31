// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import {Button} from "framework7-react";

const CartStepper = ({initialQuantity,onQuantityChange, productId, limit}) => {
    const [count, setCount] = useState(initialQuantity);


    const handleIncrement = () => {
        const newCount = count < limit ? count + 1 : count;
        setCount(newCount);
        onQuantityChange(productId, newCount);
    };

    const handleDecrement = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            onQuantityChange(productId, newCount);
        }
    };
    return (
            <div slot='text' className=' border border-[green] w-24 h-6 rounded-md flex items-center justify-between overflow-hidden'>
                <Button onClick={handleDecrement}  className=' font-[green] ml-4'>-</Button>
                <p className='text-[gray] text-sm'>{count}</p>
                <Button onClick={handleIncrement} className='mr-1'>+</Button>

            </div>
    );
};

export default CartStepper;
