import {
  SERACH_NAME_CITY,
  CHECK_IN,
  CHECK_OUT,
  NUMBER_ADULTS,
  NUMBER_CHILDRENS,
} from "../Constants";
const initNameCity = {
  nameCity: "",
  checkIn: null,
  checkOut: null,
  numberAdults: 0,
  numberChildrens: 0,
};

const cityReducer = (state = initNameCity, action) => {
  switch (action.type) {
    case SERACH_NAME_CITY:
      return {
        ...state,
        nameCity: action.payload,
      };
    case CHECK_IN:
      return {
        ...state,
        checkIn: action.payload,
      };
    case CHECK_OUT:
      return {
        ...state,
        checkOut: action.payload,
      };
    case NUMBER_ADULTS:
      return {
        ...state,
        numberAdults: action.payload,
      };
    case NUMBER_CHILDRENS:
      return {
        ...state,
        numberChildrens: action.payload,
      };
    default:
      return state;
  }
};

export default cityReducer;
