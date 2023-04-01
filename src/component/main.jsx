import React from 'react'
import './style/main.css'
import {IoMdUndo, IoMdRedo}  from 'react-icons/io'
import {GrRotateLeft, GrRotateRight} from 'react-icons/gr'
const Main = () => {
    let Filter = [
        { name: 'Насыщенность'}, { name: 'Сепия'}, { name: 'Яркость'}, { name: 'Контраст'}
    ]
    return (
      <div className = "Editor">
        <div className = "Card">
            <div className="Header">
                <h2>Фоторедактор</h2>
            </div>
            <div className="body">
            <div className="leftSide">
                <div className="wrap">
                    <div className="filters">
                        <span>Фильтры</span>
                        <div className="filterElements">
                            {
                                Filter.map((v,i) => <button key = {i}>{v.name}</button>)
                            }
                        </div>
    
                    </div>
                    <div className="rotate">
                        <label htmlFor="">Повернуть</label>
                        <div className="rotateElements"> 
                        <button><GrRotateLeft/></button>
                        <button><GrRotateRight/></button>
                        </div>
                    </div>
                  </div>  

                </div>
                
                <div className="imageSection">
                    <div className="image">
                        <label htmlFor="choose">
                            Выбрать фото
                        </label>
                    </div>
                    <div className="imageSelect">
                        <button className='undo'><IoMdUndo/></button>
                        <button className='redo'><IoMdRedo/></button>
                        <button>Обновить</button>
                        <button>Сохранить</button>
                        <label htmlFor = "choose" className = "custom">
                        </label>
                        <input type="file" id='choose' />
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Main;