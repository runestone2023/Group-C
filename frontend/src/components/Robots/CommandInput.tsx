import { Input } from "@mantine/core";
import { IconBrandPowershell } from "@tabler/icons-react";

const CommandInput = () => {
  return (
    <Input
      icon={<IconBrandPowershell />}
      placeholder="Input the command"
      radius="md"
      size="md"
    />
  );
};

export default CommandInput;
