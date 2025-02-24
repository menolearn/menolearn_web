"use client"

import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from 'd3-force';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useNodesInitialized,
  MiniMap,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  useNavigate
} from '@xyflow/react';
 
import { 
  initialNodes, 
  initialEdges,  
  reliefNodes,
  reliefEdges,
  supportNodes,
  supportEdges,
  pharmNodes,
  pharmEdges,
  altNodes,
  altEdges
} from './nodes-edges.js';

import { collide } from './collide.js';
 
import '@xyflow/react/dist/style.css';

import SourceNode from './SourceNode.jsx';

const nodeTypes = { source: SourceNode };

const nodeEdgeArray = [
  [initialNodes, initialEdges], 
  [reliefNodes, reliefEdges], 
  [supportNodes, supportEdges],
  [pharmNodes, pharmEdges],
  [altNodes, altEdges]
];

var currIndex = 4

var currPair = nodeEdgeArray[currIndex];

var currNodes = currPair[0];
var currEdges = currPair[1];

// const currNodes = reliefNodes;
// const currEdges = reliefEdges;

const nodeColor = (node) => {
    return node.style.backgroundColor;
};

// const onNodeClick = (node, currIndex) => {
//   currIndex = 2;
// };
 
const simulation = forceSimulation()
  .force('charge', forceManyBody().strength(-1000))
  .force('x', forceX().x(0).strength(0.05))
  .force('y', forceY().y(0).strength(0.05))
  .force('collide', collide())
  .alphaTarget(0.05)
  .stop();
 
const useLayoutedElements = () => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow();
  const initialized = useNodesInitialized();
 
  // You can use these events if you want the flow to remain interactive while
  // the simulation is running. The simulation is typically responsible for setting
  // the position of nodes, but if we have a reference to the node being dragged,
  // we use that position instead.
  const draggingNodeRef = useRef(null);
  const dragEvents = useMemo(
    () => ({
      start: (_event, node) => (draggingNodeRef.current = node),
      drag: (_event, node) => (draggingNodeRef.current = node),
      stop: () => (draggingNodeRef.current = null),
    }),
    [],
  );
 
  let nodes = getNodes().map((node) => ({
    ...node,
    x: node.position.x,
    y: node.position.y,
  }));
  let edges = getEdges().map((edge) => edge);
  let running = false;

  const isRunning = () => running

  return useMemo(() => {
    // If React Flow hasn't initialized our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (!initialized || nodes.length === 0) return [false, {}, dragEvents];
 
    simulation.nodes(nodes).force(
      'link',
      forceLink(edges)
        .id((d) => d.id)
        .strength(0.05)
        .distance(100),
    );
 
    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = () => {
      getNodes().forEach((node, i) => {
        const dragging = draggingNodeRef.current?.id === node.id;
 
        // Setting the fx/fy properties of a node tells the simulation to "fix"
        // the node at that position and ignore any forces that would normally
        // cause it to move.
        if (dragging) {
          nodes[i].fx = draggingNodeRef.current.position.x;
          nodes[i].fy = draggingNodeRef.current.position.y;
        } else {
          delete nodes[i].fx;
          delete nodes[i].fy;
        }
      });
 
      simulation.tick();
      setNodes(
        nodes.map((node) => {
          return ({
          ...node,
          position: { x: node.fx ?? node.x, y: node.fy ?? node.y },
        })}),
      );
 
      window.requestAnimationFrame(() => {
        // Give React and React Flow a chance to update and render the new node
        // positions before we fit the viewport to the new layout.
        fitView();
 
        // If the simulation hasn't been stopped, schedule another tick.
        if (running) tick();
      });
    };
 
    const toggle = () => {
      if (!running) {
        getNodes().forEach((node, index) => {
          let simNode = nodes[index];
          Object.assign(simNode, node);
          simNode.x = node.position.x;
          simNode.y = node.position.y;
        });
      }
      running = !running;
      running && window.requestAnimationFrame(tick);
    }; 

    return [true, { toggle, isRunning }, dragEvents];
  }, [initialized, dragEvents, getNodes, getEdges, setNodes, fitView]);
};
 
const LayoutFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(currNodes);
  const [edges, , onEdgesChange] = useEdgesState(currEdges);
  const [initialized, { toggle, isRunning }, dragEvents] =
    useLayoutedElements();

  const [running, setRunning] = useState(false)

  const handleNodeClick = (event, node, currIndex) => {
    console.log('Node clicked:', node.id);
    // Perform your desired action here
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, clicked: true } } : n
      )
    );

    setEdges((prevEdges) => {
      // Example: Add a new edge connected to the clicked node
      return [...prevEdges, { id: `e-${node.id}-new`, source: node.id, target: 'some-other-node' }];
    });
  };

  return (
    <div style={{ height: '100%' }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeDragStart={dragEvents.start}
      onNodeDrag={dragEvents.drag}
      onNodeDragStop={dragEvents.stop}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
    >
      {/* <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable /> */}
      {/* <Background color="#ccc" variant={'dots'} /> */}
      <Panel>
        {initialized && (
          <button onClick={() => {
            toggle()
            setRunning(!running)
          }}>
            {running ? 'Stop' : 'Start'} force simulation
          </button>
        )}
      </Panel>
    </ReactFlow>
    </div>
  );
};
 
export default function Visualization() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}