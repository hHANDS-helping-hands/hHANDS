export const LOCATION = "LOCATION";
export const TICKET_LIST = "TICKET_LIST";

export const setLocation = (location) => {
  return {
    type: LOCATION,
    data: location,
  };
};

export const setTicketList = (ticketList) => {
  return {
    type: TICKET_LIST,
    data: ticketList,
  };
};
