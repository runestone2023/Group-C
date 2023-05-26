import { notifications } from "@mantine/notifications";
import { RobotStatus } from "../types/models/robot";

export enum notiType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const getColorByType = (type: notiType) => {
  switch (type) {
    case notiType.SUCCESS:
      return "green";
    case notiType.ERROR:
      return "red";
  }
};

export const renderNotification = (description: string, type: notiType) => {
  notifications.show({
    message: description,
    color: getColorByType(type),
    withCloseButton: true,
    autoClose: 1200,
  });
};

export const getColorByStatus = (string: string | undefined) => {
  if (!string) return "";
  switch (string) {
    case RobotStatus.CONNECTING:
      return "green";
    case RobotStatus.NOT_CONNECTED:
      return "red";
    case RobotStatus.ERROR:
      return "yellow";
  }
};
