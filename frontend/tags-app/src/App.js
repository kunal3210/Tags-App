import './App.css';
import { Accordion, Button, Container, Stack, Typography } from '@mui/material';
import customizedAccordions, { AccordionDetails, AccordionSummary } from './components/Accordion';
import { useEffect, useState } from 'react';
import { fetchTree, updateTree } from './api/treeApi';

const data = {
  tree: {
    name: 'root',
    children: []
  }
}


function App() {
  const [tagsData, setTagsData] = useState(data)
  const [showTagsData, setShowTagsData] = useState(false)

  useEffect(() => {
    const loadTreeData = async () => {
      try {
        const data = await fetchTree();
        setTagsData(data);
      } catch (error) {
        console.error("Failed to load tree data:", error);
      }
    };

    loadTreeData();
  }, []);



  const handleAddChild = (e, value) => {
    e.stopPropagation();

    const addNode = (currentNode) => {
      if (currentNode.name === value.name) {
        if (currentNode.data) delete currentNode.data;

        if (!currentNode.children) currentNode.children = [];

        const newChild = {
          name: `${currentNode.name}-child${currentNode.children.length + 1}`,
          data: '',
        };
        return {
          ...currentNode,
          children: [...currentNode.children, newChild],
        };
      }

      if (currentNode.children) {
        return {
          ...currentNode,
          children: currentNode.children.map(addNode),
        };
      }

      return currentNode;
    };

    setTagsData((prev) => ({
      ...prev,
      tree: addNode(prev.tree),
    }));
  };


  const handleDataChange = (e, value) => {
    const newData = e.target.value;

    const updateNodeData = (currentNode) => {
      if (currentNode.name === value.name) {
        return { ...currentNode, data: newData };
      }

      if (currentNode.children) {
        return {
          ...currentNode,
          children: currentNode.children.map(updateNodeData),
        };
      }

      return currentNode;
    };

    setTagsData((prev) => ({
      ...prev,
      tree: updateNodeData(prev.tree),
    }));
  };

  const handleExport = async () => {
    setShowTagsData(true)
    try {
      const response = await updateTree(tagsData);
      console.log("Tree updated successfully:", response);
    } catch (error) {
      console.error("Failed to update tree:", error);
    }
  }

  return (
    <Container>
      <Stack spacing={2}>
        <Accordion>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{tagsData?.tree?.name}</Typography>
            <Button variant="contained" onClick={(e) => handleAddChild(e, { name: tagsData?.tree?.name })}>Add Child</Button>
          </AccordionSummary>
          <AccordionDetails>
            {customizedAccordions({ data: tagsData?.tree?.children, handleAddChild: handleAddChild, handleDataChange: handleDataChange })}
          </AccordionDetails>
        </Accordion>
        <Button variant="outlined" onClick={handleExport}>Export</Button>
        {showTagsData && <Typography>{JSON.stringify(tagsData?.tree)}</Typography>}
      </Stack>
    </Container>
  );
}

export default App;
