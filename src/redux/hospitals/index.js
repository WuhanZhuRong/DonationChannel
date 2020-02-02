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
        page,
        size
      }).then(res =>
        dispatch(fetchHospitalsSuccess(res.data))
      );
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
  ids: [],
  byId: {}, // TODO: should be removed
  detail: {}, // TODO: should return detail not length one list
  hasNextPage: true
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_HOSPITALS_SUCCESS":
      const { data, hasPreviousPage, hasNextPage } = action.responseData;
      const rebasedData = rebaseHospitalData(data);
      if(hasPreviousPage) {
        return {
          ...state,
          ids: [...state.ids, ...rebasedData.ids],
          byId: { ...state.byId, ...rebasedData.byId }
        };
      }else {
        return { ...state, ...rebasedData };
      }
    default:
      return state;
  }
}

function rebaseHospitalData(remoteData) {
  let ids = [];
  let byId = {};
  remoteData && remoteData.forEach(hospital => {
    ids.push(hospital["id"]);
    byId[hospital["id"]] = hospital;
  });
  return { ids, byId };
}

//selector

export function selectAllHospital(hospitals) {
  return hospitals.ids.map(id => hospitals.byId[id]);
}
