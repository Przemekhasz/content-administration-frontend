import {Link} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import React from "react";

export const PageNotFound = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=1800&t=st=1713970471~exp=1713971071~hmac=9c1bf6a0164a2cb75ee2ffdd8d73d28b27212f0067f40f0337328595604d28d2" alt="404" style={{ maxWidth: '100%', maxHeight: '50vh' }} />
        <h1>404 - Strona nie została odnaleziona</h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'green', marginTop: '20px', fontSize: '18px' }}><ArrowBack />Powrót</Link>
    </div>
);
