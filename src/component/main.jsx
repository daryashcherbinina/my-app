import React from 'react'
import './style/main.css'
const Main = () => {
    let Element = [
        { name: 'gfgg'}, { name: 'gfgfg'}, { name: 'gfg'}, { name: 'gfgfg'}
    ]
    return (
      <div className = "Editor">
        <div className = "Card">
            <div className="Header">
                <h2>Фоторедактор</h2>
            </div>
            <div className="body">
                <div className="leftSide">
                    <div className="filters">
                        <span>Filters</span>
                        <div className="filterElements">
                            {
                                Element.map((v,i) => <button key = {i}>{v.name}</button>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Main;