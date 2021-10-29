
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [nodes, setNodes] = useState(['089ef556-dfff-4ff2-9733-654645be56fe']);
  const [allNodes, setAllNodes] = useState({});
  const [mostFrequent, setMostFrequent] = useState('');

  useEffect(()=>{
    const url = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes/';


    const fetchData = async (param) => {
      try {
        const response = await fetch (url + param);
        const data = await response.json();
        let children = [];
        for (let i = 0; i< data.length; i++) {
          children.push(...data[i].child_node_ids);
        }
        if (children.length > 0) {
          setAllNodes(() => {
            for (let child of children) {
              if (!(child in allNodes)) {
                allNodes[child] = 1
              } else {
                allNodes[child]++;
              }
            }

            let maxKey, maxValue = 0;

            for(const [key, value] of Object.entries(allNodes)) {
              if(value > maxValue) {
                maxValue = value;
                maxKey = key;
              }
            }
            setMostFrequent(maxKey);
          })
          console.log(allNodes);
          setNodes(elements => [...elements,...children])
          fetchData(children.join(','));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData('089ef556-dfff-4ff2-9733-654645be56fe');
  },[]);

  return (
    <div className="App">
       <p>Unique count = {new Set(nodes).size}</p>
        <p>Most frequent {mostFrequent}</p>
    </div>
  );
}

export default App;
