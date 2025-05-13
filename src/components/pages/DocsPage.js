import React from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import DocSidebar from '../layout/DocSidebar';
import DocViewer from '../DocViewer';
import DocSearchBar from '../DocSearchBar';
import '../../styles/docs.css';

const DocsPage = () => {
  const { category, slug } = useParams();

  return (
    <Flex className="docs-page-layout" direction="column" minH="100vh">
      <Flex flex="1" className="docs-page-container">
        <Box className="docs-sidebar">
          <DocSidebar />
        </Box>
        <Box className="docs-content-container">
          <DocSearchBar />
          <DocViewer category={category} doc={slug} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default DocsPage;
