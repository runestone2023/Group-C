import { BaseModel } from ".";

export interface Robot extends BaseModel {
  name: string;
  position?: string;
  image?: string;
  status: RobotStatus;
}

export enum RobotStatus {
  CONNECTING = "CONNECTING",
  NOT_CONNECTED = "DISCONNECT",
  ERROR = "ERROR",
}
