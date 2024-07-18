import {ADDTOCART, REMOVEFROMCART} from './constants';

const initialState = [];

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDTOCART:
      return [...state, action.data];
  
      case REMOVEFROMCART:

      let result = state.filter(item=>{
        return item.name != action.data
      })
        return [...result];
    

       
     default: 
         return state 
  }
};
