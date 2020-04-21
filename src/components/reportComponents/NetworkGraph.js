import React, { useState, useRef } from "react";
import Graph from "react-graph-visualizer";

const NetworkGraph = (props) => {
  const graphRef = useRef();
  // eslint-disable-next-line
  const [gr, setGr] = useState({ nodes: props.nodes, links: props.edges });

  return (
    <Graph
      ref={graphRef}
      initialGraph={gr}
      width={600}
      height={500}
      nodeStyle={{
        borderWidth: 2,
        borderColor: "black",
        background: "image",
      }}
    />
  );
};

export default NetworkGraph;
