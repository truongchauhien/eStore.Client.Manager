import * as React from 'react';
import { Header, Table } from 'semantic-ui-react';
import * as moment from 'moment';
import { getRevenueReportApiRequest } from '../../../commons/apis/reportApi';
import { IRevenueReportApiResponsePayload } from '../../../commons/types/apis/report';
import { convertNumberToCurrency } from '../../../commons/utils/numberFormat';
import * as _ from 'lodash';

interface IRevenueReportProps {

}

interface IRevenueReportState {
    currentWeekRevenueReport: IRevenueReportApiResponsePayload,
    currentMonthRevenueReport: IRevenueReportApiResponsePayload
}

const defaultRevenueReportValue: IRevenueReportApiResponsePayload = {
    orderCount: 0,
    revenue: 0
}

class RevenueReport extends React.Component<IRevenueReportProps, IRevenueReportState> {
    constructor(props: IRevenueReportProps) {
        super(props);

        this.state = {
            currentWeekRevenueReport: defaultRevenueReportValue,
            currentMonthRevenueReport: defaultRevenueReportValue
        }
    }

    componentDidMount = async (): Promise<void> => {
        try {
            const beginOfCurrentWeek = moment().startOf('isoWeek').toDate();
            const endOfCurrentWeek = moment().endOf('isoWeek').toDate();
            const currentWeekRevenueReport = await getRevenueReportApiRequest({ fromDate: beginOfCurrentWeek, toDate: endOfCurrentWeek });

            const beginOfCurrentMonth = moment().startOf('month').toDate();
            const endOfCurrentMonth = moment().endOf('month').toDate();
            const currentMonthRevenueReport = await getRevenueReportApiRequest({ fromDate: beginOfCurrentMonth, toDate: endOfCurrentMonth });

            this.setState({
                currentWeekRevenueReport,
                currentMonthRevenueReport
            });
        } catch (ex) {

        }
    }

    render() {
        const { currentWeekRevenueReport, currentMonthRevenueReport } = this.state;

        return (
            <div>
                <Header as='h1' dividing>
                    {
                        `Trong tuần, từ ${moment().startOf('isoWeek').format('DD-MM-YYYY')} đến ${moment().endOf('isoWeek').format('DD-MM-YYYY')}`
                    }
                </Header>
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><Header>Số lượng hóa đơn được tạo</Header></Table.Cell>
                            <Table.Cell>{_.get(currentWeekRevenueReport, 'orderCount', 0)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Header>Doanh thu</Header></Table.Cell>
                            <Table.Cell>{convertNumberToCurrency(_.get(currentWeekRevenueReport, 'revenue', 0))}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Header as='h1' dividing>
                    {
                        `Trong tháng, từ ${moment().startOf('month').format('DD-MM-YYYY')} đến ${moment().endOf('month').format('DD-MM-YYYY')}`
                    }
                </Header>
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><Header>Số lượng hóa đơn được tạo</Header></Table.Cell>
                            <Table.Cell>{_.get(currentMonthRevenueReport, 'orderCount', 0)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Header>Doanh thu</Header></Table.Cell>
                            <Table.Cell>{convertNumberToCurrency(_.get(currentMonthRevenueReport, 'revenue', 0))}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default RevenueReport;
