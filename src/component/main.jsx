import React, {useState} from 'react'
import './style/main.css'
import {IoMdUndo, IoMdRedo}  from 'react-icons/io'
import {GrRotateLeft, GrRotateRight} from 'react-icons/gr'
const Main = () => {
    let FilterNames = {
        'brightness': 'Яркость',
        'sepia': 'Сепия',
        'saturate': 'Насыщенность',
        'contrast': 'Контраст',
    }
    let Filter = [
        {
            name: 'brightness',
            maxValue : 200,
        },
        {
            name: 'sepia',
            maxValue : 200,
        },
        {
            name: 'saturate',
            maxValue : 200,
        },
        {
            name: 'contrast',
            maxValue : 200,
        }
    ]

    const [property, setProperty] = useState({
        name: 'brightness',
        maxValue : 200,
    })
    const [details, setDetails] = useState('')
    const [state, setState] = useState({
        image: 'cat.ico',
        brightness: 100,
        grayscale: 0,
        sepia: 0,
        saturate: 100,
        contrast: 100,
        rotate: 0,
        hueRotate: 0,
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const saveImage = () => {
            const canvas = document.createElement('canvas')
            canvas.width = details.naturalWidth
            canvas.height = details.naturalHeight
            const ctx = canvas.getContext('2d')

            ctx.filter = `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`

            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate(state.rotate * Math.PI / 180)

            ctx.drawImage(
                details,
                -canvas.width / 2,
                -canvas.height / 2,
                canvas.width,
                canvas.height
            )

            const link = document.createElement('a')
            link.download = 'image_edit.jpg'
            link.href = canvas.toDataURL()
            link.click()
    }
    const leftRotate = () => {
        setState({
            ...state,
            rotate: state.rotate - 90
        })
    }

    const rightRotate = () => {
        setState({
            ...state,
            rotate: state.rotate + 90
        })
    }
    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {
            const reader = new FileReader()

            reader.onload = () => {
                setState({
                        ...state,
                        image: reader.result
                    }
                )
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const resetImage = () => {
        setState({
            ...state,
            image: ''
        })
    }
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
                                Filter.map((v, i) => <button className={property.name === v.name ? 'active' : ''} onClick={() => setProperty(v)} key={i} >{FilterNames[v.name]}</button>)
                            }
                        </div>
                    </div>
                    <div className="filter_slider">
                        <div className="label_bar">
                            <span></span>
                        </div>
                        <input name={property.name} onChange={inputHandle} value={state[property.name]} max={property.maxValue} type="range"/>
                    </div>
                    <div className="rotate">
                        <label htmlFor="">Повернуть</label>
                        <div className="rotateElements"> 
                        <button onClick={leftRotate}><GrRotateLeft/></button>
                        <button onClick={rightRotate}><GrRotateRight/></button>
                        </div>
                    </div>
                  </div>  

                </div>
                
                <div className="imageSection">
                    <div className="image">
                        {
                            state.image ? <img onLoad={(e)=>setDetails(e.currentTarget)} style={{filter : `brightness(${state.brightness}%) grayscale(${state.grayscale}%)
                            sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%)
                            `, transform: `rotate(${state.rotate}deg)`}} src={state.image} alt="" /> :
                            <label htmlFor="choose">
                                Выбрать фото
                            </label>
                        }
                    </div>
                    <div className="imageSelect">
                        <button className='undo'><IoMdUndo/></button>
                        <button className='redo'><IoMdRedo/></button>
                        <button>Обновить</button>
                        <button onClick={saveImage}>Сохранить</button>
                        <button onClick={resetImage}>Сброс</button>
                        <label htmlFor = "choose" className = "custom">
                        </label>
                        <input onChange={imageHandle} type="file" id='choose' accept="image/*"/>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default Main;