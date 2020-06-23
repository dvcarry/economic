import React, { useState, useEffect } from 'react'
import { Tabs, Button, Card, Alert } from 'antd'
import { tablesForTabs } from '../../Data/Tables';
import Modal from 'antd/lib/modal/Modal';
import { useHistory } from 'react-router-dom';
import { Forma } from '../Forma';
import { fieldsToItem, itemToFields } from '../../Data/Helpers';
import { getItems, addItem, editItem, deleteItem } from '../../Data/API';
import { Result } from '../Result';

const { TabPane } = Tabs;


export const DataForm = () => {

    const [modal, setModal] = useState(false)
    const [type, setType] = useState(false)
    const [fields, setFields] = useState(null)
    const [cards, setCards] = useState([])
    const [cardId, setCardId] = useState('')
    const [validate, setValidate] = useState(false)
    const history = useHistory()


    const showModal = type => {
        history.push('/create')
        setType(type)
        setModal(true)
    }

    const openCard = item => {
        validateForm()
        setType(item.type)        
        setCardId(item._id)
        const existItem = itemToFields(item)
        setFields(existItem)
        setModal(true)
    }

    const handleOk = async () => {      
        if (validate) {
            const newItemFieldsOnly = fieldsToItem(fields)

            if (history.location.pathname === '/create') {
                const newItem = { ...newItemFieldsOnly, type: type }
                const id = await addItem(newItem)
                setCards([...cards, { _id: id, ...newItem }])
            }
            else {
                const changedFields = fields.filter(item => item.touched)
                if (changedFields.length > 0) {
                    const normalisedChangedFields = fieldsToItem(changedFields)
                    await editItem(cardId, normalisedChangedFields)
                    const newItem = { _id: cardId, type: type, ...newItemFieldsOnly }
                    const newCardsArray = cards.map(item => item._id === cardId ? newItem : item)
                    setCards(newCardsArray)
                }
            }
        } else {
            setValidate(false)
        }


        history.push('/')
        setModal(false)
        setFields(null)
    }

    const handleCancel = () => {
        history.push('/')
        setModal(false)
        setFields(null)
        setValidate(false)
    }

    const handleDelete = async () => {
        await deleteItem(cardId)
        const cardsNoDeletedItem = cards.filter(item => item._id !== cardId)
        setCards(cardsNoDeletedItem)
        history.push('/')
        setModal(false)
    }

    useEffect(() => {
        const runEffect = async () => {
            const items = await getItems()
            setCards(items)
        }
        runEffect()
    }, [])

    let titleOfModal
    if (type) {
        titleOfModal = tablesForTabs.filter(item => item.name === type)[0].title
    }

    const validateForm = () => {
        // console.log(fields)
        if (fields) {
            if (fields.filter(item => item.value === '' || item.value === undefined).length > 0) {
                setValidate(false)
            } else {
                setValidate(true)
            }
        }
    }

    // CARDS GENERATOR

    let cardsItems = []
    if (cards.length > 0) {

        cardsItems = cards.map(item => {

            const filteredItem = Object.entries(item).filter(el => el[0] !== '_id' && el[0] !== 'type' && el[0] !== 'name')
            const description = filteredItem.map(el => <span key={el[0]}>{el[1]}</span>)

            return (
                <Card
                    size="small"
                    type="inner"
                    hoverable
                    style={{ width: 300, marginTop: 16 }}
                    title={item.name}
                    key={item._id}
                    onClick={() => openCard(item)}
                    {...item}>
                    {description}
                </Card>
            )
        })
    }

    console.log(fields)
    console.log(cards)

    return (
        <>
            <Tabs tabPosition='left'>
                {
                    tablesForTabs.map(item => (
                        <TabPane tab={item.title} key={item.name}>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <hr width="200px" align='left'/>
                            <Button type="primary" onClick={() => showModal(item.name)}>Add</Button>
                            {cardsItems.filter(card => card.props.type === item.name)}
                        </TabPane>
                    ))
                }
            </Tabs>
            <Modal
                visible={modal}
                title={titleOfModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="submit" type="primary" onClick={handleOk} disabled={!validate}>
                        Сохранить
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                        Отменить
                    </Button>,
                    <Button key="delete" type="link" danger onClick={handleDelete}>
                        Удалить
                    </Button>,
                ]}
            >
                <Forma
                    type={type}
                    modal={modal}
                    fields={fields}
                    onChange={newFields => {
                        setFields(newFields);
                        validateForm()
                    }}
                ></Forma>
            </Modal>
            <Result cards={cards}/>
            {/* <p>{() => clientsSum(cards)}</p> */}
        </>
    )
}