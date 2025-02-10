import { useCallback, useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';
import { relative } from 'path';

const handleStyle = { left: 10 };
 
function SourceNode({ id, data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const numHandles  = data.numHandles;
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, numHandles]);

  const handles = [];
  var numLeft = 0;
  var numRight = 0;
  var numTop = 0;
  var numBottom = 0;
  for (let i = 0; i < numHandles; i++) {
    const loc = i % 4;
    switch (loc) {
      case 1:
        numLeft++;
        handles.push(<Handle type="source" position={Position.Left} id={`l${numLeft}`} key={i} isConnectable={isConnectable} />);
        continue
      case 2:
        numRight++;
        handles.push(<Handle type="source" position={Position.Right} id={`r${numRight}`} key={i} isConnectable={isConnectable} />);
        continue
      case 3:
        numTop++;
        handles.push(<Handle type="source" position={Position.Top} id={`t${numTop}`} key={i} isConnectable={isConnectable} />);
        continue
      default: 
        numBottom++;
        handles.push(<Handle type="source" position={Position.Bottom} id={`b${numBottom}`} key={i} isConnectable={isConnectable} />);
        
    }
  }
 
  return (
    <div>
      <div>{data.label}</div>
      {handles}
    </div>
    // <div className="source-node">
    //   <Handle
    //     type="source"
    //     position={Position.Top}
    //     id="t"
    //     isConnectable={isConnectable}
    //   />
    //   <Handle
    //     type="source"
    //     position={Position.Right}
    //     id="r"
    //     isConnectable={isConnectable}
    //   />
    //   <div>
    //     <strong>{data.label}</strong>
    //   </div>
    //   <Handle
    //     type="source"
    //     position={Position.Left}
    //     id="l"
    //     isConnectable={isConnectable}
    //   />
    //   <Handle
    //     type="source"
    //     position={Position.Bottom}
    //     id="b"
    //     isConnectable={isConnectable}
    //   />
    // </div>
  );
}
 
export default SourceNode;