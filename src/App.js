import { useState } from 'react';
import './App.css';
import { Folder } from './components/Folder';
import explorer from './data/data'
import useTraversetree from './hooks/useTraversetree';

function App() {

  const[explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraversetree();

  const handleInsert = (folderId,item,isFolder) => {
    const finalTree = insertNode(explorerData,folderId,item,isFolder);
    setExplorerData(finalTree);
  }

  return (
    <div className="App">
      <Folder explorer={explorerData} handleInsert={handleInsert}/>
    </div>
  );
}

export default App;
