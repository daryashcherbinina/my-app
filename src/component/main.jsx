import React, {useState} from 'react'
import './style/main.css'
import storeData from './list'
import {IoMdUndo, IoMdRedo}  from 'react-icons/io'
import {GrRotateLeft, GrRotateRight} from 'react-icons/gr'

/**
 * Фукнциональный компонент Main, отвечающий за отрисовку основных компонентов, составляющих фоторедактор.
 *
 * @returns Main, содержаний все компоненты приложения
 *
 */
const Main = () => {
    // Массив названий фильтров
    const FilterNames = {
        'brightness': 'Яркость',
        'sepia': 'Сепия',
        'saturate': 'Насыщенность',
        'contrast': 'Контраст',
    }
    // Массив фильтров
    const Filter = [
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
    // Хуки функционального компонента
    const [details, setDetails] = useState('') // Установка текущего изображения
    const [property, setProperty] = useState({ // Установка текущего фильтра
        name: 'brightness',
        maxValue : 200,
    })
    const [state, setState] = useState({ // Установка параметров изображения
        image: '',
        brightness: 100,
        sepia: 0,
        saturate: 100,
        contrast: 100,
        rotate: 0,
    })
    const [isDisabled, setIsDisabled] = useState(true); // включение/отключение кнопок

    /**
     * Обрабатывает прокрутку слайдера
     *
     * @param e -объект события
     */
    const inputHandle = (e) => {
        let v = e.target.value
        let n = e.target.name
        setState({
            ...state,
            [n] : v
        })

    }

    /**
     * Сохраняет изображение на клиент
     *
     * @remarks
     * Для сохранения создаётся canvas, в котором копируется итоговое изображение.
     *
     */
    const saveImage = () => {
            const canvas = document.createElement('canvas')
            canvas.width = details.naturalWidth
            canvas.height = details.naturalHeight
            const ctx = canvas.getContext('2d')

            ctx.filter = `brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%)`

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

    /**
     * Поворачивает изображение на 90 градусов влево
     *
     *
     */
    const leftRotate = () => {
        setState({
            ...state,
            rotate: state.rotate - 90
        })
        const stateData = state
        stateData.rotate = state.rotate - 90
        storeData.insert(stateData)
    }
    /**
     * Поворачивает изображение на 90 градусов вправо
     *
     *
     */
    const rightRotate = () => {
        setState({
            ...state,
            rotate: state.rotate + 90
        })
        const stateData = state;
        stateData.rotate = state.rotate + 90; 
        storeData.insert(stateData);
    }
    /**
     * Восстанавливает предыдущее действие
     *
     *
     */
    const redo = () => {
        const data = storeData.redoEdit();
        if (data) {
            setState(data)
        }
    }
    /**
     * Отменяет предыдущее действие
     *
     *
     */
    const undo = () => {
        const data = storeData.undoEdit();
        if (data) {
            setState(data)
        }
    }
    /**
     * Обрабатывает загрузку изображения
     *
     * @param e - объект события
     */
    const imageHandle = (e) => {
        if (e.target.files.length !== 0) {
            const reader = new FileReader()

            reader.onload = () => {
                setIsDisabled(false);
                setState({
                        ...state,
                        image: reader.result
                })
                const stateData = {
                    image: reader.result,
                    brightness: 100,
                    sepia: 0,
                    saturate: 100,
                    contrast: 100,
                    rotate: 0,
                }
                storeData.insert(stateData);
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    /**
     * Сбрасывает текущее изображение
     *
     *
     */
    const resetImage = () => {
        setIsDisabled(true)
        setState({
            ...state,
            image: ''
        })
    }

    /**
     * Сохраняет историю действий, выполняемых над изображением
     *
     * @param e -объект события
     */
    const storeChange = (e) => {
        let v = e.target.value
        let n = e.target.name
        let stateData = state
        stateData.n = v
        storeData.insert(stateData)
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
                                Filter.map((v, i) => <button  className={property.name === v.name ? 'active' : ''} onClick={() => setProperty(v)} key={i} >{FilterNames[v.name]}</button>)
                            }
                        </div>
                    </div>
                    <div className="filter_slider">
                        <div className="label_bar">
                            <span></span>
                        </div>
                        <input disabled={isDisabled} name={property.name} value={state[property.name]} onBlur = {storeChange} onChange = {inputHandle}   max={property.maxValue} type="range"/>
                    </div>
                    <div className="rotate">
                        <label htmlFor="">Повернуть</label>
                        <div className="rotateElements"> 
                        <button disabled={isDisabled} onClick={leftRotate}><GrRotateLeft/></button>
                        <button disabled={isDisabled} onClick={rightRotate}><GrRotateRight/></button>
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
                        <button disabled={isDisabled} onClick={undo} className='undo'><IoMdUndo/></button>
                        <button disabled={isDisabled} onClick={redo} className='redo'><IoMdRedo/></button>
                        <button disabled={isDisabled} onClick={saveImage}>Сохранить</button>
                        <button disabled={isDisabled} onClick={resetImage}>Сброс</button>
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