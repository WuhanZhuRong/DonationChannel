import { get, API_GET_HOSPITALS } from "../../utils/api";
// action
export const hospitalActions = {
  searchHospital(filter, page, size) {
    console.log(
      "===searchHospital,发起请求===",
      filter.cityCode,
      filter.supplies
    );
    return dispatch =>
      get(API_GET_HOSPITALS, {
        city: filter.cityName,
        supplies: filter.supplies,
        page,
        size
      }).then(res => dispatch(fetchHospitalsSuccess(res.data)));
  }
};

// action creator
function fetchHospitalsSuccess(responseData) {
  return {
    type: "FETCH_HOSPITALS_SUCCESS",
    responseData
  };
}

//reducer
const initialState = {
  data: [],
  hasNextPage: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_HOSPITALS_SUCCESS":
      let { data, hasPreviousPage, hasNextPage } = action.responseData;
      data = data.filter(each => each.supplies && each.supplies.length);
      if (hasPreviousPage) {
        return {
          ...state,
          hasNextPage,
          data: [...state.data, ...data]
        };
      } else {
        return {
          ...state,
          hasNextPage,
          data
        };
      }
    default:
      return state;
  }
}
