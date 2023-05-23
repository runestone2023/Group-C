import { createStyles, Avatar, Text, Group, Card } from "@mantine/core";
import { IconPhoneCall, IconAt } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export interface MemberInfoProps {
  avatar: string;
  name: string;
  school: string;
  role: MemberRole;
  github?: string;
}

export enum MemberRole {
  BACKEND_TEAM = "Backend Team",
  ROBOT_TEAM = "Robot Team",
  FRONTEND_TEAM = "Frontend Team",
}

export function MemberInfoCard({
  avatar,
  name,
  school,
  role,
  github,
}: MemberInfoProps) {
  const { classes } = useStyles();
  return (
    <Card withBorder>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {role}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {github}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {school}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
