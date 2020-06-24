import React, { useState, useEffect } from 'react';
import { List, Tabs, Popover } from 'antd';
import { clientsSum, getValue, sumOfValuesByType, formulas } from '../Data/Formulas';
import { names } from './../Data/names'
import { getStateOfSumByType, getStateWithNewValue } from '../Data/Helpers';

const { TabPane } = Tabs;

export const Result = ({ cards }) => {

    const data = [
        // formulas.vcostsum, 
        formulas.pcostsum,
        formulas.ac,
        formulas.conversion,
        formulas.sumofclicks,
        formulas.sumofclients,
        formulas.revenue,
        formulas.cac,
        formulas.cogs,
        formulas.sumoforders,
        formulas.revenuefirstorder,
        formulas.gross,
        formulas.averageorder,
        formulas.revenueperclient,
        formulas.cogsperclient,
        formulas.arpc,

    ]

    const array = [
        {
            title: 'Юнит-экономика',
            name: 'unit',
            fields: [
                names.formulas.revenueperclient,
                names.formulas.cac,
                names.formulas.cogsperclient,
                names.formulas.arpc,
                names.formulas.sumofclients,
                names.formulas.conversion,
            ]
        },
        {
            title: 'ОПУ',
            name: 'opu',
            fields: [
                names.formulas.revenue,
                names.formulas.cogs,
                names.formulas.ac,
                names.formulas.pcostsum,
                names.formulas.gross,                

            ]
        },
        {
            title: 'Каналы продаж',
            name: 'channels',
            fields: [
                names.formulas.revenue,
                names.formulas.cogs,
                names.formulas.ac,
                names.formulas.pcostsum,
                names.formulas.gross,                

            ]
        }
    ]

    const initialData = data.map(item => {
        return { title: item.title, value: 0 }
    })

    const [results, setResults] = useState(initialData)

    useEffect(() => {

        let newData = initialData

        if (cards.length > 0) {
            data.forEach(item => {
                newData = getStateWithNewValue(newData, item, cards)
            })
            setResults(newData)
        }

    }, [cards])

    // console.log({ results })

    return (
        <div className='results'>
            <Tabs>
                {/* <List
                    dataSource={results}
                    renderItem={item => <List.Item><List.Item.Meta title={item.title} /><div>{item.value}</div></List.Item>}
                /> */}


                {
                    array.map(item => (
                        <TabPane tab={item.title} key={item.name}>
                            <List
                                dataSource={item.fields}

                                renderItem={el => {

                                    // console.log(el)

                                    const listItem = results.find(result => result.title === el).value
                                    const classes = listItem < 0 ? 'minus' : ''
                                    const description = data.find(item => item.title === el).desc

                                    return (
                                        <List.Item>
                                            <Popover title={el} content={description} trigger="click">
                                                <List.Item.Meta title={el} />
                                            </Popover>

                                            <div className={classes}>                                                
                                                {listItem ? listItem.toLocaleString('ru') : 'нет данных'}
                                            </div>
                                        </List.Item>
                                    )

                                }}
                            />
                        </TabPane>
                    ))
                }

            </Tabs>

        </div>
    )
}