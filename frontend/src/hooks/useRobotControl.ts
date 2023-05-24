import { useState, useEffect } from "react";
import { API_URLS } from "../config/apis/endpoint";
import { useCallApi } from "../config/apis";
import { notiType, renderNotification } from "../utils/helpers";

interface RobotMovementProps {
  driveSpeed: number;
  rotationSpeed: number;
}

const useRobotControlMovement = (): {
  handleButtonPress: (driveSpeed: number, rotationSpeed: number) => void;
  handleButtonRelease: () => void;
} => {
  const [movementProps, setMovementProps] = useState<RobotMovementProps>({
    driveSpeed: 0,
    rotationSpeed: 0,
  });

  const ManuallyControlRobot = async () => {
    const { driveSpeed, rotationSpeed } = movementProps;
    const api = API_URLS.ROBOT.manuallyControl(driveSpeed, rotationSpeed);

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status == 200) {
      renderNotification("Send the command successfully", notiType.SUCCESS);
    } else {
      renderNotification("Send the command failed", notiType.ERROR);
    }
  };

  useEffect(() => {
    ManuallyControlRobot();

    return () => {
      setMovementProps({ driveSpeed: 0, rotationSpeed: 0 });
      ManuallyControlRobot();
    };
  }, [movementProps]);

  const handleButtonPress = (
    driveSpeed: number,
    rotationSpeed: number
  ): void => {
    setMovementProps({ driveSpeed, rotationSpeed });
  };

  const handleButtonRelease = (): void => {
    setMovementProps({ driveSpeed: 0, rotationSpeed: 0 });
  };

  return {
    handleButtonPress,
    handleButtonRelease,
  };
};

export default useRobotControlMovement;
