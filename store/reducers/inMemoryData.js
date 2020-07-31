import { LOCATION, TICKET_LIST } from "../actions/inMemoryData";
import Config from "../../utilities/Config";

const initialState = {
  location: Config.initialLocation,
  ticketList: null,
};

const inMemoryData = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION:
      return { ...state, location: action.data };
    case TICKET_LIST:
      return { ...state, ticketList: action.data };
    default:
      return state;
  }
};

export default inMemoryData;
