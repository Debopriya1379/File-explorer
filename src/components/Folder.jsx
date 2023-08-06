import React,{useState} from 'react'
import '../styles/Folder.css'

export const Folder = ({explorer,handleInsert}) => {
    const[expand, setExpand] = useState(false);
    const[showInput, setShowInput] = useState({
        visible : false,
        isFolder : false,
    })

    const handleNewFolder = (e,isFolder) => {
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visible: true,
            isFolder,
        })
    };

    const onAddFolder = (e)=>{
        if(e.keyCode === 13 && e.target.value){
            //add login
            handleInsert(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({...showInput, visible:false})
        }
    }

    if(explorer.isFolder){
        return (
            <div style={{marginTop:5}}>
                <div onClick={()=> setExpand(!expand)} className="folder">
                    <span>📁{explorer.name}</span>
                    <div>
                        <button onClick={(e)=> handleNewFolder(e,true)}>Folder+</button>
                        <button onClick={(e)=> handleNewFolder(e,false)}>File+</button>
                    </div>
                </div>
                <div className="items" style={{display: expand ? "block" : "none", paddingLeft:25}}>
                    {
                        showInput.visible && (
                            <div className='inputContainer'>
                                <span>{showInput.isFolder ? "📁" : "🗄️"}</span>
                                <input 
                                    type="text" 
                                    className='inputContainer_input' 
                                    autoFocus
                                    onKeyDown={(e)=>onAddFolder(e)}
                                    onBlur={()=> setShowInput({...showInput, visible:false})}
                                />
                            </div>
                        )
                    }

                    {
                        explorer.items.map((exp)=>{
                            return(
                                <Folder 
                                    explorer={exp} 
                                    handleInsert={handleInsert}
                                    key={exp.id}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    } else {
        return (
            <span className='file'>🗄️{explorer.name}</span>
        )
    }
}
