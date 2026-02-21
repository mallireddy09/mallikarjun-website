import React from 'react'
import styled from 'styled-components';
import useScrollReveal from '../hooks/useScrollReveal';

function ProgressBar({title, width, text}) {
    const [ref, isVisible] = useScrollReveal();
    return (
        <ProgressBarStyled ref={ref}>
            <div className="progress-header">
                <h6>{title}</h6>
                <span className="progress-value">{text}</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: isVisible ? width : '0%' }}
                />
            </div>
        </ProgressBarStyled>
    )
}

const ProgressBarStyled = styled.div`
    .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        h6 {
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.04em;
            color: var(--white-color);
        }
        .progress-value {
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--primary-color);
        }
    }
    .progress-track {
        position: relative;
        width: 100%;
        height: 6px;
        background-color: var(--border-color);
        border-radius: 3px;
        overflow: hidden;
        .progress-fill {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: var(--gradient-primary);
            border-radius: 3px;
            transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
    }
`;

export default ProgressBar;
