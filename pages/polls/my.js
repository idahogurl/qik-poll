import { useSession } from 'next-auth/react';
import Layout from '../../lib/components/Layout';
import PollList from '../../lib/components/PollList';
import Spinner from '../../lib/components/Spinner';

export default function MyPolls() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <Layout>
      <div className="p-3">
        <h1>My Polls</h1>
        {loading ? <Spinner /> : <PollList userId={session?.user.id} />}
      </div>
    </Layout>
  );
}
