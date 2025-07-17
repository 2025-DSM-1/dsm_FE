import { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { LawSidebar } from './LawSidebar';
import { MindMapCanvas } from './MindMapCanvas';
import { Header } from './Header';
import { type Law } from './type';

const AppContainer = styled.div`
  height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  flex-shrink: 0;
`;

const CanvasAndToolsWrapper = styled.div`
  flex: 1;
  display: flex;
`;

export interface MindMapNode {
  id: string;
  law: Law;
  x: number;
  y: number;
  connections: string[];
}

export const MindMap = () => {
  const [mindMapNodes, setMindMapNodes] = useState<MindMapNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [studyMode, setStudyMode] = useState<'explore' | 'quiz' | 'timeline'>('explore');
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDrop = useCallback((law: Law, x: number, y: number) => {
    const newNode: MindMapNode = {
      id: `node-${law.lawId}-${Date.now()}`,
      law,
      x,
      y,
      connections: []
    };
    setMindMapNodes(prev => [...prev, newNode]);
  }, []);

  const handleNodeMove = useCallback((nodeId: string, x: number, y: number) => {
    setMindMapNodes(prev =>
      prev.map(node =>
        node.id === nodeId ? { ...node, x, y } : node
      )
    );
  }, []);

  const handleNodeConnect = useCallback((fromId: string, toId: string) => {
    setMindMapNodes(prev =>
      prev.map(node =>
        node.id === fromId
          ? { ...node, connections: [...node.connections, toId] }
          : node
      )
    );
  }, []);

  const handleNodeDelete = useCallback((nodeId: string) => {
    setMindMapNodes(prev => prev.filter(node => node.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  return (
    <AppContainer>
      <Header
        studyMode={studyMode}
        onStudyModeChange={setStudyMode}
        nodesCount={mindMapNodes.length}
      />

      <MainContent>
        <SidebarWrapper>
          <LawSidebar />
        </SidebarWrapper>

        <CanvasAndToolsWrapper>
          <MindMapCanvas
            ref={canvasRef}
            nodes={mindMapNodes}
            selectedNode={selectedNode}
            onDrop={handleDrop}
            onNodeMove={handleNodeMove}
            onNodeConnect={handleNodeConnect}
            onNodeSelect={setSelectedNode}
            onNodeDelete={handleNodeDelete}
          />
        </CanvasAndToolsWrapper>
      </MainContent>
    </AppContainer>
  );
}
