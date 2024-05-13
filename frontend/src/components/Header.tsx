import Link from "next/link";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
export default function Header() {
  const router = useRouter();
  return (
    <Box bg="cyan" height="20vw" width="100%">
      <Flex alignItems="center" flexDirection="column" pt="5vw">
        <Box fontSize="3vw" fontWeight="600">
          Checkpoint : frontend
        </Box>
        <Box
          fontSize="2.5vw"
          cursor="pointer"
          mt="2vw"
          onClick={() => router.push("/")}
        >
          Countries
        </Box>
      </Flex>
    </Box>
  );
}
