import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { Box, Flex } from "@chakra-ui/react";
import Header from "@/components/Header";

const GET_ONE_COUNTRY = gql`
  query getOneCountry($code: String!) {
    country(code: $code) {
      code
      emoji
      id
      name
      continent {
        name
        id
      }
    }
  }
`;

export default function Country() {
  const router = useRouter();
  const { country } = router.query;
  const { data } = useQuery(GET_ONE_COUNTRY, {
    variables: { code: country },
  });

  return (
    <Flex flexDirection="column" height="100vh" alignItems="center">
      <Header />
      {data?.country.emoji}
      <Box fontSize="1.5vw" mt="2.5vw">
        Name: {data?.country.name}({country})
      </Box>
      {data?.country?.continent?.name && (
        <Box fontSize="1.5vw">Continent: {data?.country.continent.name}</Box>
      )}
    </Flex>
  );
}
