import {
  ID_USER,
  ACCESS_TOKEN,
  NAME_USER,
  PHONE,
  EMAIL,
  SERACH_NAME_CITY,
  NAME_HOTEL,
  CHECK_IN,
  CHECK_OUT,
  NUMBER_ADULTS,
  NUMBER_CHILDRENS,
  TYPE_ROOM,
  PRICE_ROOM,
} from "../Constants";
const initNameCity = {
  accessToken: "",
  idUSer: "",
  nameUser: "",
  phone: "",
  email: "",
  credit: "",
  nameCity: "",
  nameHotel: "",
  checkIn: null,
  checkOut: null,
  numberAdults: 0,
  numberChildrens: 0,
  typeRoom: "",
  priceRoom: 0,
};

const cityReducer = (state = initNameCity, action) => {
  switch (action.type) {
    case ID_USER:
      return {
        ...state,
        idUSer: action.payload,
      };
    case ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case NAME_USER:
      return {
        ...state,
        nameUser: action.payload,
      };
    case PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SERACH_NAME_CITY:
      return {
        ...state,
        nameCity: action.payload,
      };
    case NAME_HOTEL:
      return {
        ...state,
        nameHotel: action.payload,
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
    case TYPE_ROOM: {
      return {
        ...state,
        typeRoom: action.payload,
      };
    }
    case PRICE_ROOM: {
      return {
        ...state,
        priceRoom: action.payload,
      };
    }
    default:
      return state;
  }
};

export default cityReducer;
