export const dataTables = [
    {
        name: 'product',
        title: 'Продукт',
        status: true,
        fields: [
            { name: 'name', type: 'input', placeholder: 'Название продукта' },
            { name: 'price', type: 'input', placeholder: 'Стоимость' },
            { name: 'currency', type: 'currency', placeholder: 'Валюта' },
        ]
    },
    {
        name: 'kpi',
        title: 'Показатели',
        status: true,
        fields: [
            { name: 'name', type: 'input', placeholder: 'name2' },
            { name: 'legs', type: 'input', placeholder: 'legs2' },
            { name: 'food', type: 'input', placeholder: 'food2' },
        ]
    },
    {
        name: 'costs',
        title: 'Расходы',
        status: true,
        fields: [
            { name: 'name', type: 'input', placeholder: 'name3' },
            { name: 'legs', type: 'input', placeholder: 'legs3' },
            { name: 'food', type: 'input', placeholder: 'food3' },
            { name: 'foods', type: 'input', placeholder: 'food4' },
        ]
    }

]

export const tablesForTabs = dataTables.filter(item => item.status)

export const tablesNames = dataTables.reduce((acc, item) => (acc[item.name] = item.name, acc), {})

// export const emptyNames = 


