import { Grid, Center, Card, Button } from "@mantine/core";
import {
  IconArrowBigUpLine,
  IconArrowBigDownLine,
  IconArrowBigRightLine,
  IconArrowBigLeftLine,
} from "@tabler/icons-react";

const MoveControl = () => {
  return (
    <Card maw={250} shadow={"lg"} padding={"xs"} px={"xl"} radius={"lg"}>
      <Grid>
        <Grid.Col span={12}>
          <Center>
            <Button color="gray">
              <IconArrowBigUpLine />
            </Button>
          </Center>
        </Grid.Col>

        <Grid.Col span={4}>
          <Center>
            <Button color="gray">
              <IconArrowBigLeftLine />
            </Button>
          </Center>
        </Grid.Col>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <Button color="gray">
              <IconArrowBigRightLine />
            </Button>
          </Center>
        </Grid.Col>
        <Grid.Col span={12}>
          <Center>
            <Button color="gray">
              <IconArrowBigDownLine />
            </Button>
          </Center>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default MoveControl;
