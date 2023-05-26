import { HEADERS } from "./header";

export const API_URLS = {
  ROBOT: {
    registerRobot: () => ({
      endPoint: "/api/v1/ui/register",
      method: "GET",
      header: HEADERS.header(),
    }),
  },
};
