import { HEADERS } from "./header";

export const API_URLS = {
  ROBOT: {
    registerRobot: () => ({
      endPoint: "/api/v1/ui/register",
      method: "GET",
      header: HEADERS.header(),
    }),
    startPatrol: (robotID: string) => ({
      endPoint: `/api/v1/ui/command/patrol/${robotID}`,
      method: "GET",
      header: HEADERS.header(),
    }),
    stopPatrol: (robotID: string) => ({
      endPoint: `/api/v1/ui/command/stop-patrol/${robotID}`,
      method: "GET",
      header: HEADERS.header(),
    }),
    manuallyControl: (driveSpeed: number, rotationSpeed: number) => ({
      endPoint: `/api/v1/ui/command/move/<robot_id>?${driveSpeed}&${rotationSpeed}`,
      method: "GET",
      header: HEADERS.header(),
    }),
  },
};
