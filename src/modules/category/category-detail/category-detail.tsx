import * as React from 'react';
import { useState, useEffect } from 'react';
import * as _ from 'lodash'

import { Form, Dropdown, Input } from 'semantic-ui-react';
import { ICategory } from '../../../commons/types/models/category';

interface ICategoryDetailProps {
    category?: Partial<ICategory>,
    onChange?: (category: Partial<ICategory>) => void
}

interface ICategoryDetailState {
    name: string
}

class CategoryDetail extends React.Component<ICategoryDetailProps, ICategoryDetailState> {
    constructor(props: ICategoryDetailProps) {
        super(props);

        this.state = {
            name: props.category && props.category.name
        }
    }

    handleCategoryNameChange = (value: string): void => {
        this.setState({
            name: value
        }, () => {
            this.props.onChange && this.props.onChange({ ...this.state });
        });
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Tên danh mục</label>
                        <Input
                            placeholder='Nhập tên danh mục ...'
                            defaultValue={this.props.category && this.props.category.name}
                            onChange={(event, data) => this.handleCategoryNameChange(data.value)}
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

export default CategoryDetail;
