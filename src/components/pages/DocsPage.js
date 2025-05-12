import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import DocSidebar from '../layout/DocSidebar';
import DocViewer from '../DocViewer';
import DocSearchBar from '../DocSearchBar';
import '../../styles/docs.css';

const DocsPage = () => {
  return (
    <Flex className="docs-page-container" flex="1" minH="0" overflow="hidden">
      <Box className="docs-sidebar" height="100%">
        <DocSidebar />
      </Box>
      <Flex className="docs-content-container" direction="column" flex="1" minH="0" overflow="hidden">
        <Box className="doc-searchbar">
          <DocSearchBar />
        </Box>
        <Box className="doc-viewer" flex="1" overflowY="auto">
          <DocViewer />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DocsPage;
