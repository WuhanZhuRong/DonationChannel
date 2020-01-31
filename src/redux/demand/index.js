import { get, API_GET_SUPPLIES } from "../../utils/api";

//reducer
const initialState = {
  filter: {
    cityCode: "",
    supplies: [],
    cityName: ""
  },
  allSupplies: [],
  flatSupplies: []
};

// action
export const demandActions = {
  setDemandsFilter(filter) {
    return { type: "SET_DEMANDS_FILTER", filter };
  },
  fetchSupplies() {
    return dispatch =>
      get(API_GET_SUPPLIES).then(res =>
        dispatch(fetchSuppliesSuccess(res.data))
      );
  }
};

// action creator
function fetchSuppliesSuccess(data) {
  return {
    type: "FETCH_SUPPLIES_SUCCESS",
    data
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_SUPPLIES_SUCCESS":
      return {
        ...state,
        allSupplies: action.data,
        flatSupplies: action.data.flatMap(each => each.types)
      };
    case "SET_DEMANDS_FILTER":
      return {
        ...state,
        filter: action.filter
      };
    default:
      return state;
  }
}
