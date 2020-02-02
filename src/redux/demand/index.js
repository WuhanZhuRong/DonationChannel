import { get, API_GET_SUPPLIES } from "../../utils/api";

//reducer
const initialState = {
  filter: {
    cityCode: "420100", // 湖北武汉
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
  changeSelectedSupplies(supply, isAdd = true) {
    return isAdd
      ? {
          type: "ADD_SUPPLY_TO_FILTER",
          supply
        }
      : {
          type: "REMOVE_SUPPLY_FROM_FILTER",
          supply
        };
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
        // TODO: 现在层级关系有问题 避免重复出现父类重名子类，前端逻辑上做了些hack，之后要讨论下怎么修正
        // 在hospitals中用到的筛选器中，子类里过滤了父类的同名类
        flatSupplies: action.data
          .flatMap(each => each.types)
          // hack code start
          .filter(
            each => !action.data.map(each => each.name).includes(each.name)
          )
      };
    case "SET_DEMANDS_FILTER":
      return {
        ...state,
        filter: action.filter
      };
    case "ADD_SUPPLY_TO_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          supplies: [...state.filter.supplies, action.supply]
        }
      };
    case "REMOVE_SUPPLY_FROM_FILTER":
      const { supplies } = state.filter;
      const index = supplies.indexOf(action.supply);
      const newSupplies = [...supplies].splice(index, 1);
      return {
        ...state,
        filter: {
          ...state.filter,
          supplies: newSupplies
        }
      };
    default:
      return state;
  }
}
