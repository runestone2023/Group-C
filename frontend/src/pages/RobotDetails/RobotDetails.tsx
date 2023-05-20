import { useParams } from "react-router-dom";
import { RobotStatus } from "../../types/models/robot";
import RobotCard from "../../components/Robots/RobotCard";
import { Col, Grid, Center, Card, Stack, Text, Button } from "@mantine/core";
import MoveControl from "../../components/Robots/MoveControl";
import CommandInput from "../../components/Robots/CommandInput";
import { HistoryLog } from "../../components/Robots/HistoryLog";
import { AccessPoint } from 'tabler-icons-react';
import { useState, useEffect, useCallback } from "react";
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { PlayerPause } from 'tabler-icons-react';


const RobotDetails = () => {
  const params = useParams();
  console.log(params);
  const [potralLoading, setPotralLoading] = useState(false);
  const [patrolled, setPatrolled] = useState(false);
  const fakeData = {
    id: "123",
    name: "Robot 1",
    status: RobotStatus.CONNECTING,
    position: "HUST, Vietnam",
  };

  const handleSendPatrolControl = useCallback(async () => {
    console.log("Send potral loading");
    setPotralLoading(true);
    try {
      const result = await fetch(`http://127.0.0.1:8080/api/v1/ui/command/patrol/${params.robotId}`, {
        method: "GET",
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const res = await result.json();
      if (res.status === 200) {
        notifications.show({
          title: 'Success !',
          message: 'The patrol command has been sent to the robot successfully!',
          autoClose: 500,
          color: "blue",
          icon: <IconX />
        });
        setPatrolled(true);
      } else {
        notifications.show({
          title: 'Error !',
          message: 'Cannot send the command to the robot!',
          autoClose: 1000,
          "color": "red"
        })
      }
    } catch (e) {
      notifications.show({
        title: 'Error !',
        message: 'Cannot send the command to the robot!',
        autoClose: 1000,
        "color": "red"
      })
      console.log(e);
    }
    setPotralLoading(false);
  }, [params]);
  const handleSendStopPatrol = useCallback(async () => {
    setPotralLoading(true);
    try {
      const result = await fetch(`http://127.0.0.1:8080/api/v1/ui/command/stop-patrol/${params.robotId}`, {
        method: "GET",
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const res = await result.json();
      if (res.status === 200) {
        notifications.show({
          title: 'Success !',
          message: 'The stop command has been sent to the robot!',
          autoClose: 1000,
          color: "blue",
          icon: <IconX />
        });
        setPatrolled(false);
      } else {
        notifications.show({
          title: 'Error !',
          message: 'Cannot send the command to the robot!',
          autoClose: 1000,
          "color": "red"
        })
      }
    } catch (e) {
      notifications.show({
        title: 'Error !',
        message: 'Cannot send the command to the robot!',
        autoClose: 1000,
        "color": "red"
      });
      console.log(e);
    }
    setPotralLoading(false);
  }, [params]);
  return (
    <>
      <RobotCard robot={fakeData} />
      <Grid mt={60}>
        <Col span={3}>
          <Stack>
            <div className="patrol-button-container">
              <Button leftIcon={<AccessPoint size="1rem" />} color="indigo" loading={potralLoading} onClick={handleSendPatrolControl}>
                Start patrol
              </Button>
            </div>
            <div className="patrol-button-container">
              {patrolled && <Button leftIcon={<PlayerPause size="1rem" />} color="indigo" loading={potralLoading} onClick={handleSendStopPatrol}>
                Stop
              </Button>}
            </div>
            <br />
            <div className="move-controller-container">
              <MoveControl />
            </div>
          </Stack>
        </Col>
        <Col span={9}>
          <Card bg={"gray"} shadow={"lg"} padding={"md"} radius={"lg"}>
            <Stack>
              <HistoryLog />
              <CommandInput />
            </Stack>
          </Card>
        </Col>
      </Grid>
    </>
  );
};

export default RobotDetails;
