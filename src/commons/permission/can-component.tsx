import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../rootReducer';
import checkRoleHasPermission from './utils/roles';

interface ICanProps {
    yes?: any,
    no?: any,
    userRoles: string[],
    requiredResource: string,
    requiredPermission: string
}

class Can extends React.Component<ICanProps> {
    constructor(props: ICanProps) {
        super(props);
    }

    check = (args: { requiredResource: string, requiredPermission: string }): boolean => {
        const { userRoles } = this.props;
        const { requiredResource, requiredPermission } = args;

        for (const role of userRoles) {
            if (checkRoleHasPermission({
                requiredResource: requiredResource,
                requiredPermission: requiredPermission,
                role: role
            })) {
                return true;
            }
        }

        return false;
    }

    render() {
        const { yes, no, children, requiredResource, requiredPermission } = this.props;
        const hasPermission = this.check({ requiredResource: requiredResource, requiredPermission: requiredPermission })
        
        if (hasPermission) {
            return children || yes || null;
        } else {
            return no || null;
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    userRoles: state.user.roles
});

export default connect(mapStateToProps, null)(Can);
