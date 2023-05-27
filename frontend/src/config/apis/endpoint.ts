import { HEADERS } from "./header";

export const API_URLS = {
  ROBOT: {
    sayHello: () => ({
      endPoint: "/api/v1/robot/hello",
      method: "GET",
      header: HEADERS.header(),
    }),

    registerRobot: () => ({
      endPoint: "/api/v1/ui/register",
      method: "GET",
      header: HEADERS.header(),
    }),

    startPatrol: (robotID: string, patrolID: string) => ({
      endPoint: `/api/v1/ui/command/patrol/${robotID}/${patrolID}`,
      method: "GET",
      header: HEADERS.header(),
    }),

    stopPatrol: (robotID: string) => ({
      endPoint: `/api/v1/robot/command/stop-patrol/${robotID}`,
      method: "GET",
      header: HEADERS.header(),
    }),

    manuallyControl: (
      driveSpeed: number,
      rotationSpeed: number,
      robotID: string
    ) => ({
      endPoint: `/api/v1/ui/command/move/${robotID}?drive_speed=${driveSpeed}&rotation_speed=${rotationSpeed}`,
      method: "GET",
      header: HEADERS.header(),
    }),
  },
};
