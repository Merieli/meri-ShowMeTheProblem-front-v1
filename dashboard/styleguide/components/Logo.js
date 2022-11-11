import logo from './logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, color }) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        fontFamily: fontFamily.base,
        fontSize: 18,
        fontWeight: 'normal',
    },
    image: {
        width: '2.5em',
        marginLeft: '-0.5em',
    },
});

export function LogoRenderer({ classes, children }) {
    return (
        <h1 className={classes.logo}>
            <img className={classes.image} src={logo} />
            {children}
        </h1>
    );
}

LogoRenderer.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default Styled(styles)(LogoRenderer);
