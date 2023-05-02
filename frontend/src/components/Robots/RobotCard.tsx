import {
  Card,
  Flex,
  Group,
  Stack,
  Text,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { IconRobot, IconDotsVertical } from "@tabler/icons-react";
import { Robot } from "../../types/models/robot";
import { getColorByStatus } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { HandClick } from "tabler-icons-react";
import ROUTER from "../../config/router";

interface Props {
  robot: Robot | null;
}

const RobotCard = ({ robot }: Props) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <Card
      shadow={"lg"}
      padding={"xs"}
      px={"xl"}
      radius={"lg"}
      onClick={() => navigate(`${ROUTER.ROBOT.ALL_ROBOTS}/${robot?.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <Group position={"apart"}>
        <Group>
          <IconRobot size={48} />
          <Flex direction={"column"}>
            <Text weight={"bold"}>{robot?.name}</Text>
            <Text>{robot?.position}</Text>
            <Text fz="xs">ID {robot?.id}</Text>
          </Flex>
        </Group>
        <Group>
          <Button
            color={getColorByStatus(robot?.status)}
            radius={"lg"}
            miw={200}
            variant="outline"
          >
            {robot?.status}
          </Button>

          <IconDotsVertical cursor={"pointer"} />
        </Group>
      </Group>
    </Card>
  );
};

export default RobotCard;
