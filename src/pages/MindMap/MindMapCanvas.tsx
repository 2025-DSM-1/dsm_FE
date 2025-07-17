import React, { forwardRef, useCallback, useState, useRef, type JSX } from 'react';
import styled from '@emotion/styled';
import { type Law, type MindMapNode, type MindMapGroup } from './type';
import { MindMapNodeComponent } from './MindMapNodeComponent';
import { ConnectionLine } from './ConnectionLine';
import { Move, Edit2, X, Square } from 'lucide-react';

interface MindMapCanvasProps {
  nodes: MindMapNode[];
  selectedNode: MindMapNode | null;
  onDrop: (law: Law, x: number, y: number) => void;
  onNodeMove: (nodeId: string, x: number, y: number) => void;
  onNodeConnect: (fromId: string, toId: string) => void;
  onNodeSelect: (node: MindMapNode | null) => void;
  onNodeDelete: (nodeId: string) => void;
}

const Container = styled.div`
  flex: 1;
  position: relative;
  background-color: #f9fafb;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  min-width: 0;
  min-height: 0;
`;

const Toolbar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  top: 1rem;
  left: 1rem;
  z-index: 20;
  display: flex;
  gap: 0.5rem;
`;

interface ToolbarButtonProps {
  active?: boolean;
}

const ToolbarButton = styled.button<ToolbarButtonProps>`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s, color 0.15s;
  gap: 24px;

  background-color: ${({ active }) => (active ? '#2563eb' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#374151')};

  &:hover {
    background-color: ${({ active }) => (active ? '#1d4ed8' : '#f9fafb')};
  }

  svg {
    margin-right: 0.25rem;
  }
`;

interface CanvasProps {
  isPanning: boolean;
  dragOver: boolean;
}

const Canvas = styled.div<CanvasProps>`
  width: 4000px;
  height: 3000px;
  position: relative;
  cursor: ${({ isPanning }) => (isPanning ? 'grabbing' : 'grab')};
  background-color: ${({ dragOver }) => (dragOver ? '#eff6ff' : '#f9fafb')};
  border: ${({ dragOver }) =>
    dragOver ? '2px dashed #93c5fd' : 'none'};
  transform-origin: 0 0;
  overflow: hidden;
  min-width: 4000px;
  min-height: 3000px;
  max-width: 4000px;
  max-height: 3000px;
`;



const SelectedGroupBox = styled.div<{
  left: number;
  top: number;
  width: number;
  height: number;
}>`
  position: absolute;
  border: 2px solid #2563eb;
  border-radius: 8px;
  pointer-events: none;
  z-index: 15;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;

const GroupContainer = styled.div<{
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
}>`
  position: absolute;
  border: 3px solid ${({ color }) => color};
  border-radius: 12px;
  background-color: ${({ color }) => color}15;
  pointer-events: none;
  z-index: 10;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  transform-origin: 0 0;
  will-change: transform;
`;

const GroupHeader = styled.div<{ color: string }>`
  position: absolute;
  top: -20px;
  left: 10px;
  background-color: ${({ color }) => color};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: auto;
  cursor: pointer;
  z-index: 25;

  &:hover {
    opacity: 0.9;
  }
`;

const GroupNameInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 12px;
  font-weight: 600;
  outline: none;
  min-width: 60px;
  max-width: 120px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const GroupDeleteButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const GroupSelector = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  min-width: 200px;
`;

const GroupTab = styled.button<{ active: boolean; color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 2px solid ${({ active, color }) => active ? color : 'transparent'};
  background-color: ${({ active, color }) => active ? `${color}15` : '#f9fafb'};
  color: ${({ active }) => active ? '#374151' : '#6b7280'};

  &:hover {
    background-color: ${({ color }) => `${color}10`};
  }
`;

const GroupTabName = styled.span`
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const GroupTabCount = styled.span`
  background: #e5e7eb;
  color: #374151;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;



const SectionCreationButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s, color 0.15s;
  gap: 8px;
  border: none;

  background-color: ${({ active }) => (active ? '#dc2626' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#374151')};

  &:hover {
    background-color: ${({ active }) => (active ? '#b91c1c' : '#f9fafb')};
  }

  svg {
    margin-right: 0.25rem;
  }
`;

const SectionPreviewBox = styled.div<{
  left: number;
  top: number;
  width: number;
  height: number;
}>`
  position: absolute;
  border: 2px dashed #dc2626;
  background-color: rgba(220, 38, 38, 0.1);
  pointer-events: none;
  z-index: 30;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
`;



export const MindMapCanvas = forwardRef<HTMLDivElement, MindMapCanvasProps>(({
  nodes,
  selectedNode,
  onDrop,
  onNodeMove,
  onNodeConnect,
  onNodeSelect,
  onNodeDelete
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [connectingMode, setConnectingMode] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [selectedNodesByArea, setSelectedNodesByArea] = useState<string[]>([]);
  const [groups, setGroups] = useState<MindMapGroup[]>([]);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [sectionCreationMode, setSectionCreationMode] = useState(false);
  const [isCreatingSection, setIsCreatingSection] = useState(false);
  const [sectionStart, setSectionStart] = useState({ x: 0, y: 0 });
  const [sectionEnd, setSectionEnd] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement>(null);

  const groupColors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
  ];

  const getNextGroupColor = () => {
    return groupColors[groups.length % groupColors.length];
  };



  const handleGroupDelete = (groupId: string) => {
    setGroups(prev => prev.filter(g => g.id !== groupId));
    if (activeGroupId === groupId) {
      setActiveGroupId(null);
    }
    if (editingGroupId === groupId) {
      setEditingGroupId(null);
      setEditingGroupName('');
    }
  };

  const handleGroupNameEdit = (groupId: string, currentName: string) => {
    setEditingGroupId(groupId);
    setEditingGroupName(currentName);
  };

  const handleGroupNameSave = () => {
    if (editingGroupId && editingGroupName.trim()) {
      setGroups(prev => prev.map(g =>
        g.id === editingGroupId
          ? { ...g, name: editingGroupName.trim() }
          : g
      ));
    }
    setEditingGroupId(null);
    setEditingGroupName('');
  };

  const handleGroupNameCancel = () => {
    setEditingGroupId(null);
    setEditingGroupName('');
  };

  const handleGroupNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGroupNameSave();
    } else if (e.key === 'Escape') {
      handleGroupNameCancel();
    }
  };

  const getBoundingRectForNodes = (nodeIds: string[]) => {
    const targetNodes = nodes.filter(n => nodeIds.includes(n.id));
    if (targetNodes.length === 0) return null;

    const xs = targetNodes.map(n => n.x);
    const ys = targetNodes.map(n => n.y);
    const left = Math.min(...xs);
    const top = Math.min(...ys);
    const right = Math.max(...xs);
    const bottom = Math.max(...ys);

    // 노드 크기 감안 (가로 368px, 세로 266px)
    return {
      left,
      top,
      width: right - left + 368,
      height: bottom - top + 266,
    };
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    try {
      const law: Law = JSON.parse(e.dataTransfer.getData('application/json'));
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / scale;
      const y = (e.clientY - rect.top - pan.y) / scale;
      onDrop(law, x, y);
    } catch (error) {
      console.error('Failed to parse dropped data:', error);
    }
  }, [onDrop, pan, scale]);

  const handleNodeClick = useCallback((node: MindMapNode) => {
    if (connectingMode && connectingFrom) {
      if (connectingFrom !== node.id) {
        onNodeConnect(connectingFrom, node.id);
      }
      setConnectingMode(false);
      setConnectingFrom(null);
    } else {
      onNodeSelect(node);
    }
  }, [connectingMode, connectingFrom, onNodeConnect, onNodeSelect]);

  const startConnection = useCallback((nodeId: string) => {
    setConnectingMode(true);
    setConnectingFrom(nodeId);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.1, Math.min(3, prev * delta)));
  }, []);

  const handleSectionCreationToggle = () => {
    setSectionCreationMode(!sectionCreationMode);
    // 섹션 생성 모드가 활성화되면 다른 모드들 비활성화
    if (!sectionCreationMode) {
      setConnectingMode(false);
      setConnectingFrom(null);
      setSelectedNodesByArea([]);
      setIsCreatingSection(false);
      setSectionStart({ x: 0, y: 0 });
      setSectionEnd({ x: 0, y: 0 });
    }
  };

  const getNodesInSection = (sectionRect: { left: number; top: number; width: number; height: number }) => {
    return nodes.filter(node => {
      const nodeCenterX = node.x + 184; // 노드 중앙 X
      const nodeCenterY = node.y + 133; // 노드 중앙 Y

      return nodeCenterX >= sectionRect.left &&
        nodeCenterX <= sectionRect.left + sectionRect.width &&
        nodeCenterY >= sectionRect.top &&
        nodeCenterY <= sectionRect.top + sectionRect.height;
    });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      if (sectionCreationMode) {
        // 섹션 생성 모드
        setIsCreatingSection(true);
        setSectionStart({ x: e.clientX, y: e.clientY });
        setSectionEnd({ x: e.clientX, y: e.clientY });
        e.preventDefault();
        return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / scale;
      const y = (e.clientY - rect.top - pan.y) / scale;

      // 노드가 클릭되었는지 확인
      const clickedNode = nodes.find(node => {
        return x >= node.x && x <= node.x + 368 &&
          y >= node.y && y <= node.y + 266;
      });

      if (!clickedNode) {
        // 노드가 클릭되지 않았다면 선택 모드 시작
        setIsSelecting(true);
        setSelectionStart({ x: e.clientX, y: e.clientY });
        setSelectionEnd({ x: e.clientX, y: e.clientY });
        setSelectedNodesByArea([]);
      } else {
        // 노드가 클릭되었다면 패닝 모드
        setIsPanning(true);
        setLastPanPoint({ x: e.clientX, y: e.clientY });
      }
      e.preventDefault();
    }
  }, [nodes, pan, scale, sectionCreationMode]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPan(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    } else if (isSelecting) {
      setSelectionEnd({ x: e.clientX, y: e.clientY });

      // 선택 영역 내의 노드들 찾기
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const startX = (Math.min(selectionStart.x, e.clientX) - rect.left - pan.x) / scale;
        const startY = (Math.min(selectionStart.y, e.clientY) - rect.top - pan.y) / scale;
        const endX = (Math.max(selectionStart.x, e.clientX) - rect.left - pan.x) / scale;
        const endY = (Math.max(selectionStart.y, e.clientY) - rect.top - pan.y) / scale;

        const selectedNodeIds = nodes
          .filter(node => {
            const nodeCenterX = node.x + 184; // 노드 중앙 X
            const nodeCenterY = node.y + 133; // 노드 중앙 Y
            return nodeCenterX >= startX && nodeCenterX <= endX &&
              nodeCenterY >= startY && nodeCenterY <= endY;
          })
          .map(node => node.id);

        setSelectedNodesByArea(selectedNodeIds);
      }
    } else if (isCreatingSection) {
      setSectionEnd({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, isSelecting, isCreatingSection, lastPanPoint, selectionStart, nodes, pan, scale]);

  const handleMouseUp = useCallback(() => {
    if (isCreatingSection) {
      // 섹션 생성 완료
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const startX = (Math.min(sectionStart.x, sectionEnd.x) - rect.left - pan.x) / scale;
        const startY = (Math.min(sectionStart.y, sectionEnd.y) - rect.top - pan.y) / scale;
        const endX = (Math.max(sectionStart.x, sectionEnd.x) - rect.left - pan.x) / scale;
        const endY = (Math.max(sectionStart.y, sectionEnd.y) - rect.top - pan.y) / scale;

        const sectionRect = {
          left: startX,
          top: startY,
          width: endX - startX,
          height: endY - startY,
        };

        const nodesInSection = getNodesInSection(sectionRect);

        if (nodesInSection.length > 0) {
          const newGroupId = `group-${Date.now()}`;
          const groupName = `섹션 ${groups.length + 1}`;
          const groupColor = getNextGroupColor();

          const newGroup: MindMapGroup = {
            id: newGroupId,
            name: groupName,
            nodeIds: nodesInSection.map(node => node.id),
            color: groupColor,
            rect: sectionRect, // ← 드래그한 영역
          };

          setGroups(prev => [...prev, newGroup]);
          setActiveGroupId(newGroupId);
        }
      }

      // 섹션 생성 상태만 초기화, 모드는 유지
      setIsCreatingSection(false);
      setSectionStart({ x: 0, y: 0 });
      setSectionEnd({ x: 0, y: 0 });
    }

    setIsPanning(false);
    setIsSelecting(false);
  }, [isCreatingSection, sectionStart, sectionEnd, pan, scale, groups, getNextGroupColor]);

  const resetView = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const renderConnections = () => {
    const connections: JSX.Element[] = [];

    visibleNodes.forEach(node => {
      node.connections.forEach(targetId => {
        const targetNode = visibleNodes.find(n => n.id === targetId);
        if (targetNode) {
          connections.push(
            <ConnectionLine
              key={`${node.id}-${targetId}`}
              from={{ x: node.x + 150, y: node.y + 50 }}
              to={{ x: targetNode.x + 150, y: targetNode.y + 50 }}
              scale={scale}
            />
          );
        }
      });
    });

    return connections;
  };

  const renderGroups = () => {
    return groups.map(group => {
      const rect = group.rect;
      if (!rect) return null;
      const isEditing = editingGroupId === group.id;

      return (
        <GroupContainer
          key={group.id}
          left={rect.left * scale + pan.x}
          top={rect.top * scale + pan.y}
          width={rect.width * scale}
          height={rect.height * scale}
          color={group.color || '#3b82f6'}
        >
          <GroupHeader
            color={group.color || '#3b82f6'}
            onClick={() => setActiveGroupId(group.id)}
          >
            {isEditing ? (
              <GroupNameInput
                value={editingGroupName}
                onChange={(e) => setEditingGroupName(e.target.value)}
                onKeyDown={handleGroupNameKeyDown}
                onBlur={handleGroupNameSave}
                autoFocus
                placeholder="그룹명 입력"
              />
            ) : (
              <>
                <span>{group.name}</span>
                <Edit2
                  size={10}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGroupNameEdit(group.id, group.name);
                  }}
                />
                <GroupDeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGroupDelete(group.id);
                  }}
                >
                  <X size={10} />
                </GroupDeleteButton>
              </>
            )}
          </GroupHeader>
        </GroupContainer>
      );
    });
  };

  const SelectionBox = styled.div<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>`
    position: absolute;
    border: 2px dashed #2563eb;
    background-color: rgba(37, 99, 235, 0.1);
    pointer-events: none;
    z-index: 15;
    left: ${({ left }) => `${left}px`};
    top: ${({ top }) => `${top}px`};
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    transform-origin: 0 0;
    will-change: transform;
  `;

  // 모든 법안 카드는 항상 보여야 함
  const visibleNodes = nodes;

  const renderSectionPreview = () => {
    if (!isCreatingSection) return null;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;

    const left = Math.min(sectionStart.x, sectionEnd.x) - rect.left;
    const top = Math.min(sectionStart.y, sectionEnd.y) - rect.top;
    const width = Math.abs(sectionEnd.x - sectionStart.x);
    const height = Math.abs(sectionEnd.y - sectionStart.y);

    return (
      <SectionPreviewBox
        left={left}
        top={top}
        width={width}
        height={height}
      />
    );
  };

  return (
    <Container>
      <Toolbar>
        <ToolbarButton onClick={resetView} type="button">
          <Move className="h-4 w-4 mr-1 inline" />
        </ToolbarButton>
        <SectionCreationButton
          active={sectionCreationMode}
          onClick={handleSectionCreationToggle}
        >
          <Square size={16} />
          섹션 생성
        </SectionCreationButton>
      </Toolbar>

      <GroupSelector>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          그룹 목록
        </div>
        {groups.map(group => (
          <GroupTab
            key={group.id}
            active={activeGroupId === group.id}
            color={group.color || '#3b82f6'}
            onClick={() => setActiveGroupId(activeGroupId === group.id ? null : group.id)}
          >
            <GroupTabName>{group.name}</GroupTabName>
            <GroupTabCount>{group.nodeIds.length}</GroupTabCount>
          </GroupTab>
        ))}
        {groups.length === 0 && (
          <div style={{ color: '#6b7280', fontSize: '0.75rem', textAlign: 'center' }}>
            그룹이 없습니다
          </div>
        )}
      </GroupSelector>

      <Canvas
        ref={canvasRef}
        isPanning={isPanning}
        dragOver={dragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: sectionCreationMode ? 'crosshair' : isPanning ? 'grabbing' : 'grab',
          width: '4000px',
          height: '3000px',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >


        {renderGroups()}

        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 5
          }}
        >
          {renderConnections()}
        </svg>

        {visibleNodes.map(node => (
          <MindMapNodeComponent
            key={node.id}
            node={node}
            isSelected={selectedNode?.id === node.id || selectedNodesByArea.includes(node.id)}
            isConnecting={connectingMode}
            onClick={() => handleNodeClick(node)}
            onMove={onNodeMove}
            onDelete={onNodeDelete}
            onStartConnection={startConnection}
          />
        ))}

        {/* 섹션 생성 미리보기 */}
        {renderSectionPreview()}

        {/* 선택 영역 표시 */}
        {isSelecting && (
          <SelectionBox
            left={Math.min(selectionStart.x, selectionEnd.x) - (canvasRef.current?.getBoundingClientRect()?.left || 0)}
            top={Math.min(selectionStart.y, selectionEnd.y) - (canvasRef.current?.getBoundingClientRect()?.top || 0)}
            width={Math.abs(selectionEnd.x - selectionStart.x)}
            height={Math.abs(selectionEnd.y - selectionStart.y)}
          />
        )}

        {/* 선택된 노드들의 영역 표시 */}
        {(() => {
          const selectedNodes = nodes.filter(n => selectedNodesByArea.includes(n.id));
          const rect = getBoundingRectForNodes(selectedNodes.map(n => n.id));
          if (!rect || selectedNodesByArea.length === 0) return null;

          return (
            <SelectedGroupBox
              left={rect.left * scale + pan.x}
              top={rect.top * scale + pan.y}
              width={rect.width * scale}
              height={rect.height * scale}
            />
          );
        })()}
      </Canvas>
    </Container>
  );
});
