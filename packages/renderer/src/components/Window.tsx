import * as React from 'react';
import { ipcRenderer } from 'electron';
import { Box, ChakraProvider, CSSReset, theme } from '@chakra-ui/react';
import { requestAsPost } from '../utils/http';
import { PaymentLinkCreate, PaymentLinkCreateFields } from './PaymentLink';
import { Loader } from './Loader';

interface Config {
  endpoint: string;
  authorization: string;
}
interface Response {
  _links: {
    redirect: {
      href: string;
    };
  };
}

const Window = () => {
  const [fetching, setFetching] = React.useState(false);
  const [config, setConfig] = React.useState<Config>({
    endpoint: '',
    authorization: '',
  });

  React.useEffect(() => {
    ipcRenderer.once('config', (_event, data: Config) => {
      setConfig(data);
    });
  }, []);

  const onCreate = async (data: Readonly<PaymentLinkCreateFields>) => {
    setFetching(true);

    const result = await requestAsPost<Readonly<Response>>(
      config.endpoint,
      { Authorization: config.authorization },
      data
    );

    if (result._links.redirect.href) {
      setTimeout(() => {
        ipcRenderer.send('open.url', result._links.redirect.href);
        setFetching(false);
      }, 500);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={4}>
        {fetching === false && <PaymentLinkCreate onCreate={onCreate} />}
        {fetching === true && <Loader />}
      </Box>
    </ChakraProvider>
  );
};

export { Window };
