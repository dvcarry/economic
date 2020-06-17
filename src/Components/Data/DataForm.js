import React, { useState, useEffect } from 'react'
import { Tabs, Button, Card } from 'antd'
import { tablesForTabs } from '../../Data/Tables';
import Modal from 'antd/lib/modal/Modal';
import { useHistory } from 'react-router-dom';
import { Forma } from '../Forma';
import { fieldsToItem, itemToFields } from '../../Data/Helpers';
import { getItems, addItem } from '../../Data/API';
const { TabPane } = Tabs;


export const DataForm = () => {

    const [modal, setModal] = useState(false)
    const [type, setType] = useState(false)
    const [fields, setFields] = useState(false)
    const [cards, setCards] = useState([])
    const history = useHistory()

    const showModal = type => {
        history.push('data/create')
        setType(type)
        // setFields(null)
        setModal(true)
    }

    const openCard = item => {
        setType(item.type)
        const existItem = itemToFields(item)
        setFields(existItem)
        setModal(true)
    }

    const handleOk = async () => {
        const newItemFieldsOnly = fieldsToItem(fields)
        const newItem = { ...newItemFieldsOnly, type: type }
        const id = await addItem(newItem)

        history.push('/')
        setCards([...cards, { _id: id, ...newItem }])
        setModal(false)
    }

    const handleCancel = () => {
        
        history.push('/')
        setModal(false)
    }

    // const gererateModalTitle = () => {

    // }

    useEffect(() => {
        const runEffect = async () => {
            const items = await getItems()
            setCards(items)
        }
        runEffect()
    }, [])

    // useEffect(() => {
    //     console.log('refresh')

    // })



    let cardsItems = []
    if (cards.length > 0) {
        cardsItems = cards.map(item => (
            <Card
                // size="small"
                type="inner"
                hoverable
                style={{ width: 300, marginTop: 16 }}
                title={item.name}
                key={item._id}
                onClick={() => openCard(item)}
                {...item}>
                <p>{item.price}</p>
            </Card>
        ))
    }

    console.log('render', fields)

    return (
        <>
            <Tabs tabPosition='left'>
                {
                    tablesForTabs.map(item => (
                        <TabPane tab={item.title} key={item.name}>
                            <Button onClick={() => showModal(item.name)}>Add</Button>
                            {cardsItems.filter(card => card.props.type === item.name)}
                        </TabPane>
                    ))
                }
            </Tabs>
            <Modal
                visible={modal}
                title={type}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Forma
                    type={type}
                    modal={modal}
                    fields={fields}
                    onChange={newFields => {
                        setFields(newFields);
                    }}
                ></Forma>
            </Modal>

        </>
    )
}