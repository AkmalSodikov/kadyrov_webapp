// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, {useState} from 'react';
import heart_filled from "../assets/icons/heart_filled.svg";
import heart from "../assets/icons/heart_empty.svg";
import {useDispatch, useSelector} from "react-redux";
import {addFavourite, removeFavourite} from '../store/favouritesSlice.js'



const HeartButton = ({car, isFav, combStyle}) => {
    const [isFilled, setIsFilled] = useState(isFav);
    const dispatch = useDispatch();

    const handleChange = async (e) => {
        e.stopPropagation()
        if (!isFilled) {
            setIsFilled(true)
            dispatch(addFavourite(car))
            console.log(car)
            console.log(isFav)
        } else {
            dispatch(removeFavourite(car))
            setIsFilled(false)
            //const res = await removeFavorite(car.id)
        }
        setIsFilled(!isFilled)

    }
    return (
        <div onClick={(e) => handleChange(e)} className={`flex w-6 h-6 bg-[green] items-center justify-center rounded-[10px] ${combStyle}`}>
            <img alt="heart" src={isFilled ? heart_filled : heart}/>
        </div>
    );
};

export default HeartButton;