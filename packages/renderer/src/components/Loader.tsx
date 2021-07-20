import * as React from 'react';
import { Center, Flex, Spinner } from '@chakra-ui/react';

const Loader = () => (
  <Flex>
    <Center w="full" mt="48%">
      <Spinner speed="0.65s" thickness="4px" emptyColor="gray.200" color="blue.500" size="xl" />
    </Center>
  </Flex>
);

export { Loader };
