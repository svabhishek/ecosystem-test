import React, { useEffect, useState } from 'react';
import './index.css';
import variables from '../../../utils/variables';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { insertData } from '../../../utils/helper';
import { useEcosystem } from '../Ecosystem.provider';
const Introduction = (props) => {
    const { ecosystems } = useEcosystem();
    const [textIntro, setTextInro] = useState('');

    useEffect(() => {
        const introductionText = insertData({
            text: variables[props.lang].ecosystem_introduction_app,
            options: {
                data: [{ NUMBER_APP: ecosystems.length }],
                tags: [{ tag: 'em', className: 'bold' }, { tag: 'em', className: 'bold' }, { tag: 'em', className: 'bold' }],
                root: { tag: 'p', className: 'introduction_number_app' },
            },
        });
        setTextInro(introductionText);
    }, [ecosystems]);

    return (
        <div className="introduction">
            <h3 className="title">{variables[props.lang].ecosystem_title}</h3>
            {textIntro}
            <p className="introduction_text">{variables[props.lang].ecosystem_introduction_text}</p>
        </div>
    );
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default withRouter(connect(stateToProps, null)(Introduction));
