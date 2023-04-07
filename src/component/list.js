/**
 * Класс элемента в связном списке
 *
 * @param data - данные в элементе
 * @param next - указатель на следующий элемент в списке
 * @param pre - указатель на предыдущий элемент в списке
 */
class node {
    constructor(data) {
        this.data = data
        this.next = null
        this.pre = null
    }
}
/**
 * Класс связного списка
 *
 * @param head - указатель на первый элемент списка
 * @param current - указатель на текущий элемент списка
 */
class linkedList {
    constructor() {
        this.head = null
        this.current = null
    }
    insert(data) { // метод для добавления нового элемента в список
        let newNode = new node(data)
        if(this.head == null) {
            this.head = newNode
            this.current = newNode
        } else {
            let temp = this.head;
            while (temp.next !== null) { // поиск последнего элемента в списке
                temp = temp.next
            }
            temp.next = newNode
            newNode.pre =  temp
            this.current = newNode
        }
        
    }
    undoEdit = () => { // отмена последнего действия
        const preData = this.current.pre
        if (preData) {
            this.current = preData
            return preData.data
        }else{
            return null
        }
    }
    redoEdit = () => { // восстановление последнего действия
        const nextData = this.current.next
        if (nextData) {
            this.current = nextData
            return nextData.data
        }else{
            return null
        }
    }
}
const storeData = new linkedList()
export default storeData;