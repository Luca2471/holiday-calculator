import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            left: 0,
            bottom: 0,
            width: '100%',
            padding: '1rem',
            background: '#f5f5f5',
            textAlign: 'center',
            color: '#555',
            zIndex: 100
        }}
        data-testid="footer"
        >
            Have questions or suggestions? Email us at <a data-testid="email" href="mailto:lucasanz2471@gmail.com" style={{ color: '#007bff' }}>lucasanz2471@gmail.com</a> or call 07 515 191 587.
        </footer>
    );
};

export default Footer;
