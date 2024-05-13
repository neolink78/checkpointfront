import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  AddCountryMutation,
  AddCountryMutationVariables,
  GetAllCountriesQuery,
} from "@/graphql/generated/schema";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState } from "react";

const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      emoji
      id
      name
    }
  }
`;

const ADD_COUNTRY = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      emoji
      id
      name
    }
  }
`;

export default function Home() {
  const { data, refetch } = useQuery<GetAllCountriesQuery>(GET_ALL_COUNTRIES);
  const router = useRouter();
  const [form, setForm] = useState<AddCountryMutationVariables>({
    data: {
      code: "",
      emoji: "",
      name: "",
    },
  });
  const updateFormData = (
    partialFormData: Partial<AddCountryMutationVariables>
  ) => {
    setForm({ ...form, ...partialFormData });
  };

  const [createAdMutation] = useMutation<
    AddCountryMutation,
    AddCountryMutationVariables
  >(ADD_COUNTRY, {
    onCompleted: () => {
      refetch();
    },
  });

  const addCountry = async () => {
    await createAdMutation({
      variables: {
        ...form,
      },
    });
  };
  return (
    <Flex flexDirection="column" height="100vh" alignItems="center">
      <Header />
      <Flex
        p="1vw"
        m="10vw 0"
        border="solid 0.1vw grey"
        borderRadius="0.5vw"
        width="fit-content"
        bg="lightcyan"
        alignItems="center"
      >
        <form
          id="CountryForm"
          onSubmit={(event) => {
            event.preventDefault();
            addCountry();
          }}
        >
          <Flex
            gap="1vw"
            align="center"
            flexDirection={{ base: "column", md: "row" }}
          >
            <Box>
              <Box fontSize="1.5vw">Name</Box>
              <Input
                fontSize="1.9vw"
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                size="md"
                required
                onChange={(event) => {
                  updateFormData({
                    data: { ...form.data, name: event.target.value },
                  });
                }}
              />
            </Box>
            <Box>
              <Box fontSize="1.5vw">Emoji</Box>
              <Input
                fontSize="1.9vw"
                type="text"
                id="emoji"
                name="emoji"
                required
                onChange={(event) => {
                  updateFormData({
                    data: { ...form.data, emoji: event.target.value },
                  });
                }}
                placeholder="Emoji"
                size="md"
              />
            </Box>
            <Box>
              <Box fontSize="1.5vw">Code</Box>
              <Input
                fontSize="1.9vw"
                type="text"
                id="code"
                name="code"
                placeholder="Code"
                size="md"
                required
                onChange={(event) => {
                  updateFormData({
                    data: { ...form.data, code: event.target.value },
                  });
                }}
              />
            </Box>
            <Button
              fontSize="1.9vw"
              colorScheme="cyan"
              ml="1vw"
              height="5vw"
              p="1vw"
              type="submit"
            >
              Add
            </Button>
          </Flex>
        </form>
      </Flex>
      <Flex gap="1vw">
        {data?.countries.map((country, idx) => (
          <Flex
            key={idx}
            cursor="pointer"
            onClick={() => router.push(`/countries/${country.code}`)}
            minW="5vw"
            borderRadius="0.5vw"
            border="solid 0.1vw grey"
            flexDirection="column"
            p="0.5vw"
            align="center"
          >
            <Box fontSize="1.5vw">{country.name}</Box>
            <Box fontSize="1.5vw">{country.emoji}</Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
