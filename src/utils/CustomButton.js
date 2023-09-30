import React from 'react'

const CustomButton = ({ color, background, width, title, margin }) => {
    return (
        <button style={{
            color: color || '#000', backgroundColor: background || '#000', width: width || '200px', margin: margin || 0
            , border: '1px solid #f01130', height: "40px", fontWeight: '600'
        }}>
            {title}
        </button>
    )
}

export default CustomButton