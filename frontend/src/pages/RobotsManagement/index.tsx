import { Button, Grid, Group } from "@mantine/core";
import { Robot, RobotStatus } from "../../types/models/robot";
import robotImg from "../../assets/robot.jpg";
import { RobotCard } from "./components/RobotCard";
import { API_URLS } from "../../config/apis/endpoint";
import { useCallApi } from "../../utils/api";
import { useState } from "react";
import { notiType, renderNotification } from "../../utils/helpers";

const RobotsManagement = () => {
  const robots: Robot[] = [
    {
      id: "de94e7fd-a752-4aa0-8acb-edeefdced8b2",
      name: "Uppsala Robot",
      image: robotImg,
      status: RobotStatus.NOT_CONNECTED,
    },
    {
      id: "de94e7fd-a752-4aa0-8acb-edeefdced8b2",
      name: "HUST Robot",
      image: robotImg,
      status: RobotStatus.NOT_CONNECTED,
    },
  ];

  const [robotID, setRobotID] = useState<string>();

  const RegisterRobot = async () => {
    const { response, error } = await useCallApi(
      API_URLS.ROBOT.registerRobot()
    );
    if (!error && response?.status == 200) {
      const { data } = response;
      setRobotID(data);
      renderNotification("Register robot successfully", notiType.SUCCESS);
    } else {
      renderNotification(
        "Register robot to the backend failed",
        notiType.ERROR
      );
    }
  };

  return (
    <>
      <Group position="right" mb={"md"}>
        <Button onClick={() => RegisterRobot()}>Register Robot</Button>
      </Group>
      <Grid>
        {robots.map((robot, index) => (
          <Grid.Col span={6}>
            <RobotCard robot={robot} key={index} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default RobotsManagement;
