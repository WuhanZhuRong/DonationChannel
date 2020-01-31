import { get, API_GET_HOSPITALS } from "../../utils/api";
// action
export const hospitalActions = {
  searchHospital(filter, page, size) {
    console.log('===searchHospital,发起请求===', filter.cityCode, filter.supplies);
    return dispatch =>
      get(API_GET_HOSPITALS, {
        city: "武汉" || filter.cityName,
        page,
        size
      }).then(res => dispatch(fetchHospitalsSuccess(res.data.data)));
  },
  searchHospitalInAdditional(filter, page, size) {
    console.log('===searchHospitalInAdditional,发起请求===', filter.cityCode, filter.supplies, page);
    return dispatch =>
        get(API_GET_HOSPITALS, {
          city: "武汉" || filter.cityName,
          page,
          size
        }).then(res => dispatch(fetchHospitalsInAdditionalSuccess(res.data.data)));
  }
};

// action creator
function fetchHospitalsSuccess(data) {
  return {
    type: "FETCH_HOSPITALS_SUCCESS",
    data
  };
}

function fetchHospitalsInAdditionalSuccess(data) {
  return {
    type: "FETCH_HOSPITALS_IN_ADDITIONAL_SUCCESS",
    data
  };
}

//reducer
const initialState = {
  ids: [],
  byId: {}, // TODO: should be removed
  detail: {} // TODO: should return detail not length one list
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_HOSPITALS_SUCCESS":
      return { ...state, ...rebaseHospitalData(action.data) };
    case "FETCH_HOSPITALS_IN_ADDITIONAL_SUCCESS":
      const additionalData = rebaseHospitalData(action.data)
      return { ...state, ids: [...state.ids, ...additionalData.ids], byId: {...state.byId, ...additionalData.byId}};
    default:
      return state;
  }
}

function rebaseHospitalData(remoteData) {
  let ids = [];
  let byId = {};
  remoteData.forEach(hospital => {
    ids.push(hospital["id"]);
    byId[hospital["id"]] = hospital;
  });
  return { ids, byId };
}

//selector

export function selectAllHospital(hospitals) {
  return hospitals.ids.map(id => hospitals.byId[id]);
}

