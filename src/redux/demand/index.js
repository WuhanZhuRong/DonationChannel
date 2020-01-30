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
  },
  text: [
    {
      id: 0,
      name: "医用外科口罩"
    }, {
      id: 1,
      name: "n95口罩"
    }, {
      id: 2,
      name: "一次性医用口罩"
    }, {
      id: 3,
      name: "防护面罩"
    }, {
      id: 4,
      name: "防冲击眼罩"
    }, {
      id: 5,
      name: "防护目镜"
    }, {
      id: 6,
      name: "防护眼镜"
    }, {
      id: 7,
      name: "一次性医用帽子"
    }, {
      id: 8,
      name: "医学防护服"
    }, {
      id: 9,
      name: "手术衣"
    }, {
      id: 10,
      name: "反穿隔离衣"
    }, {
      id: 11,
      name: "医用一次性乳胶手套"
    }, {
      id: 12,
      name: "长袖橡胶手套"
    }, {
      id: 13,
      name: "长筒胶鞋"
    }, {
      id: 14,
      name: "防水防污染鞋套"
    }, {
      id: 15,
      name: "防污染靴"
    }, {
      id: 16,
      name: "酒精"
    }, {
      id: 17,
      name: "消毒液"
    }, {
      id: 18,
      name: "过氧乙酸"
    }, {
      id: 19,
      name: "皮肤消毒液"
    }, {
      id: 20,
      name: "测体温设备"
    }, {
      id: 21,
      name: "空气消毒设备"
    }, {
      id: 22,
      name: "医用紫外线消毒车"
    }]
};

export function setDemandsFilter(filter) {
  return { type: "SET_DEMANDS_FILTER", filter };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DEMAND":
      return {
        ...state,
        text: action.text
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
