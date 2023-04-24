import { BaseModel } from ".";

export interface Robot extends BaseModel {
  name: string;
  position?: string;
  status: RobotStatus;
}

export enum RobotStatus {
  CONNECTING = "CONNECTING",
  NOT_CONNECTED = "NOT CONNECTED",
  ERROR = "ERROR",
}
