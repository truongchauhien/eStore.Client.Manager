import * as React from 'react';
import { Tab } from 'semantic-ui-react';
import RevenueReport from './revenue-report/revenue';

interface IReportProps {

}

interface IReportState {
    isSidebarVisible: boolean
}

const panes = [
    {
        menuItem: 'Báo cáo doanh thu',
        render: () => (
            <Tab.Pane attached={false}>
                <RevenueReport />
            </Tab.Pane>
        )
    }
]

class Report extends React.Component<IReportProps, IReportState> {
    constructor(props: IReportProps) {
        super(props);

        this.state = {
            isSidebarVisible: true
        };
    }

    handleSidebarHide = () => {

    }

    render() {
        return (
            <div>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </div>
        )
    }
}

export default Report;
