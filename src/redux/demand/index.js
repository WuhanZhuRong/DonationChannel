// action
export const getDemands = {
  type: "GET_DEMAND",
  text: "demands"
};
//reducer
const initialState = {
  text: "Hello"
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DEMAND":
      return {
        text: action.text
      };
    default:
      return initialState;
  }
}
