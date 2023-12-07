"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { fetchAccessToken } from '../../commands/msal-token';
import Link from "next/link";

const RedirectPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const authCode = searchParams.get('authorization_code');

        if (!authCode) {
            setError('無効な認証コードです。ログインを再度お試しください。');
            return;
        }

        fetchAccessToken(authCode)
            .then(() => {
                // トークンの取得に成功した場合の処理
                router.push('/');
            })
            .catch(err => {
                console.error(err);
                setError('ログインに失敗しました。もう一度お試しください。');
            });
    }, [router, searchParams]);

    return (
        <div>
            {error ? (
                <div className={styles.error}>
                    <p>{error}</p>
                    <Link href="/">トップページへ戻る</Link>
                </div>
            ) : (
                <div className={styles.loader}>Loading...</div>
            )}
        </div>
    );
};

export default RedirectPage;