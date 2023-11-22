import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './RedirectPage.module.css';

const RedirectPage = () => {
    const router = useRouter();
    const [error, setError] = useState(null);

    useEffect(() => {
        const authCode = router.query.authorization_code;

        if (authCode) {
            fetchAccessToken(authCode)
                .then(accessToken => {
                    localStorage.setItem('auth', accessToken.authToken);
                    localStorage.setItem('refresh', accessToken.refreshToken);

                    router.push('/');
                })
                .catch(err => {
                    setError('ログインに失敗しました。もう一度お試しください。');
                });
        } else {
            setError('無効な認証コードです。ログインを再度お試しください。');
        }
    }, [router]);


    const fetchAccessToken = async (authCode) => {
        try {
            const microsoftTokenResponse = await fetch('MICROSOFT_TOKEN_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    // パラメータは実際の環境に合わせて設定
                    'client_id': 'YOUR_CLIENT_ID',
                    'scope': 'openid email profile',
                    'code': authCode,
                    'redirect_uri': 'YOUR_REDIRECT_URI',
                    'grant_type': 'authorization_code',
                }),
            });
    
            if (!microsoftTokenResponse.ok) {
                throw new Error('Failed to fetch Microsoft access token');
            }
    
            const microsoftToken = await microsoftTokenResponse.json();
    
            const backendLoginResponse = await fetch('YOUR_BACKEND_LOGIN_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${microsoftToken.access_token}`,
                },
            });
    
            if (!backendLoginResponse.ok) {
                throw new Error('Failed to login to the backend');
            }
    
            const tokens = await backendLoginResponse.json();
            return tokens;
    
        } catch (error) {
            console.error('Error fetching access token:', error);
            throw error;
        }
    };
    

    return (
        <div>
            {error ? (
                <div className={styles.error}>
                    <p>{error}</p>
                    <button onClick={() => router.push('/')}>トップページへ戻る</button>
                </div>
            ) : (
                <div className={styles.loader}>Loading...</div>
            )}
        </div>
    );
};

export default RedirectPage;