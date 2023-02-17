import { createConsumer } from '@rails/actioncable';

let url = '/cable'

if (process.env.NODE_ENV !== 'production') {
    url = 'ws://localhost:5000/cable'
};

export default createConsumer(url)