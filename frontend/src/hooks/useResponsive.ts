import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  isMobile: boolean;
  isSmallDesktop: boolean;
}

const useResponsive = (): Props => {
  const theme = useMantineTheme();

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const isSmallDesktop = useMediaQuery(
    `(max-width: ${theme.breakpoints.xl}px)`
  );

  return { isMobile, isSmallDesktop };
};

export default useResponsive;
