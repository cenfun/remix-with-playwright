import { json } from '@remix-run/node';
import { useSearchParams } from '@remix-run/react';

// action is excluded from client bundle
export function action() {
    return json({
        hello: 'world'
    });
}

export default function Test() {

    const [searchParams] = useSearchParams();

    if (searchParams.get('covered')) {
        console.log('covered');
        return (
            <h3>covered</h3>
        );
    }

    if (searchParams.get('uncovered')) {
        console.log('uncovered');
        return (
            <h3>uncovered</h3>
        );
    }

    return (
        <h1>Test</h1>
    );
}
