export const dataTables = [
    {
        name: 'product',
        title: 'Продукт',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название продукта' },
            { name: 'price', type: 'number', label: 'Стоимость' },
            { name: 'currency', type: 'currency', label: 'Валюта' },
        ]
    },
    {
        name: 'kpi',
        title: 'Показатели',
        status: true,
        fields: [
            { name: 'name', type: 'select', typeofselect: 'kpi', label: 'Показатель' },
            { name: 'indicator', type: 'number', label: 'Значение' }
        ]
    },
    {
        name: 'traffic',
        title: 'Трафик',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название канала привлечения' },
            { name: 'cpa', type: 'number', label: 'Стоимость за клик' },
            { name: 'traffic_sum', type: 'number', label: 'Количество' },           
        ]
    },
    {
        name: 'vcost',
        title: 'Переменные расходы',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название' },
            { name: 'vcostdep', type: 'select', typeofselect: 'vcostdeps', label: 'От чего считается' },
            { name: 'vcostdeps', type: 'select', typeofselect: 'vcostdep', label: 'Измерение' },
            { name: 'food', type: 'number', label: 'Количество' },
        ]
    },
    {
        name: 'pcost',
        title: 'Постоянные расходы',
        status: true,
        fields: [
            { name: 'name', type: 'input', label: 'Название' },
            { name: 'vcostdep', type: 'select', typeofselect: 'vcostdeps', label: 'От чего считается' },
            { name: 'vcostdeps', type: 'select', typeofselect: 'vcostdep', label: 'Измерение' },
            { name: 'food', type: 'number', label: 'Количество' },
        ]
    }

]

export const selectValues = {
    kpi: [
        {name: 'Конверсия в регистрацию', value: 'C1' },
        {name: 'Конверсия в покупку', value: 'C2' },
        {name: 'Конверсия в конверсию', value: 'C3' },

    ],
    vcostdep: [
        {name: 'проценты', value: 'percent'},
        {name: 'сумма', value: 'number'},
    ],
    vcostdeps: [
        {name: 'выручка', value: 'revenu'},
        {name: 'заказ', value: 'order'},
        {name: 'лид', value: 'lead'},
    ],
}

export const tablesForTabs = dataTables.filter(item => item.status)

export const tablesNames = dataTables.reduce((acc, item) => (acc[item.name] = item.name, acc), {})
