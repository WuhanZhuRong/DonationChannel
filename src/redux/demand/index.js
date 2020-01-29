// action
export const getDemands = {
  type: "GET_DEMAND",
  text: "demands" // should replace it by real data fetched from api
};

//reducer
const initialState = {
  filter: {
    cityCode: "",
    supplies: []
  }
};

export function setDemandsFilter(filter) {
  return { type: "SET_DEMANDS_FILTER", filter };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DEMAND":
      return {
        text: action.text
      };
    case "SET_DEMANDS_FILTER":
      return {
        filter: action.filter
      };
    default:
      return initialState;
  }
}
