
import css from './Layout.module.css';

import { Suspense } from 'react';
//import { Outlet } from 'react-router-dom';
import { AppBar } from '../AppBar/AppBar';

export const Layout = ({ children }) => {
    return (
        <div className={css.container}>
            <AppBar />
            <Suspense fallback={null}>{children}</Suspense>
        </div>
    );
};


// export default function WrapperGeneral({ children }) {
//     return <main className={css.container}>
//         <h1 className={css.title}>My phone contacts</h1>
//         {children}</main>;
// };