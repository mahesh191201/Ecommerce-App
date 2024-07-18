import {ADDTOCART} from './constants'
import { REMOVEFROMCART } from './constants'

export function addToCart(item){
    return{
        type: ADDTOCART,
        data: item,

    }
}

export function removeFromCart(item){
    return{
        type: REMOVEFROMCART,
        data: item,

    }
}