import { get, API_GET_NEARBYHOSPITALS, API_GET_TOTALDEMANDS } from "../../utils/api";
// action
export const demandsMapAction = {
  getNearbyHospitals(location={}) {
    return dispatch =>
      get(API_GET_NEARBYHOSPITALS, {
        distance: 20,
        longitude: location.longitude || 114.292444,
        latitude: location.latitude || 30.672016,
        page: 1,
        size: 50
      }).then(res => {
        return dispatch(fetchNearbyHospitalsSuccess(res.data))
      });    
  },
  getTotalDemands(){
    return dispatch =>
      get(API_GET_TOTALDEMANDS).then(res => 
        dispatch(fetchTotalDemandsSuccess(res.data))
      )
  },
  updateCurrentHospital(id) {
    return dispatch => dispatch(updateCurrentHospitalSuccess(id))
  },
  getInitialLocation(location={}) {
    return {
      type: 'FETCH_INITAILLOCATION_SUCCESS',
      data: {
        initialLocation: {
          longitude: location.longitude || 114.292444,
          latitude: location.latitude - 0.07 || 30.672016 - 0.07
        }        
      }
    }
  }  
};

//actionCreator
function fetchNearbyHospitalsSuccess(data) {
  return {
    type: 'FETCH_DEMANDSMAP_SUCCESS',
    data
  }
}

function fetchTotalDemandsSuccess(data) {
  return {
    type: 'FETCH_TOTALDEMANDS_SUCCESS',
    data
  }  
}

function updateCurrentHospitalSuccess(id) {
  return {
    type: 'UPDATE_CURRENTHOSPITAL_SUCCESS',
    id
  }
}

//reducer
const initialState = {
  totalDemands: {},
  notices: [],
  hospitals: [],
  initialLocation: {},
  currentHospital:undefined
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DEMANDSMAP_SUCCESS':
      let { hasNextPage, hasPreviousPage, pageCount, pageNo, totalCount } = action.data;
      let hospitals = action.data.data;
      var currentHospital = hospitals[0];
      return {
        ...state,
        hospitals,
        currentHospital,
        hasNextPage,
        hasPreviousPage,
        pageCount,
        pageNo,
        totalCount
      };
    case 'FETCH_INITAILLOCATION_SUCCESS':
      return {...state, ...preHandleInitialLocationData(action.data)};
    case 'FETCH_TOTALDEMANDS_SUCCESS':
      let totalDemands = action.data;
      return { ...state, totalDemands };
    case 'UPDATE_CURRENTHOSPITAL_SUCCESS':
      currentHospital = state.hospitals.find((item) => item.id === action.id);
      return { ...state, currentHospital};
    default:
      return state;
  }
}

function preHandleInitialLocationData(initailLocationData) {
  return initailLocationData;
}

 