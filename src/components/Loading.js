import React from 'react'

export const Loading = () => {
    const renderCircle = () => {
        let contents = [];
        for (let i = 1; i <= 20; i++) {
            contents.push(
                <span key={i} style={{ "--i": `${i}` }}>
                </span>
            )
        }
        return contents;
    }
    const renderText = () => {
        let singleText = ['L', 'O', 'A', 'D', 'I', 'N', 'G', '.', '.', '.'];
        return singleText.map((item, index) => {
            return (
                <li key={index} style={{ "--i": `${index}` }}>{item}</li>
            );
        })
    }
    return (
        <div className="loader">
            <div className="loader-contents">
                {renderCircle()}
            </div>
            <div className="loader-text">
                <ul>
                    {renderText()}
                </ul>
            </div>
        </div>
    )
}
