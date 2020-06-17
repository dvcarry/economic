import React, { useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import { dataTables } from '../Data/Tables'
const { Option } = Select;

export const Forma = ({ type, onChange, fields, modal }) => {

    const [form] = Form.useForm()

    let inputFields = null
    if (type) {
        inputFields = dataTables
            .filter(item => item.name === type)[0]
            .fields
            .map(item => {

                let inside

                switch (item.type) {
                    case 'input':
                        inside = (
                            <Input
                                name={item.name}
                                placeholder={item.placeholder}
                            />
                        )
                        break;
                    case 'currency':
                        inside = (
                            <Select>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        )
                        break;
                    default:
                        break;
                }

                return (
                    <Form.Item
                        name={item.name}
                        key={item.name}
                    >
                        {inside}

                    </Form.Item>
                )
            }
            )
        // .map(item => (
        //     <Form.Item
        //         name={item.name}
        //         key={item.name}
        //     >
        //         <Input
        //             name={item.name}
        //             placeholder={item.placeholder}
        //         />
        //     </Form.Item>
        // )
        // )
    }

    useEffect(() => {
        if (!modal) {
            form.resetFields();
        }
        form.setFieldsValue(fields)
    }, [modal])

    return (
        <Form
            name='forma'
            fields={fields}
            form={form}
            onFieldsChange={(changedFields, allFields) => {
                onChange(allFields);
            }}
        >
            {inputFields}
        </Form>
    )
}