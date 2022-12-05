import { Button } from 'antd';
import React from 'react';
import authenticationPresenter from '@modules/authentication/presenter';
import { useSingleAsync } from '@hook/useAsync';

const Home: React.FC = () => {
    const { logout } = authenticationPresenter;
    const logoutCurrentAuth = useSingleAsync(logout)

    const SignOut = () => {
        logoutCurrentAuth.execute().then((response) =>
            console.log(response)
        )
    }

    return (
        <>
            <Button className="" onClick={SignOut}>
                Sign out
            </Button>
        </>
    )
}

export default Home